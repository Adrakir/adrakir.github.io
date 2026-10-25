const fs=require('node:fs'),assert=require('node:assert/strict');
const {JSDOM,VirtualConsole}=require('jsdom');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://adrakir.github.io/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};}});
const w=dom.window,d=w.document,ev=s=>w.eval(s);
const click=s=>{const el=d.querySelector(s);assert(el,s);el.click();};
const cases=ev('STORIES');
assert.equal(cases.length,387);
for(const c of cases){
 assert.equal(c.acts.length,3);assert.equal(c.daily.length,4);assert.equal(c.reading.summary.length,3);
 for(const p of c.daily)assert(!/\b\d{1,2}\.$/.test(p),`${c.id}: ${p}`);
 for(const field of ['quiz','decision']){assert.equal(c[field][1].length,3);assert.equal(new Set(c[field][1]).size,3,`${c.id} ${field}`);assert(c[field][2]>=0&&c[field][2]<3);}
}
const ihk=cases.find(c=>c.id==='ihk');assert(ihk.daily[1].includes('3. August 2022'));assert(ihk.daily[1].includes('ungewöhnliches Verhalten'));
assert.equal(ev('find("ovh-fire").daily[2]'),'Am 10. März 2021 brach am Standort Straßburg ein Brand aus.');
ev('openStory("log4shell")');assert(d.querySelector('.reading-tools'));assert.equal(d.querySelectorAll('.case-overview li').length,4);
click('[data-reading="easy"]');assert.equal(ev('state.readingLevel'),'easy');assert(d.querySelector('.storytext').textContent.length<ev('find("log4shell").acts[0][1].length'));
assert.equal(JSON.parse(w.localStorage.getItem('it-pannenakte-bsi-v1')).readingLevel,'easy');
click('[data-reading="technical"]');assert.equal(d.querySelector('.storytext').textContent,ev('find("log4shell").acts[0][1]'));
assert(d.querySelector('.storytext [data-term]'));click('.storytext [data-term]');assert(d.querySelector('#learning-dialog[open]'));assert(d.querySelector('#learning-dialog').textContent.includes('Beispiel'));
click('[data-action="glossary"]');const search=d.querySelector('#glossary-search');search.value='Decoder';search.dispatchEvent(new w.Event('input',{bubbles:true}));assert(d.querySelectorAll('[data-glossary-entry]:not([hidden])').length>=1);
search.value='xyz-nichtvorhanden';search.dispatchEvent(new w.Event('input',{bubbles:true}));assert.equal(d.querySelectorAll('[data-glossary-entry]:not([hidden])').length,0);assert(!d.querySelector('#glossary-empty').hidden);click('[data-close-dialog]');
ev('state.act=1;renderStory()');assert(d.querySelector('.decision-moment'));click('[data-pick="decision"][data-opt="0"]');assert(ev('done("log4shell").decision'));click('.decision-moment [data-chapter="2"]');assert.equal(ev('state.act'),2);
assert(d.querySelector('.source-status'));assert(d.querySelector('.source-status').textContent.includes('25.10.2026'));
click('[data-report="log4shell"]');assert(d.querySelector('#report-body').value.includes('Fall-ID: log4shell'));let link=new URL(d.querySelector('#report-link').href);assert.equal(link.hostname,'github.com');assert(link.searchParams.get('body').includes('log4shell'));
d.querySelector('#report-body').value+='Test <script> bleibt Text';d.querySelector('#report-body').dispatchEvent(new w.Event('input',{bubbles:true}));assert(new URL(d.querySelector('#report-link').href).searchParams.get('body').includes('Test <script> bleibt Text'));click('[data-close-dialog]');
ev('go("quizhub")');click('[data-lab="order"]');assert.equal(d.querySelectorAll('.order-list li').length,3);assert.notEqual(ev('state.lab.order.join()'),'0,1,2');
ev('state.lab.order=[0,1,2];renderLab()');click('[data-check-lab]');assert(d.querySelector('.feedback.correct'));assert(!d.querySelector('[data-move]:not([disabled])'));
ev('startLab("order")');const before=ev('state.lab.order.join()');click('[data-move="0"][data-direction="1"]');assert.notEqual(ev('state.lab.order.join()'),before);
ev('startLab("match")');click('[data-check-lab]');assert(!ev('state.lab.checked'));assert(d.querySelector('#lab-status').textContent.includes('alle drei'));
for(const el of d.querySelectorAll('[data-match]')){el.value=el.dataset.match;el.dispatchEvent(new w.Event('change',{bubbles:true}));}click('[data-check-lab]');assert.equal(d.querySelectorAll('.feedback.correct').length,3);
for(const isTrue of [true,false]){ev('startLab("error")');ev(`state.lab.statementIsTrue=${isTrue};state.lab.errorStatement=${isTrue?'find(state.lab.id).quiz[1][find(state.lab.id).quiz[2]]':'find(state.lab.id).quiz[1].find((_,i)=>i!==find(state.lab.id).quiz[2])'};renderLab()`);click(`[data-error-answer="${isTrue}"]`);click('[data-check-lab]');assert(d.querySelector('.feedback.correct'));}
assert(ev('speechChunks("Am 19. Juli 2024 erschien das Update. Danach gab es Probleme.").every(x=>!/^Am 19\\.$/.test(x))'));
assert(ev('spokenText("CCC WebP Cache VPN")').includes('Chaos Computer Club'));
assert(!ev('termHTML("<script>alert(1)</script> Token")').includes('<script>'));
ev('openShort("forgot-backup")'); // unknown IDs must not crash or change data
ev('go("editorial")');assert(d.querySelector('.quality-summary').textContent.includes('387 Akten'));assert.equal(ev('editorialCandidates().length'),0);
assert.equal(errors.length,0,errors.join('\n'));w.close();
console.log(JSON.stringify({auditAll:387,readingLevels:'pass',glossaryAndEscaping:'pass',preOutcomeDecision:'pass',reportDraftOnly:'pass',ordering:'pass',matching:'pass',trueAndFalseClaims:'pass',dateSpeech:'pass',errors}));
