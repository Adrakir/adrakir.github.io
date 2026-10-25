const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://adrakir.github.io/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};}});
const w=dom.window,d=w.document,ev=s=>w.eval(s),cases=ev('STORIES'),added=cases.slice(370,381),feed=JSON.parse(fs.readFileSync('daily-stories.json'));
const click=s=>{const el=d.querySelector(s);assert(el,s);el.click();};
assert.equal(cases.length,387);assert.equal(added.length,11);assert.equal(feed.stories.length,387);
assert.equal(new Set(cases.map(c=>c.id)).size,387);assert.equal(new Set(cases.map(c=>c.title)).size,387);
assert.equal(new Set(added.map(c=>c.image)).size,11);assert.equal(new Set(added.flatMap(c=>[c.quiz[0],c.decision[0]])).size,22);
assert.equal(cases.filter(c=>c.origin==='Trainingsfall').length,7);
assert.deepEqual(feed.stories,JSON.parse(JSON.stringify(cases.map(c=>Object.fromEntries(['id','number','title','year','origin','daily','lesson','source'].map(k=>[k,c[k]]))))));
click('[data-tag="Neue Themen"]');assert.equal(ev('getFilteredCases().length'),11);assert.equal(d.querySelectorAll('.casecard').length,11);
let chapters=0,questions=0;
for(const c of added){
 assert.equal(c.acts.length,3);assert.equal(c.daily.length,4);assert(c.daily.join(' ').split(/\s+/).length>=55,c.id);assert.equal(c.reading.sourceStatus.checked,'2026-10-25');
 ev(`openShort(${JSON.stringify(c.id)})`);assert(d.querySelector('h1').textContent.includes(c.title));
 if(c.origin==='Trainingsfall'){assert(d.querySelector('.type-fiction'));assert(/fiktiv/i.test(d.querySelector('.brief-text').textContent));}
 ev(`openStory(${JSON.stringify(c.id)})`);
 for(let i=0;i<3;i++){click(`[data-chapter="${i}"]`);assert.equal(d.querySelector('.storytext').textContent,c.acts[i][1]);chapters++;}
 for(const [kind,q] of [['q',c.quiz],['decision',c.decision]]){click(`[data-pick="${kind}"][data-opt="${q[2]}"]`);questions++;}
 assert(ev(`completed(${JSON.stringify(c.id)})`));
}
ev('openStory("rhysida-recovery2024")');assert(d.querySelector('.success-notice').textContent.includes('keine Erfolgsgarantie'));click('.success-notice [data-topic="resilienz"]');assert.equal(ev('state.screen'),'library');assert.equal(ev('state.topic'),'resilienz');assert.equal(ev('getFilteredCases().length'),7);assert.equal(w.location.hash,'#start');
for(const c of ev('getFilteredCases()')){assert(c.success,c.id);}
ev('go("library")');click('[data-topic="zukunft"]');assert.equal(ev('getFilteredCases().length'),1);assert.equal(ev('getFilteredCases()[0].id'),'time2038-training');
ev('openStory("time2038-training")');const input=d.querySelector('#time-lab-value');assert(input);assert(d.querySelector('#time-lab-result').textContent.includes('2038-01-19'));input.value='2147483648';input.dispatchEvent(new w.Event('input',{bubbles:true}));assert(d.querySelector('#time-lab-result').textContent.includes('1901-12-13'));assert(d.querySelector('#time-lab-result').textContent.includes('-2.147.483.648'));assert.equal(ev('state.screen'),'story');
ev('openShort("time2038-training")');assert(d.querySelector('#time-lab-result').textContent.includes('2038-01-19'));assert(ev('termHTML("Quishing GNSS WCAG")').includes('data-term="GNSS"'));
// Historical daily choices remain stable after extending the collection.
assert.equal(ev('dailyCase(new Date("2026-10-24T12:00:00Z")).c.id'),'mizuho');assert.equal(ev('dailyCase(new Date("2026-10-25T12:00:00Z")).c.id'),'libwebp2023');
assert.equal(ev('editorialCandidates().length'),0);assert.equal(errors.length,0,errors.join('\n'));w.close();console.log(JSON.stringify({cases:cases.length,added:11,newChapters:chapters,newQuestions:questions,successSeries:7,fiction:cases.filter(c=>c.origin==='Trainingsfall').length,utcTimeSimulation:'pass',filters:'pass',feed:'exact match',errors}));
