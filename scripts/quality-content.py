"""Audit the complete collection and rebuild the embedded data and daily feed.

Only recover truncated summaries from the existing full chapters. External
source accessibility is recorded separately from factual verification.
"""
import collections
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
prior_report = json.loads((ROOT / 'quality-audit.json').read_text()) if (ROOT / 'quality-audit.json').exists() else {}
html = (ROOT / 'index.html').read_text()
start = html.index('const STORIES = ') + len('const STORIES = ')
stories, consumed = json.JSONDecoder().raw_decode(html[start:])


def sentences(text):
    # German ordinal dates, versions, domains and abbreviations are not stops.
    parts = re.split(r'(?<=[.!?])\s+', text.strip())
    result = []
    pending = ''
    for p in parts:
        pending = (pending + ' ' + p).strip()
        if re.search(r'(?:\b\d{1,2}|\b(?:z|B|bzw|ca|Dr|Prof|S|Nr))\.$', pending):
            continue
        result.append(pending)
        pending = ''
    if pending:
        result.append(pending)
    return result


changes = []
for c in stories:
    for i, p in enumerate(c['daily'][1:], 1):
        if re.search(r'\b\d{1,2}\.$', p):
            complete = sentences(c['acts'][i-1][1])[0]
            if not complete.startswith(p):
                raise ValueError((c['id'], p, complete))
            c['daily'][i] = complete
            changes.append({'id': c['id'], 'paragraph': i, 'before': p, 'after': complete})

# The contemporary OVH report did not yet establish the final fire cause.
c = next(c for c in stories if c['id'] == 'ovh-fire')
c['acts'][1][1] = c['acts'][1][1].replace(
    'Am 10. März 2021 brach in einer Energieversorgungseinheit ein Brand aus.',
    'Am 10. März 2021 brach am Standort Straßburg ein Brand aus. Der damalige Unternehmensbericht beschreibt Rauch in Energieräumen; die genaue Brandursache war darin noch Gegenstand der Untersuchung.')
c['daily'][2] = sentences(c['acts'][1][1])[0]

# Make repeated distractors case-specific. All are explicitly quiz alternatives,
# never additions to the historical account. Keep the correct actions unchanged.
counts = collections.Counter(o for c in stories for field in ['quiz','decision'] for o in c[field][1])
rewritten = 0
for c in stories:
    if c.get('reading'):
        continue  # Existing editorial choices must not be rewritten again.
    for field in ['quiz','decision']:
        q = c[field]
        wrong_position = 0
        for i, option in enumerate(q[1]):
            if i != q[2] and counts[option] > 3:
                # Re-use the case's distinct factual misconceptions instead of
                # generic advice shared by dozens of unrelated cases.
                if field == 'decision':
                    wrong_facts = [v for j,v in enumerate(c['quiz'][1]) if j != c['quiz'][2]]
                    misconception = wrong_facts[wrong_position]
                    q[1][i] = 'Das weitere Vorgehen auf diese Annahme stützen: „' + misconception.rstrip('.') + '.“'
                else:
                    q[1][i] = 'Für diese Akte annehmen: ' + option
                rewritten += 1
            if i != q[2]:
                wrong_position += 1

source_checks = json.loads((ROOT / 'scripts/source-checks.json').read_text())
for c in stories:
    opening = c['acts'][0][1].split('\n\n')[0]
    date_match = re.search(r'\b\d{1,2}\.\s*(?:Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\s+' + str(c['year']) + r'\b', opening)
    month_match = re.search(r'\b(?:Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)\s+' + str(c['year']) + r'\b', opening)
    c['reading'] = {
        'summary': [sentences(act[1])[0] for act in c['acts']],
        'overview': [act[1].split('\n\n')[0] for act in c['acts']],
        'eventDate': c.get('eventDate') or (date_match.group() if date_match else month_match.group() if month_match else str(c['year'])),
        'sourceStatus': source_checks.get(c['source'][1], {'status': 'not-rechecked'}),
    }

html = html[:start] + json.dumps(stories, ensure_ascii=False, separators=(',',':')) + html[start+consumed:]
(ROOT / 'index.html').write_text(html)
feed = json.loads((ROOT / 'daily-stories.json').read_text())
feed['stories'] = [{k:c[k] for k in ['id','number','title','year','origin','daily','lesson','source']} for c in stories]
(ROOT / 'daily-stories.json').write_text(json.dumps(feed, ensure_ascii=False, indent=2)+'\n')

questions = collections.Counter(c[f][0] for c in stories for f in ['quiz','decision'])
answers = collections.Counter(o for c in stories for f in ['quiz','decision'] for o in c[f][1])
report = {
    'date': '2026-10-25', 'cases': len(stories), 'chapters': sum(len(c['acts']) for c in stories),
    'questions': len(stories)*2, 'repairedParagraphs': prior_report.get('repairedParagraphs', []) + changes,
    'repairedCaseCount': len({x['id'] for x in prior_report.get('repairedParagraphs', []) + changes}),
    'revisedDistractors': prior_report.get('revisedDistractors', 0) + rewritten,
    'duplicateQuestionTexts': [q for q,n in questions.items() if n>1],
    'remainingDateFragments': [{'id':c['id'],'text':p} for c in stories for p in c['daily'] if re.search(r'\b\d{1,2}\.$',p)],
    'repeatedAnswers': [{'text':t,'count':n} for t,n in answers.items() if n>3],
    'scope': 'Strukturprüfung aller Akten, Wiederherstellung abgebrochener Kurzfassungen aus vorhandenen Kapiteln, Prüfung ausgewählter Quellenabrufe. Keine vollständige neue Faktenprüfung aller historischen Angaben.',
    'sourceChecks': source_checks,
}
(ROOT / 'quality-audit.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['cases','chapters','questions','repairedCaseCount','revisedDistractors','remainingDateFragments']},ensure_ascii=False))
