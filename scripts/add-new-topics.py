"""Add the researched themes without replacing the existing collection."""
import base64
import html
import json
import re
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
path=ROOT/'index.html'
page=path.read_text()

def read_array(marker):
    a=page.index(marker)+len(marker)
    return json.JSONDecoder().raw_decode(page[a:])[0]

stories=read_array('const STORIES = ')
meta=read_array('const CASE_META = ')
new=json.loads((ROOT/'scripts/new-topics.json').read_text())
if (ROOT/'scripts/everyday-cases.json').exists():
    new+=json.loads((ROOT/'scripts/everyday-cases.json').read_text())
checks=json.loads((ROOT/'scripts/source-checks.json').read_text())

ART={
 'parking-quishing2025':'<rect x="310" y="95" width="180" height="245" rx="18"/><path d="M350 130h100v50H350z M355 220h35v35h-35z M410 220h35v35h-35z M350 285h100 M365 340v35 M435 340v35"/>',
 'gnss-spoofing2024':'<path d="M280 100l65 65-45 45-65-65z M500 230l65 65-45 45-65-65z M350 185l85 85 M410 115a110 110 0 0 1 110 110 M410 155a70 70 0 0 1 70 70"/><circle cx="390" cy="245" r="30"/>',
 'crew-shutdown2024':'<path d="M250 295l35-90h225l40 90 M260 300h280v50H260z M310 150h180 M360 95v45 M445 95v45"/><circle cx="300" cy="350" r="25"/><circle cx="505" cy="350" r="25"/>',
 'tonga-cable2022':'<path d="M190 155q50-45 100 0t100 0t100 0t100 0 M190 195q50-45 100 0t100 0t100 0t100 0 M230 310h140l25-35 M420 310h150 M385 240l30 45-35 25 30 45"/>',
 'robodebt-review2023':'<rect x="310" y="85" width="180" height="280" rx="20"/><path d="M340 115h120v55H340z M340 210h25 M395 210h25 M450 210h15 M340 260h25 M395 260h25 M450 260h15 M340 310h25 M395 310h25 M450 310h15"/>',
 'webaim-million2024':'<rect x="230" y="100" width="340" height="220" rx="16"/><path d="M230 145h340 M265 180h130 M265 215h85 M430 195h95v70h-95z M320 360h160 M380 320v40"/>',
 'photo-metadata-training':'<rect x="245" y="105" width="310" height="225" rx="18"/><path d="M275 280l70-85 70 65 45-40 65 60 M460 100v-25h95v90"/><circle cx="475" cy="165" r="17"/>',
 'nest-support2024':'<path d="M245 210l155-125 155 125 M280 185v175h240V185 M350 360V245h100v115"/><circle cx="485" cy="135" r="50"/><path d="M450 100l70 70"/>',
 'time2038-training':'<circle cx="400" cy="225" r="125"/><path d="M400 125v110l70 45 M395 75h10 M395 375h10 M250 220v10 M540 220v10"/>',
 'qakbot-disruption2023':'<path d="M400 80l125 45v95q0 100-125 155-125-55-125-155v-95z M335 220l45 45 90-100"/>',
 'rhysida-recovery2024':'<rect x="310" y="200" width="180" height="145" rx="16"/><path d="M355 200v-55a55 55 0 0 1 110 0 M400 250v45 M520 150l40-40 M535 165l40-40"/>'
}

ART.update({
 'sec-simswap2024':'<rect x="315" y="75" width="170" height="290" rx="22"/><path d="M350 110h100 M380 330h40 M520 165h85l-25-25 M605 165l-25 25 M280 275h-85l25-25 M195 275l25 25"/>',
 'expired-whois2024':'<rect x="220" y="110" width="360" height="220" rx="20"/><path d="M220 160h360 M270 220h210 M270 270h140 M510 205v90 M485 270l25 25 25-25"/>',
 'goodrx-trackers2023':'<rect x="250" y="95" width="180" height="265" rx="18"/><path d="M285 140h110 M285 180h85 M430 220h100v-70 M430 260h140v45"/><circle cx="530" cy="125" r="22"/><circle cx="590" cy="325" r="22"/>',
 'leading-zero-training':'<rect x="210" y="100" width="380" height="250" rx="14"/><path d="M210 160h380 M210 220h380 M210 280h380 M330 100v250 M460 100v250"/><text x="225" y="205" stroke="none" fill="#9ddce8" font-family="monospace" font-size="30">001</text>',
 'marketplace-fakepay2024':'<path d="M260 175l140-75 140 75v150l-140 60-140-60z M260 175l140 65 140-65 M400 240v145 M545 100h75l-25-25 M620 100l-25 25"/>',
 'orphan-admin-training':'<circle cx="355" cy="180" r="55"/><path d="M400 215l135 120 M470 275l-25 30 M500 305l-25 30 M250 325v-35a70 70 0 0 1 70-70"/>'
})

def picture(c):
    title=html.escape(c['title'])
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" aria-label="Symbolillustration: {title}"><defs><linearGradient id="bg"><stop stop-color="#071827"/><stop offset="1" stop-color="#19354b"/></linearGradient></defs><rect width="800" height="450" fill="url(#bg)"/><circle cx="400" cy="225" r="180" fill="#7bb9fa" opacity=".06"/><g stroke="#9ddce8" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round">{ART[c['id']]}</g><text x="30" y="35" fill="#9ddce8" font-family="sans-serif" font-size="15" letter-spacing="3">ADRAKIR · AKTE {c['number']}</text><text x="765" y="35" text-anchor="end" fill="#c3d4e0" font-family="sans-serif" font-size="15">{c['year']}</text></svg>'''
    return 'data:image/svg+xml;base64,'+base64.b64encode(svg.encode()).decode()

for item in new:
    c=next((x for x in stories if x['id']==item['id']),None)
    if c is None:
        c={k:v for k,v in item.items() if k not in ['type','topics','related','collection']}
        c['number']=len(stories)+1
        c['level']='Einsteiger'
        c['tags']=[item.get('collection','Neue Themen')]
        if c['origin']=='Trainingsfall':c['tags'].append('Trainingsfall')
        else:c['tags'].append('Neu ab 2021')
        if 'resilienz' in item['topics']:c['tags'].append('Gut gegangen!')
        if 'zukunft' in item['topics']:c['tags'].append('Zukunftslabor')
        c['extraSources']=item.get('extraSources',[])
        c['image']=picture(c)
        c['note']='Redaktionell nacherzählt; technische Vergleiche sind keine historischen Zitate. '+item.get('scope','Die Akte beschreibt den in den Quellen dokumentierten Umfang und damaligen Stand.')
        # Mark as authored so quality-content.py never rewrites these distractors.
        c['reading']={'authored':True}
        stories.append(c)
    meta[c['id']]={'type':item['type'],'topics':item['topics'],'related':[{'id':r,'reason':'Verwandter Mechanismus oder eine ergänzende Perspektive; eigenständige Akte.'}for r in item['related']]}
    checks[c['source'][1]]={'status':'unavailable' if c['id']=='time2038-training' else 'retrieved','checked':'2026-10-25'}

successes={
 'cloudflare-phish-blocked':'Ein zusätzlicher Sicherheitsschlüssel begrenzte den dokumentierten Phishing-Angriff trotz eingegebener Zugangsdaten.',
 'xz':'Die Untersuchung einer auffälligen Verzögerung machte den manipulierten Baustein sichtbar. Der Fund ist keine pauschale Unbedenklichkeitserklärung für jede Softwarelieferkette.',
 'unisuper-deleted':'Unabhängige Kopien halfen bei der Wiederherstellung. Der mehrtägige Ausfall selbst wird dadurch nicht verharmlost.',
 'lockheed':'Lockheed Martin meldete die Abwehr und nach eigener Darstellung keine kompromittierten Daten. Das ist der dokumentierte Berichtsumfang.'
}
for id,why in successes.items():
    c=next(x for x in stories if x['id']==id)
    c['success']=why
    if 'Gut gegangen!' not in c['tags']:c['tags'].append('Gut gegangen!')
    if 'resilienz' not in meta[id]['topics']:meta[id]['topics'].append('resilienz')
for c in stories:
    if c['id']=='tonga-cable2022':
        c['success']='Alternative Kommunikationswege und Kabelreparatur ermöglichten Wiederanbindung. Das bedeutet keine gleichzeitige vollständige Wiederherstellung aller Inselverbindungen.'

cascade_path=ROOT/'scripts/cascade-cases.json'
if cascade_path.exists():
    for id,stages in json.loads(cascade_path.read_text()).items():
        c=next(x for x in stories if x['id']==id)
        c['cascade']=stages
        checks[c['source'][1]]={'status':'retrieved','checked':'2026-10-25'}
        if 'Der zweite Fehler' not in c['tags']:c['tags'].append('Der zweite Fehler')
        if 'cascade' not in meta[id]['topics']:meta[id]['topics'].append('cascade')

for marker,value in [('const STORIES = ',stories),('const CASE_META = ',meta)]:
    a=page.index(marker)+len(marker);_,end=json.JSONDecoder().raw_decode(page[a:])
    page=page[:a]+json.dumps(value,ensure_ascii=False,separators=(',',':'))+page[a+end:]

if "['alltag','" not in page:
    a=page.index('const TOPICS=');b=page.index(';',a)
    page=page[:b]+page[b:].replace(';',";\nTOPICS.push(['alltag','📱','Alltag & Produktleben','QR-Codes, Dateispuren und die Lebensdauer vernetzter Käufe'],['gesellschaft','⌨️','Algorithmen & Zugang','Datengrundlagen, nachvollziehbare Entscheidungen und Barrierefreiheit'],['resilienz','🛡️','Gut gegangen!','Dokumentierte Abwehr und Wiederherstellung mit klaren Grenzen'],['zukunft','⏳','Zukunftslabor','Ausdrücklich fiktive Tests mit realen technischen Grundlagen']);",1)
    a=page.index('const TAG_LABELS=');b=page.index(';',a)
    page=page[:b]+page[b:].replace(';',";\nObject.assign(TAG_LABELS,{'Neue Themen':'✨ Neue Themen (11)','Gut gegangen!':'🛡️ Gut gegangen!','Zukunftslabor':'⏳ Zukunftslabor'});\nTAG_LABELS['Neu ab 2021']='Ergänzungen ab 2021 ('+STORIES.filter(c=>c.tags.includes('Neu ab 2021')).length+')';",1)
    target="<div class=\"heroactions\"><button class=\"btn ${state.tag==='Weitere 30'?'primary':''}\""
    replacement="<div class=\"heroactions\"><button class=\"btn ${state.tag==='Neue Themen'?'primary':''}\" data-tag=\"Neue Themen\" aria-pressed=\"${state.tag==='Neue Themen'}\">✨ Neue Themen (11)</button><button class=\"btn ${state.tag==='Weitere 30'?'primary':''}\""
    if target not in page:raise ValueError('Missing collection buttons')
    page=page.replace(target,replacement,1)
    page=page.replace('mit 370 IT-Geschichten','mit 381 IT-Geschichten')

if "['cascade','" not in page:
    a=page.index('const ARCHIVE_START=')
    page=page[:a]+"TOPICS.push(['cascade','🧩','Der zweite Fehler','Zusätzliche Fehler und Abhängigkeiten – Schritt für Schritt entscheiden']);\n"+page[a:]
if 'data-tag="Alltag &amp; Fehlerketten"' not in page:
    needle='<div class="heroactions"><button class="btn ${state.tag===\'Neue Themen\'?\'primary\':\'\'}"'
    replacement='<div class="heroactions"><button class="btn ${state.tag===\'Alltag & Fehlerketten\'?\'primary\':\'\'}" data-tag="Alltag &amp; Fehlerketten" aria-pressed="${state.tag===\'Alltag & Fehlerketten\'}">✨ Alltag & Fehlerketten (6)</button><button class="btn ${state.tag===\'Neue Themen\'?\'primary\':\'\'}"'
    if needle not in page:raise ValueError('Missing latest collection buttons')
    page=page.replace(needle,replacement,1)
    a=page.index('const TAG_LABELS=');b=page.index(';',a)
    page=page[:b]+page[b:].replace(';',";\nObject.assign(TAG_LABELS,{'Alltag & Fehlerketten':'✨ Alltag & Fehlerketten (6)','Der zweite Fehler':'🧩 Der zweite Fehler'});",1)
page=page.replace('mit 381 IT-Geschichten','mit 387 IT-Geschichten')
path.write_text(page)
(ROOT/'scripts/source-checks.json').write_text(json.dumps(checks,ensure_ascii=False,indent=2)+'\n')
for filename in ['package.json','package-lock.json']:
    p=ROOT/filename;d=json.loads(p.read_text());d['version']='2.4.0'
    if 'description' in d:d['description']=f'Statische Lern-App mit {len(stories)} illustrierten IT-Geschichten und Trainingsfällen'
    if 'packages'in d:d['packages']['']['version']='2.4.0'
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
p=ROOT/'manifest.webmanifest';d=json.loads(p.read_text());d['description']=f'{len(stories)} IT-Geschichten und Trainingsfälle lesen, anhören und mit Quiz lernen – auch offline.';p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
p=ROOT/'sw.js';p.write_text(p.read_text().replace('new-topics-v4','everyday-v5'))
print(json.dumps({'cases':len(stories),'newCases':len(new),'successCollection':sum('resilienz'in x['topics']for x in meta.values()),'fiction':sum(c['origin']=='Trainingsfall'for c in stories)}))
