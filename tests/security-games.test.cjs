const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const vc=new VirtualConsole(),errors=[];vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://adrakir.github.io/#sicherheit',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};}}),w=dom.window,d=w.document,ev=s=>w.eval(s);
const click=s=>{const el=d.querySelector(s);assert(el,s);el.click();};
const content=JSON.parse(fs.readFileSync('scripts/security-games.json')),baseline=ev('JSON.stringify({done:state.done,visited:state.visited,review:state.review})');
assert.equal(Object.keys(content).length,8);let games=0,examples=0;const types=new Set();
for(const [id,pack] of Object.entries(content)){
 click(`[data-security-module="${id}"]`);assert.equal(d.querySelectorAll('[data-sg-start]').length,3);assert.equal(d.querySelectorAll('.sg-node').length,3);assert.equal(pack.games.length,3);
 const initial=d.querySelector('.sg-outcome').textContent;
 for(let i=0;i<pack.example.states.length;i++){click(`[data-sg-example="${i}"]`);assert.equal(d.querySelector('.sg-outcome').textContent,pack.example.states[i].result);assert.equal(d.querySelectorAll('.sg-node').length,3);examples++;}
 assert.notEqual(d.querySelector('.sg-outcome').textContent,initial);
 for(let gi=0;gi<3;gi++){
  const c=pack.games[gi];types.add(c.kind);click(`[data-sg-start="${gi}"]`);assert(d.querySelector('.sg-board'));assert(!d.querySelector('.sg-victory'));
  const run=()=>ev(`securityPlay.runs[${JSON.stringify(id)}]`);
  if(c.kind==='sort'){
   const wrong=(c.items[0].answer+1)%c.labels.length;click(`[data-sg-bin="${wrong}"]`);assert.equal(run().index,0);assert(!run().locked);assert(d.querySelector('.sg-feedback.risk'));
   for(const item of c.items){click(`[data-sg-bin="${item.answer}"]`);assert(run().locked);assert.equal(d.querySelectorAll('[data-sg-bin]:disabled').length,c.labels.length);click('[data-sg-next]');}
  }else if(c.kind==='order'){
   click('[data-sg-step="1"]');assert.equal(run().solved.length,0);assert(d.querySelector('.sg-feedback.risk'));for(let i=0;i<c.items.length;i++)click(`[data-sg-step="${i}"]`);
  }else if(c.kind==='match'){
   click('[data-sg-right="0"]');assert.equal(run().solved.length,0);click('[data-sg-left="0"]');click('[data-sg-right="1"]');assert.equal(run().solved.length,0);assert(d.querySelector('.sg-feedback.risk'));
   for(let i=0;i<c.items.length;i++){click(`[data-sg-left="${i}"]`);click(`[data-sg-right="${i}"]`);}
  }else if(c.kind==='detect'){
   assert.equal(c.items.filter(x=>x.risk).length,3);click(`[data-sg-clue="${c.items.findIndex(x=>!x.risk)}"]`);assert.equal(run().solved.length,0);for(let i=0;i<c.items.length;i++)if(c.items[i].risk)click(`[data-sg-clue="${i}"]`);
  }else if(c.kind==='build'){
   assert.equal(c.items.filter(x=>x.safe).length,3);click('[data-sg-test]');assert(!run().complete);const bad=c.items.findIndex(x=>!x.safe);click(`[data-sg-toggle="${bad}"]`);click('[data-sg-test]');assert(d.querySelector('.sg-feedback.risk'));assert(!run().complete);click(`[data-sg-toggle="${bad}"]`);for(let i=0;i<c.items.length;i++)if(c.items[i].safe)click(`[data-sg-toggle="${i}"]`);click('[data-sg-test]');
  }else if(c.kind==='memory'){
   const deck=Array.from(run().deck);assert.equal(deck.length,8);const other=deck.findIndex(x=>x!==deck[0]);click('[data-sg-card="0"]');click(`[data-sg-card="${other}"]`);assert.equal(run().solved.length,0);assert(d.querySelector('[data-sg-cover]'));click('[data-sg-cover]');assert.equal(d.querySelectorAll('.sg-memory-card.is-open').length,0);
   for(let pair=0;pair<c.items.length;pair++){const loc=deck.map((x,i)=>x===pair?i:-1).filter(i=>i>=0);click(`[data-sg-card="${loc[0]}"]`);click(`[data-sg-card="${loc[1]}"]`);}
  }else assert.fail(c.kind);
  assert(run().complete,c.title);assert(d.querySelector('.sg-victory').textContent.includes(c.lesson));assert(ev(`securityPlay.awards[${JSON.stringify(id+'|'+gi)}]`));games++;
 }
 // Changing the original understanding answer re-renders the unit; game state must survive.
 click('[data-security-answer="0"]');assert(d.querySelector('.sg-victory'));click('[data-security-home]');
}
assert.equal(games,24);assert.equal(types.size,6);assert.equal(ev('Object.keys(securityPlay.awards).length'),24);assert.equal(ev('JSON.stringify({done:state.done,visited:state.visited,review:state.review})'),baseline);
click('[data-security-module="konten"]');click('[data-sg-start="0"]');const before=ev('Object.keys(securityPlay.awards).length');click('[data-sg-restart]');assert(!d.querySelector('.sg-victory'));assert.equal(ev('Object.keys(securityPlay.awards).length'),before,'Replaying must not remove earned stars');
click('[data-sg-card="0"]');assert(d.activeElement.hasAttribute('data-sg-card'),'Keyboard focus should stay in the game');const deckBefore=ev('JSON.stringify(securityPlay.runs.konten.deck)');click('[data-sg-start="1"]');click('[data-sg-start="0"]');assert.equal(ev('JSON.stringify(securityPlay.runs.konten.deck)'),deckBefore);assert.equal(d.querySelectorAll('.sg-memory-card.is-open').length,1,'Switching games should preserve an unfinished turn');
assert(!d.querySelector('input[type="password"],input[type="file"]'));assert.equal(ev('STORIES.length'),387);assert(fs.readFileSync('scripts/security-games.css','utf8').includes('prefers-reduced-motion'));assert.equal(errors.length,0,errors.join('\n'));w.close();console.log(JSON.stringify({games,exampleVariants:examples,mechanics:types.size,wrongActions:'recoverable',sessionRestore:'pass',separateProgress:'pass',errors}));
