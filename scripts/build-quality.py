"""Embed the offline quality UI in the existing buildless application."""
from pathlib import Path
import re
import sys

root=Path(__file__).resolve().parent.parent
p=root/'index.html'
s=p.read_text()
if '// QUALITY_UI_START' in s:
    ui=(root/'scripts/quality-ui.js').read_text()
    s=re.sub(r'// QUALITY_UI_START.*?// QUALITY_UI_END', lambda _: '// QUALITY_UI_START\n'+ui+'\n// QUALITY_UI_END', s, flags=re.S)
    css=(root/'scripts/quality.css').read_text()
    if '/* QUALITY_CSS_START */' in s:
        s=re.sub(r'/\* QUALITY_CSS_START \*/.*?/\* QUALITY_CSS_END \*/', lambda _: '/* QUALITY_CSS_START */\n'+css+'\n/* QUALITY_CSS_END */', s, flags=re.S)
    else:
        a=s.index('\n.term{display:inline'); b=s.index('</style>',a)
        s=s[:a]+'\n/* QUALITY_CSS_START */\n'+css+'\n/* QUALITY_CSS_END */\n'+s[b:]
    p.write_text(s)
    print('Embedded quality UI and CSS refreshed.')
    sys.exit(0)
def replace(old,new,count=1):
    global s
    if s.count(old)!=count:
        raise ValueError((old[:100],s.count(old),count))
    s=s.replace(old,new)

replace('theme:state.theme,large:', 'readingLevel:state.readingLevel,theme:state.theme,large:')
replace('${typeNotice(c)}</section>\n <div class="storylayout">','${typeNotice(c)}${readingTools(c)}</section>\n <div class="storylayout">')
replace('<p class="storytext">${esc(a[1])}</p>', '<div class="storytext">${chapterText(c,state.act)}</div>${state.act===1?decisionMoment(c):\'\'}')
replace('<h3 style="margin-top:9px">Quellenhinweis</h3>', '<h3 style="margin-top:9px">Quellenhinweis</h3>${sourceStatusHTML(c)}')
# Both daily and short/archive summaries use the same term-aware text renderer.
replace('${esc(p)}</p>`).join(\'\')}', '${termHTML(p)}</p>`).join(\'\')}', 2)
replace('function sourcesHTML(c){return `<details', 'function sourcesHTML(c){return `${sourceStatusHTML(c)}<details')
# Only the quiz hub, not challenge result screens, receives the extra modes here.
begin=s.index('function renderQuizHub()')
end=s.index('\n}',begin) if '\n}' in s[begin:] else len(s)
pos=s.index('${badgesHTML()}',begin)
s=s[:pos]+'${practiceHubHTML()}'+s[pos:]
replace('renderShell(`<section class="hero"><div class="eyebrow">Sammlung mit Augenmaß', 'renderShell(`${qualitySummaryHTML()}<section class="hero"><div class="eyebrow">Sammlung mit Augenmaß')
replace('${pwaSettingsHTML()}<section', '${pwaSettingsHTML()}<section class="setting"><h3>Begriffe & Verständlichkeit</h3><p>Technikbegriffe antippen oder im Wörterbuch nachschlagen. Die Lesestufe wählst du in jeder Akte.</p><button class="btn" data-action="glossary">Wörterbuch öffnen</button></section><section')
replace("function render(){stopSpeak();if(state.screen==='story')", "function render(){stopSpeak();if(state.screen==='lab'){if(!state.lab)startLab(state.labMode||'order');else renderLab();}else if(state.screen==='story')")
replace("function setRoute(){let hash=state.screen==='story'", "function setRoute(){let hash=state.screen==='lab'?'#uebungen='+(state.lab?.mode||'order'):state.screen==='story'")
replace("if(p.has('akte')&&find(p.get('akte')))", "if(['order','match','error'].includes(p.get('uebungen'))){state.screen='lab';state.labMode=p.get('uebungen');state.lab=null;}else if(p.has('akte')&&find(p.get('akte')))")
replace("const paragraphs=act[1].split(/\\n\\s*\\n/);", "const paragraphs=(state.readingLevel==='easy'?c.reading.summary[chapter]:act[1]).split(/\\n\\s*\\n/);")
replace("Ein historischer Fall, redaktionell nacherzählt. Quellenart: ", "Ein dokumentierter Fall, redaktionell nacherzählt. Quellenart: ")
replace("const sentences=clean.split(/(?<=[.!?…])\\s+/u);", "const rawSentences=clean.split(/(?<=[.!?…])\\s+/u);\n const sentences=[];let pending='';\n for(const part of rawSentences){pending+=(pending?' ':'')+part;if(/(?:\\b\\d{1,2}|\\b(?:z|B|bzw|ca|Dr|Prof|S|Nr))\\.$/.test(pending))continue;sentences.push(pending);pending='';}\n if(pending)sentences.push(pending);")
replace(".replace(/\\bGitHub\\b/g,'Git Hub').replace(/\\s+/g,' ').trim();", ".replace(/\\bGitHub\\b/g,'Git Hab').replace(/\\bCCC\\b/g,'Chaos Computer Club')\n  .replace(/\\bWebP\\b/g,'Web Pi').replace(/\\bCache\\b/g,'Käsch').replace(/\\bCaches\\b/g,'Käsches')\n  .replace(/\\bSQL\\b/g,'S Q L').replace(/\\bHTML\\b/g,'H T M L').replace(/\\bHTTP(S)?\\b/g,(_,s)=>s?'H T T P S':'H T T P')\n  .replace(/\\bCPU\\b/g,'C P U').replace(/\\bGPU\\b/g,'G P U').replace(/\\bVPN\\b/g,'V P N')\n  .replace(/\\bCVE\\b/g,'C V E').replace(/\\bIoT\\b/g,'Internet der Dinge')\n  .replace(/\\s+/g,' ').trim();")

css=(root/'scripts/quality.css').read_text()

replace('</style></head>','/* QUALITY_CSS_START */\n'+css+'\n/* QUALITY_CSS_END */\n</style></head>')
ui=(root/'scripts/quality-ui.js').read_text()
replace('readRoute();render();setupPwa();', '// QUALITY_UI_START\n'+ui+'\n// QUALITY_UI_END\nreadRoute();render();setupPwa();')
p.write_text(s)
sw=root/'sw.js';sw.write_text(sw.read_text().replace('another30-v1','quality-v2'))
package=root/'package.json';package.write_text(package.read_text().replace('340 illustrierten','370 illustrierten').replace('2.1.0','2.2.0'))
print('Quality UI embedded; offline version updated.')
