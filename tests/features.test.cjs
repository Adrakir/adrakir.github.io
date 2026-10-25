const fs=require('fs'),assert=require('node:assert/strict');
const {JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('index.html','utf8');let now=Date.parse('2026-10-25T12:00:00Z');
const errors=[],utterances=[];
function start(saved,url='https://adrakir.github.io/'){
 const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 return new JSDOM(html,{url,runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){
  const Original=w.Date;w.Date=class extends Original{constructor(...a){super(...(a.length?a:[now]));}static now(){return now;}};
  w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.confirm=()=>true;
  w.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  w.speechSynthesis={getVoices:()=>[],speak:u=>utterances.push(u),cancel:()=>utterances.splice(0),pause:()=>{},resume:()=>{}};
  if(saved)w.localStorage.setItem('it-pannenakte-bsi-v1',JSON.stringify(saved));
 }});
}
let dom=start({favorites:['loveletter'],visited:{loveletter:true},done:{loveletter:{q:true,decision:true}},theme:'light'}),w=dom.window,d=w.document,ev=s=>w.eval(s);
function click(selector){const el=d.querySelector(selector);assert(el,selector);el.click();}
assert.equal(ev('STORIES.length'),387);assert.equal(ev('completed("loveletter")'),true);assert.equal(ev('state.favorites[0]'),'loveletter');assert.equal(d.body.dataset.theme,'light');
assert.equal(d.querySelectorAll('.topic-card').length,13);
let shortCount=0;
for(const c of ev('STORIES')){ev(`openShort(${JSON.stringify(c.id)})`);assert.equal(d.querySelectorAll('.brief-text p').length,4);assert.equal(d.querySelector('.brief-text').textContent,c.daily.join(''));assert(d.querySelector('.content-type').textContent.includes(ev(`contentType(find(${JSON.stringify(c.id)})).label`)));shortCount++;}
ev('openShort("xerox2013")');click('[data-brief-speak]');assert.equal(ev('speechTask.mode'),'short');utterances[0].onstart();assert(d.querySelector('#speech-status').textContent.includes('läuft'));
let spoken=0;while(utterances.length){let u=utterances.shift();u.onstart?.();u.onend?.();assert(++spoken<30);}assert(d.querySelector('#speech-status').textContent.includes('zu Ende'));click('[data-open="xerox2013"]');assert.equal(ev('state.screen'),'story');assert(d.querySelector('[data-short="xerox2013"]'));assert(d.querySelectorAll('.related-card').length>=1);
click('[data-editorial="xerox2013"]');assert.equal(ev('state.editorial.xerox2013'),true);ev('go("editorial")');assert(d.querySelector('.flag-row').textContent.includes('Scanner'));assert.equal(ev('editorialCandidates().length'),0);
assert.equal(ev('overlapCandidates([STORIES[0],{...STORIES[0],id:"dupe"}]).length'),1);
assert.equal(ev('overlapCandidates([find("rsa"),find("lockheed")]).length'),0);
click('[data-compare="rsa|lockheed"]');assert.equal(ev('state.compareA'),'rsa');assert.equal(ev('state.compareB'),'lockheed');assert.equal(d.querySelectorAll('.compare-card').length,2);
ev('go("library")');click('[data-topic="ccc"]');assert.equal(ev('getFilteredCases().length'),24);assert(ev('getFilteredCases().some(c=>c.id==="xerox2013")'));
click('[data-action="reset-filters"]');const type=d.querySelector('#content-type');type.value='fiction';type.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(ev('getFilteredCases().length'),7);assert.equal(d.querySelectorAll('.type-fiction').length,7);
click('[data-action="reset-filters"]');click('[data-tag="Weitere 30"]');assert.equal(d.querySelectorAll('.casecard').length,24);click('[data-action="more"]');assert.equal(d.querySelectorAll('.casecard').length,30);
ev('go("archive")');assert.equal(ev('state.archiveDate'),'2026-10-25');assert(d.querySelector('.brief-card').textContent.includes('Das Bild mit zu viel Wirkung'));click('[data-archive-shift="-1"]');assert.equal(ev('state.archiveDate'),'2026-10-24');assert(d.querySelector('.brief-card').textContent.includes('610.000 Aktien'));
assert.equal(ev('setArchiveDate("2026-10-23")'),false);assert.equal(ev('setArchiveDate("2026-02-30")'),false);assert.equal(ev('setArchiveDate("2026-10-26")'),false);assert.equal(ev('state.archiveDate'),'2026-10-24');click('[data-archive-shift="1"]');assert.equal(ev('state.archiveDate'),'2026-10-25');
// Wrong choices survive a reload and become due only after five minutes.
ev('openStory("xerox2013");state.act=2;renderStory()');click('[data-pick="q"][data-opt="1"]');assert.equal(ev('reviewEntries().length'),1);assert.equal(ev('dueReviewEntries().length'),0);assert(d.querySelector('.feedback.wrong').textContent.includes(ev('find("xerox2013").quiz[3]')));
ev('go("quizhub")');assert(d.querySelector('[data-action="start-review"]').disabled);now+=5*60000;ev('renderQuizHub()');assert.equal(ev('dueReviewEntries().length'),1);click('[data-action="start-review"]');assert.equal(ev('state.marathon.review'),true);click('[data-marathon-pick="0"]');assert.equal(ev('state.reviews["xerox2013|q"].streak'),1);assert.equal(ev('dueReviewEntries().length'),0);click('[data-action="marathon-next"]');assert(d.querySelector('.endresult').textContent.includes('1 von 1'));
now+=86400000;ev('go("quizhub")');click('[data-action="start-review"]');click('[data-marathon-pick="0"]');assert.equal(ev('state.reviews["xerox2013|q"].streak'),2);now+=3*86400000;ev('startReview()');click('[data-marathon-pick="0"]');assert.equal(ev('reviewEntries().length'),0);
// Quiz challenge errors use the same persistent review queue.
ev('startMarathon()');let item=ev('state.marathon.items[0]'),q=ev('challengeQuestion(state.marathon.items[0]).q'),wrong=(q[2]+1)%3;click(`[data-marathon-pick="${wrong}"]`);assert.equal(ev('reviewEntries().length'),1);
const stored=JSON.parse(w.localStorage.getItem('it-pannenakte-bsi-v1'));assert(stored.reviews[item.id+'|'+item.kind]);assert(stored.editorial.xerox2013);assert(stored.done.loveletter.q);
// Browser install prompt is triggered only after an explicit button press.
ev('go("settings")');let prompts=0,event=new w.Event('beforeinstallprompt',{cancelable:true});event.prompt=async()=>{prompts++};event.userChoice=Promise.resolve({outcome:'dismissed'});w.dispatchEvent(event);assert.equal(prompts,0);assert(d.querySelector('[data-action="install"]').textContent.includes('installieren'));click('[data-action="install"]');assert.equal(prompts,1);
dom.window.close();dom=start(stored,'https://adrakir.github.io/#akte=coffeecam1991&ansicht=kurz');w=dom.window;d=w.document;assert.equal(w.eval('state.screen'),'short');assert(d.querySelector('.type-history'));assert.equal(w.eval('reviewEntries().length'),1);assert(w.eval('state.editorial.xerox2013'));dom.window.close();
assert.equal(errors.length,0,errors.join('\n'));console.log(JSON.stringify({shortVersions:shortCount,topicFilters:'pass',classification:'pass',archiveAndDateBounds:'pass',speech:'pass',relatedAndEditorial:'pass',persistentSpacedReview:'pass',migration:'pass',deepLinks:'pass',installUserGesture:'pass',errors}));
