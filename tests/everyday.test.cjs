const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const vc=new VirtualConsole(),errors=[];vc.on('jsdomError',e=>errors.push(e.message));
function start(url='https://adrakir.github.io/'){return new JSDOM(fs.readFileSync('index.html','utf8'),{url,runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};}});}
let dom=start(),w=dom.window,d=w.document,ev=s=>w.eval(s);
const click=s=>{const el=d.querySelector(s);assert(el,s);el.click();};
const cases=ev('STORIES'),added=cases.slice(381);assert.equal(cases.length,387);assert.equal(added.length,6);assert.equal(new Set(cases.map(c=>c.id)).size,387);assert.equal(new Set(cases.map(c=>c.title)).size,387);
assert.equal(added.filter(c=>c.origin==='Trainingsfall').length,2);assert.equal(cases.filter(c=>c.origin==='Trainingsfall').length,7);assert.equal(new Set(added.map(c=>c.image)).size,6);
click('[data-tag="Alltag & Fehlerketten"]');assert.equal(ev('getFilteredCases().length'),6);assert.equal(d.querySelectorAll('.casecard').length,6);
let chapters=0,questions=0;
for(const c of added){assert.equal(c.daily.length,4);assert(c.daily.join(' ').split(/\s+/).length>=55,c.id);assert(c.reading.sourceStatus.checked);ev(`openShort(${JSON.stringify(c.id)})`);if(c.origin==='Trainingsfall')assert(d.querySelector('.type-fiction'));ev(`openStory(${JSON.stringify(c.id)})`);for(let i=0;i<3;i++){click(`[data-chapter="${i}"]`);assert.equal(d.querySelector('.storytext').textContent,c.acts[i][1]);chapters++;}for(const [kind,q]of[['q',c.quiz],['decision',c.decision]]){click(`[data-pick="${kind}"][data-opt="${q[2]}"]`);questions++;}assert(ev(`completed(${JSON.stringify(c.id)})`));}
ev('openStory("leading-zero-training")');let select=d.querySelector('#identifier-value');assert(select);assert(d.querySelector('#identifier-result').textContent.includes('00123'));select.value='000045';select.dispatchEvent(new w.Event('change',{bubbles:true}));assert(d.querySelector('#identifier-result').textContent.includes('000045'));assert(d.querySelector('#identifier-result').textContent.includes('nicht wiederhergestellt'));assert.equal(d.querySelectorAll('#identifier-result>span').length,3);
ev('go("library")');click('[data-topic="cascade"]');assert.equal(ev('getFilteredCases().length'),4);assert.equal(ev('getFilteredCases().filter(c=>c.origin==="Trainingsfall").length'),0);
ev('openShort("sec-simswap2024")');assert(d.querySelector('[data-cascade="sec-simswap2024"]'));click('[data-cascade="sec-simswap2024"]');assert.equal(ev('state.lab.mode'),'cascade');assert.equal(d.querySelectorAll('.historical-step').length,0);
const cascades=cases.filter(c=>c.cascade);assert.equal(cascades.length,4);let stages=0;
for(const c of cascades){
 ev(`startCascade(${JSON.stringify(c.id)})`);const savedDone=ev('JSON.stringify(state.done)');
 for(let i=0;i<3;i++){
  assert.equal(ev('state.lab.stage'),i);assert(!d.querySelector('.historical-step'));
  const q=c.cascade[i],correct=q.answer;click(`[data-cascade-pick="${correct}"]`);assert.equal(d.querySelector('.historical-step p').textContent,q.happened);assert(d.querySelector('.feedback.correct'));
  const score=ev('state.lab.score');ev(`pickCascade(${correct})`);assert.equal(ev('state.lab.score'),score,'Repeated clicks must not rescore');
  click('[data-cascade-next]');stages++;
 }
 assert(d.querySelector('h1').textContent.includes('durchgearbeitet'));assert(d.querySelector('.cascade-card').textContent.includes('3 von 3'));assert.equal(ev('JSON.stringify(state.done)'),savedDone,'Supplemental exercise must preserve completion state');
}
ev('startCascade("meta-bgp")');const step=ev('find("meta-bgp").cascade[0]'),wrong=1-step.answer;click(`[data-cascade-pick="${wrong}"]`);assert(d.querySelector('.feedback.wrong'));assert.equal(d.querySelector('.historical-step p').textContent,step.happened);assert.equal(ev('state.lab.score'),0);
const feed=JSON.parse(fs.readFileSync('daily-stories.json'));assert.equal(feed.stories.length,387);assert.deepEqual(feed.stories,JSON.parse(JSON.stringify(cases.map(c=>Object.fromEntries(['id','number','title','year','origin','daily','lesson','source'].map(k=>[k,c[k]]))))));
assert.equal(ev('editorialCandidates().length'),0);assert.equal(ev('dailyCase(new Date("2026-10-25T12:00:00Z")).c.id'),'libwebp2023');
const sourceData=JSON.parse(fs.readFileSync('scripts/everyday-cases.json'));assert(sourceData.find(c=>c.id==='goodrx-trackers2023').acts[1][1].includes('widersprach'));assert(!d.querySelector('input[type="file"]'));
w.close();dom=start('https://adrakir.github.io/#uebungen=cascade');w=dom.window;d=w.document;assert.equal(w.eval('state.lab.mode'),'cascade');assert(d.querySelector('.cascade-card'));w.close();assert.equal(errors.length,0,errors.join('\n'));
console.log(JSON.stringify({cases:387,added:6,chapters,standardQuestions:questions,cascadeCases:cascades.length,cascadeDecisions:stages,wrongChoiceHistory:'preserved',identifierSimulation:'pass',deepLink:'pass',feed:'exact match',errors}));
