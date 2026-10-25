// All examples and games are fixed, fictional learning scenarios. No device access.
const securityPlay={examples:{},runs:{},saved:{},awards:{}};
const SECURITY_GAME_TYPES={sort:['📬','Sortierstation'],order:['🛤️','Ablauf-Puzzle'],match:['🧩','Begriffsbrücken'],memory:['🃏','Memo'],detect:['🔎','Detektivspiel'],build:['🛡️','Schutz-Werkstatt']};
function securityActivitiesHTML(m){
 const pack=SECURITY_PLAY[m.id];if(!pack)return '';
 return `<section class="security-activities" aria-label="Mitmachen und spielen"><div class="sg-sectionhead"><div class="eyebrow">Ausprobieren statt nur lesen</div><h2>Dein Mitmachlabor</h2><p>Ein visuelles Beispiel und drei Spiele zu dieser Einheit. Alles sind vereinfachte, erfundene Lernsituationen.</p></div><div id="security-example">${securityExampleHTML(m.id)}</div><section class="sg-arcade"><h2>🎮 Drei Lernspiele</h2><p>Ohne Zeitdruck: ausprobieren, Rückmeldung lesen und neu versuchen. Antippen oder mit der Tastatur bedienen.</p><div class="sg-game-menu">${pack.games.map((g,i)=>`<button class="sg-game-launch" data-sg-start="${i}"><span class="sg-menu-icon" aria-hidden="true">${SECURITY_GAME_TYPES[g.kind][0]}</span><span><small>Spiel ${i+1} · ${SECURITY_GAME_TYPES[g.kind][1]}</small><strong>${esc(g.title)}</strong><span data-sg-award="${m.id}|${i}">${securityPlay.awards[m.id+'|'+i]?'⭐ Durchgespielt':'Spiel öffnen →'}</span></span></button>`).join('')}</div><div id="security-game-board"></div></section><p class="small muted sg-session-note">Spielstände, Sterne und Beispiele bleiben für diese Sitzung erhalten. Sie verändern deinen Akten-Lernstand nicht. Ein Stern bedeutet „durchgespielt“, keine Sicherheitsbewertung.</p></section>`;
}
function securityExampleHTML(id){
 const ex=SECURITY_PLAY[id].example,index=securityPlay.examples[id]||0,s=ex.states[index];
 return `<section class="sg-example"><div class="eyebrow">Visuelles Mitmachbeispiel</div><h3>${esc(ex.title)}</h3><p>Wähle eine Variante und beobachte den Ablauf.</p><div class="sg-example-controls">${ex.states.map((x,i)=>`<button class="btn ${i===index?'primary':''}" data-sg-example="${i}" aria-pressed="${i===index}">${esc(x.label)}</button>`).join('')}</div><div class="sg-flow ${s.tone}" aria-label="Vereinfachter Ablauf">${s.nodes.map(([icon,label],i)=>`${i?'<span class="sg-arrow" aria-hidden="true">➜</span>':''}<div class="sg-node" style="--sg-delay:${i*90}ms"><span class="sg-node-icon" aria-hidden="true">${icon}</span><strong>${esc(label)}</strong></div>`).join('')}</div><p class="sg-outcome" role="status">${esc(s.result)}</p></section>`;
}
function securityGameConfig(){const id=securityLearning.module;return id&&securityPlay.runs[id]?SECURITY_PLAY[id].games[securityPlay.runs[id].game]:null;}
function startSecurityGame(index,fresh=false){
 const id=securityLearning.module,c=SECURITY_PLAY[id]?.games[index];if(!c)return;
 const key=id+'|'+index;
 if(fresh||!securityPlay.saved[key])securityPlay.saved[key]={game:index,index:0,locked:false,feedback:'',tone:'',solved:[],selected:[],left:null,flipped:[],moves:0,complete:false,order:shuffled(c.items.map((_,i)=>i)),rightOrder:shuffled(c.items.map((_,i)=>i)),deck:c.kind==='memory'?shuffled(c.items.flatMap((_,i)=>[i,i])):[]};
 securityPlay.runs[id]=securityPlay.saved[key];
 renderSecurityGame();const board=document.getElementById('security-game-board');board?.scrollIntoView({block:'start',behavior:'instant'});board?.querySelector('h3')?.focus({preventScroll:true});
}
function securityWin(run){run.complete=true;securityPlay.awards[securityLearning.module+'|'+run.game]=true;}
function securityGameFeedback(run,text,good){run.feedback=text;run.tone=good?'good':'risk';}
function securityProgress(run,c){if(run.complete)return c.items.length;if(c.kind==='sort')return run.index+(run.locked?1:0);if(c.kind==='build')return 0;return run.solved.length;}
function renderSecurityGame(){
 const id=securityLearning.module,run=securityPlay.runs[id],c=securityGameConfig(),board=document.getElementById('security-game-board');if(!run||!c||!board)return;
 const type=SECURITY_GAME_TYPES[c.kind],total=c.kind==='detect'?c.items.filter(x=>x.risk).length:c.items.length,progress=securityProgress(run,c);
 let html='';
 if(run.complete){html=`<div class="sg-victory"><div class="sg-star" aria-hidden="true">⭐</div><h4>Spiel durchgespielt!</h4><p>${esc(c.lesson)}</p><p class="small muted">Mit Rückmeldungen gelernt · ${run.moves} ${run.moves===1?'Spielzug':'Spielzüge'}</p><button class="btn primary" data-sg-restart>Noch einmal spielen</button></div>`;}
 else if(c.kind==='sort'){
  const item=c.items[run.index];html=`<div class="sg-token ${run.locked?'sg-landed':''}"><span aria-hidden="true">📨</span><p>${esc(item.text)}</p></div><div class="sg-bins">${c.labels.map((label,i)=>`<button class="btn" data-sg-bin="${i}" ${run.locked?'disabled':''}>📥 ${esc(label)}</button>`).join('')}</div>${run.locked?'<button class="btn primary sg-next" data-sg-next>Nächste Karte →</button>':''}`;
 }else if(c.kind==='order'){
  html=`<ol class="sg-track" aria-label="Zusammengesetzter Ablauf">${run.solved.map(i=>`<li class="sg-step">✓ ${esc(c.items[i].text)}</li>`).join('')||'<li class="muted">Dein Ablauf beginnt hier.</li>'}</ol><p><strong>Welcher Schritt kommt ${run.solved.length?'als Nächstes':'zuerst'}?</strong></p><div class="sg-pieces">${run.order.map(i=>`<button class="btn" data-sg-step="${i}" ${run.solved.includes(i)?'disabled':''}>${esc(c.items[i].text)}</button>`).join('')}</div>`;
 }else if(c.kind==='match'){
  html=`<div class="sg-match"><div aria-label="Begriffe">${run.order.map(i=>`<button class="btn ${run.left===i?'primary':''} ${run.solved.includes(i)?'sg-matched':''}" data-sg-left="${i}" aria-pressed="${run.left===i}" ${run.solved.includes(i)?'disabled':''}>${run.solved.includes(i)?'✓ ':''}${esc(c.items[i].left)}</button>`).join('')}</div><div aria-label="Erklärungen">${run.rightOrder.map(i=>`<button class="btn ${run.solved.includes(i)?'sg-matched':''}" data-sg-right="${i}" ${run.solved.includes(i)?'disabled':''}>${run.solved.includes(i)?'✓ ':''}${esc(c.items[i].right)}</button>`).join('')}</div></div>`;
 }else if(c.kind==='detect'){
  html=`<div class="sg-scene"><div class="sg-scenehead">🔎 ${esc(c.prompt)}</div>${c.items.map((x,i)=>`<button class="sg-clue ${run.solved.includes(i)?'sg-found':''}" data-sg-clue="${i}" ${run.solved.includes(i)?'disabled':''}><span aria-hidden="true">${run.solved.includes(i)?'🚩':'🔍'}</span><span>${esc(x.text)}${run.solved.includes(i)?'<small>Problem erkannt</small>':''}</span></button>`).join('')}</div>`;
 }else if(c.kind==='build'){
  html=`<p class="sg-prompt">${esc(c.prompt)}</p><div class="sg-shield ${run.tone==='risk'?'sg-wobble':''}" aria-hidden="true">🛡️<span>${run.selected.length} Bausteine</span></div><div class="sg-build">${c.items.map((x,i)=>`<button class="btn ${run.selected.includes(i)?'primary':''}" data-sg-toggle="${i}" aria-pressed="${run.selected.includes(i)}">${run.selected.includes(i)?'✓':'＋'} ${esc(x.text)}</button>`).join('')}</div><button class="btn primary sg-next" data-sg-test>Aufbau testen →</button>`;
 }else if(c.kind==='memory'){
  html=`<div class="sg-memory">${run.deck.map((pair,i)=>{const visible=run.flipped.includes(i)||run.solved.includes(pair),x=c.items[pair];return `<button class="sg-memory-card ${visible?'is-open':''} ${run.solved.includes(pair)?'sg-paired':''}" data-sg-card="${i}" aria-label="Karte ${i+1}${visible?': '+esc(x.text):' aufdecken'}" ${visible||run.flipped.length===2?'disabled':''}><span class="sg-card-face"><span aria-hidden="true">${visible?x.icon:'?'}</span><strong>${visible?esc(x.text):'Aufdecken'}</strong></span></button>`;}).join('')}</div>${run.flipped.length===2?'<button class="btn sg-next" data-sg-cover>Karten wieder zudecken</button>':''}`;
 }
 board.innerHTML=`<section class="sg-board ${c.kind}" aria-labelledby="sg-game-title"><div class="eyebrow">Spiel ${run.game+1} von 3 · ${type[1]}</div><h3 id="sg-game-title" tabindex="-1">${type[0]} ${esc(c.title)}</h3><p>${esc(c.instruction)}</p>${c.kind!=='build'?`<div class="sg-progress" aria-label="Spielfortschritt"><div class="meter"><span style="width:${Math.min(100,progress/total*100)}%"></span></div><span>${Math.min(total,progress)} von ${total} ${c.kind==='detect'?'Problemen gefunden':c.kind==='memory'||c.kind==='match'?'Paaren':'Schritten'}</span></div>`:''}${html}${run.feedback?`<div class="sg-feedback ${run.tone}" role="status">${esc(run.feedback)}</div>`:''}${!run.complete?'<div class="sg-restart"><button class="btn ghost" data-sg-restart>Dieses Spiel neu starten</button></div>':''}</section>`;
 for(const award of document.querySelectorAll('[data-sg-award]'))award.textContent=securityPlay.awards[award.dataset.sgAward]?'⭐ Durchgespielt':'Spiel öffnen →';
}
function restoreSecurityActivities(){if(state.screen==='security'&&securityLearning.module&&securityPlay.runs[securityLearning.module])renderSecurityGame();}
function handleSecurityGameAction(t){
 const id=securityLearning.module,run=securityPlay.runs[id],c=securityGameConfig();if(!run||!c)return;
 if(t.hasAttribute('data-sg-restart')){startSecurityGame(run.game,true);return;}
 if(run.complete)return;
 const int=key=>{const raw=t.dataset[key];if(raw===undefined||!/^[0-9]+$/.test(raw))return null;return Number(raw);};
 const valid=i=>i!==null&&i>=0&&i<c.items.length;
 let changed=false;
 if(c.kind==='sort'){
  const pick=int('sgBin');if(pick!==null&&!run.locked&&pick<c.labels.length){run.moves++;const item=c.items[run.index],ok=pick===item.answer;run.locked=ok;securityGameFeedback(run,(ok?'✓ Richtig zugeordnet. ':'Versuch es noch einmal. ')+item.why,ok);changed=true;}
  if(t.hasAttribute('data-sg-next')&&run.locked){run.index++;run.locked=false;run.feedback='';if(run.index===c.items.length)securityWin(run);changed=true;}
 }else if(c.kind==='order'){
  const pick=int('sgStep');if(valid(pick)&&!run.solved.includes(pick)){run.moves++;const ok=pick===run.solved.length;if(ok)run.solved.push(pick);securityGameFeedback(run,ok?'✓ '+c.items[pick].why:'Dieser Schritt kommt später. Überlege, was vorher geklärt sein muss.',ok);if(run.solved.length===c.items.length)securityWin(run);changed=true;}
 }else if(c.kind==='match'){
  const left=int('sgLeft'),right=int('sgRight');if(valid(left)&&!run.solved.includes(left)){run.left=left;run.feedback='Begriff gewählt. Tippe die passende Erklärung an.';run.tone='';changed=true;}
  if(valid(right)&&!run.solved.includes(right)){if(run.left===null){run.feedback='Wähle zuerst einen Begriff auf der linken Seite.';run.tone='';}else{run.moves++;const ok=right===run.left;securityGameFeedback(run,ok?'✓ '+c.items[right].why:'Diese Brücke passt noch nicht. Suche die Erklärung zum ausgewählten Begriff.',ok);if(ok){run.solved.push(right);run.left=null;}if(run.solved.length===c.items.length)securityWin(run);}changed=true;}
 }else if(c.kind==='detect'){
  const pick=int('sgClue');if(valid(pick)&&!run.solved.includes(pick)){run.moves++;const x=c.items[pick];if(x.risk)run.solved.push(pick);securityGameFeedback(run,(x.risk?'🚩 Problem erkannt: ':'Hinweis: ')+x.why,x.risk);if(run.solved.length===c.items.filter(x=>x.risk).length)securityWin(run);changed=true;}
 }else if(c.kind==='build'){
  const pick=int('sgToggle');if(valid(pick)){run.selected=run.selected.includes(pick)?run.selected.filter(x=>x!==pick):[...run.selected,pick];run.feedback='';run.tone='';changed=true;}
  if(t.hasAttribute('data-sg-test')){run.moves++;const risky=run.selected.find(i=>!c.items[i].safe),missing=c.items.findIndex((x,i)=>x.safe&&!run.selected.includes(i));if(risky!==undefined)securityGameFeedback(run,'Dieser Baustein gehört nicht ins Schutzpaket: '+c.items[risky].text+'. '+c.items[risky].why,false);else if(missing>=0)securityGameFeedback(run,'Noch fehlt ein hilfreicher Baustein. '+c.items[missing].why,false);else{securityGameFeedback(run,'✓ Alle passenden Bausteine kombiniert.',true);securityWin(run);}changed=true;}
 }else if(c.kind==='memory'){
  const pick=int('sgCard');if(pick!==null&&pick<run.deck.length&&run.flipped.length<2&&!run.flipped.includes(pick)&&!run.solved.includes(run.deck[pick])){run.flipped.push(pick);run.feedback='';if(run.flipped.length===2){run.moves++;const[a,b]=run.flipped,ok=run.deck[a]===run.deck[b];if(ok){const pair=run.deck[a];run.solved.push(pair);run.flipped=[];securityGameFeedback(run,'✓ Paar gefunden. '+c.items[pair].why,true);if(run.solved.length===c.items.length)securityWin(run);}else securityGameFeedback(run,'Zwei verschiedene Karten. Merke dir die Begriffe und decke sie wieder zu.',false);}changed=true;}
  if(t.hasAttribute('data-sg-cover')&&run.flipped.length===2){run.flipped=[];run.feedback='Nächster Versuch: Decke zwei Karten auf.';run.tone='';changed=true;}
 }
 if(changed){
  renderSecurityGame();
  const board=document.getElementById('security-game-board');let next;
  if(run.complete)next=board.querySelector('[data-sg-restart]');
  else if(c.kind==='sort')next=board.querySelector(run.locked?'[data-sg-next]':'[data-sg-bin]:not(:disabled)');
  else if(c.kind==='order')next=board.querySelector('[data-sg-step]:not(:disabled)');
  else if(c.kind==='match')next=board.querySelector(run.left===null?'[data-sg-left]:not(:disabled)':'[data-sg-right]:not(:disabled)');
  else if(c.kind==='detect')next=board.querySelector('[data-sg-clue]:not(:disabled)');
  else if(c.kind==='memory')next=board.querySelector(run.flipped.length===2?'[data-sg-cover]':'[data-sg-card]:not(:disabled)');
  else if(c.kind==='build')next=board.querySelector(t.dataset.sgToggle!==undefined?'[data-sg-toggle="'+Number(t.dataset.sgToggle)+'"]':'[data-sg-test]');
  next?.focus({preventScroll:true});
 }
}
app.addEventListener('click',e=>{
 const t=e.target.closest('button');if(!t||t.disabled||state.screen!=='security'||!SECURITY_PLAY[securityLearning.module])return;
 if(t.dataset.sgExample!==undefined){const i=Number(t.dataset.sgExample);if(Number.isInteger(i)&&SECURITY_PLAY[securityLearning.module].example.states[i]){securityPlay.examples[securityLearning.module]=i;document.getElementById('security-example').innerHTML=securityExampleHTML(securityLearning.module);}return;}
 if(t.dataset.sgStart!==undefined){const i=Number(t.dataset.sgStart);if(Number.isInteger(i))startSecurityGame(i);return;}
 handleSecurityGameAction(t);
});
