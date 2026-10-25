const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const content=JSON.parse(fs.readFileSync('scripts/security-content.json'));
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
function boot(hash=''){return new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://adrakir.github.io/'+hash,runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};}});}
let dom=boot(),w=dom.window,d=w.document;const ev=s=>w.eval(s),click=s=>{const el=d.querySelector(s);assert(el,s);el.click();};
assert(d.querySelector('.security-entry'));click('[data-action="security"]');assert.equal(w.location.hash,'#sicherheit');assert.equal(d.querySelectorAll('.security-tile').length,8);assert(!d.querySelector('#fall-des-tages'));assert(!d.querySelector('.casecard'));assert(d.querySelector('[aria-current="page"][data-action="security"]'));
const original=ev('JSON.stringify({done:state.done,visited:state.visited,reviews:state.reviews})');
assert.equal(content.length,8);assert.equal(new Set(content.map(x=>x.id)).size,8);
for(const m of content){
 click(`[data-security-module="${m.id}"]`);assert.equal(w.location.hash,'#sicherheit='+m.id);assert.equal(d.querySelectorAll('.security-text p').length,3);assert.equal(d.querySelectorAll('[data-security-check]').length,3);
 for(const id of m.cases)assert(ev(`!!find(${JSON.stringify(id)})`),'Missing related case '+id);
 const wrong=(m.question[2]+1)%3;click(`[data-security-answer="${wrong}"]`);assert(d.querySelector('.feedback.wrong'));assert(d.querySelector('.feedback').textContent.includes(m.question[3]));assert.equal(d.querySelectorAll('[data-security-answer]:disabled').length,3);
 click('[data-security-retry]');assert(!d.querySelector('.feedback'));click(`[data-security-answer="${m.question[2]}"]`);assert(d.querySelector('.feedback.correct'));
 const box=d.querySelector('[data-security-check]');box.click();assert(box.checked);click('[data-security-home]');click(`[data-security-module="${m.id}"]`);assert(d.querySelector('[data-security-check]').checked,'Checklist should survive navigation');
 click('[data-security-home]');
}
assert(d.querySelector('[role="status"]').textContent.includes('8 von 8'));assert.equal(ev('JSON.stringify({done:state.done,visited:state.visited,reviews:state.reviews})'),original,'Security learning must not modify case progress');
click('[data-security-module="konten"]');click('[data-open="sec-simswap2024"]');assert(d.querySelector('.storyhead'));click('[data-action="security"]');assert.equal(d.querySelectorAll('.security-tile').length,8);click('[data-action="library"]');assert(d.querySelector('#fall-des-tages'));assert.equal(ev('STORIES.length'),387);assert(!d.querySelector('input[type="password"],input[type="file"]'));w.close();
for(const [hash,id]of[['#sicherheit',''],['#sicherheit=backups','backups'],['#sicherheit=unbekannt','']]){dom=boot(hash);w=dom.window;d=w.document;assert.equal(w.eval('state.screen'),'security');assert.equal(w.eval('securityLearning.module')||'',id);assert.equal(d.querySelectorAll('.security-tile').length,id?0:8);assert.equal(w.eval('Object.keys(securityLearning.answers).length'),0);w.close();}
assert.equal(errors.length,0,errors.join('\n'));console.log(JSON.stringify({units:8,questions:8,wrongFeedback:'pass',retry:'pass',separateProgress:'pass',sessionChecks:'pass',deepLinks:'pass',relatedCases:'pass',errors}));
