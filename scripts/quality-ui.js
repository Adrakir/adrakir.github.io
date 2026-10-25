// Embedded by build-quality.py so every feature remains available offline.
const GLOSSARY = [
 ['Decoder','Ein Programmteil, der gespeicherte Daten in eine nutzbare Darstellung übersetzt.','Ein Bilddecoder macht aus einer Bilddatei sichtbare Pixel.'],
 ['Token','Ein digitaler Berechtigungsnachweis. Wer ihn besitzt, kann je nach Art bestimmte Dienste nutzen.','Wie eine Eintrittskarte: Gültigkeit und erlaubter Bereich müssen geprüft werden.'],
 ['Bibliothek','Ein fertiger Softwarebaustein, den mehrere Programme verwenden können.','Ein Fehler im gemeinsamen Bildbaustein kann mehrere Apps betreffen.'],
 ['DNS','Die Namensauflösung im Netz: Sie ordnet einem Namen eine technische Adresse zu.','Wie ein Adressbuch für Internetdienste.'],
 ['BGP','Ein Verfahren, mit dem große Netzwerke Wege zu anderen Netzen bekannt machen.','Wie Wegweiser zwischen verschiedenen Straßennetzen.'],
 ['API','Eine festgelegte Schnittstelle, über die Programme Daten oder Funktionen anfordern.','Eine Wetter-App fragt über eine Schnittstelle den Wetterdienst ab.'],
 ['Patch','Eine Softwarekorrektur, meist für einen bestimmten Fehler.','Ein Update kann einen Sicherheitspatch enthalten.'],
 ['Cache','Ein Zwischenspeicher, der häufig benötigte Daten schneller bereitstellt.','Nach dem Leeren muss er erst wieder gefüllt werden.'],
 ['Ransomware','Schadsoftware, die häufig Daten verschlüsselt; Angriffe können zusätzlich mit Datendiebstahl drohen.','Sicherungen und ein geübter Wiederanlauf helfen bei der Vorbereitung.'],
 ['Phishing','Täuschende Nachrichten oder Webseiten, die etwa Anmeldedaten erbeuten sollen.','Eine angebliche Sicherheitswarnung fordert zur Anmeldung auf einer fremden Seite auf.'],
 ['DDoS','Ein Angriff, bei dem viele verteilte Anfragen einen Dienst überlasten sollen.','Wie sehr viele gleichzeitige Anrufe, die eine Telefonzentrale blockieren.'],
 ['Backup','Eine zusätzliche Datensicherung für die Wiederherstellung.','Ob sie nutzbar ist, zeigt erst ein erfolgreicher Wiederherstellungstest.'],
 ['Rollback','Die Rückkehr zu einem vorherigen Stand nach einer problematischen Änderung.','Ein fehlerhaftes Update wird durch eine getestete Vorgängerversion ersetzt.'],
 ['Pufferüberlauf','Ein Programm greift über den vorgesehenen Speicherbereich hinaus zu. Das kann Abstürze oder Sicherheitslücken verursachen.','Eine Speichergrenze wird beim Verarbeiten von Daten nicht korrekt eingehalten.'],
 ['Metadaten','Informationen über andere Daten. Auch sie können vertraulich sein.','Ein Dateiname kann schon etwas verraten, ohne dass der Dateiinhalt lesbar ist.'],
 ['Zertifikat','Ein digitaler Nachweis, der beispielsweise einen öffentlichen Schlüssel einer Identität zuordnet.','Ein abgelaufener Nachweis kann eine sonst funktionierende Verbindung verhindern.'],
 ['Supply-Chain','Die Lieferkette der Software: von Bausteinen über Werkzeuge bis zum fertigen Paket.','Ein kompromittierter Baustein kann an viele Nutzer weitergeliefert werden.'],
 ['Zero-Day','Eine Schwachstelle, für die zum betreffenden Zeitpunkt noch keine verfügbare Korrektur existiert oder die dem Hersteller noch unbekannt ist.','Der Zeitpunkt ist entscheidend; eine später gepatchte Lücke ist nicht dauerhaft ein Zero-Day.'],
 ['Firmware','Die gerätenahe Software, die Hardwarefunktionen steuert.','Auch ein Router oder ein Drucker benötigt Softwareupdates.'],
 ['Mehrfaktor','Anmeldung mit unterschiedlichen Arten von Nachweisen.','Passwort und Sicherheitsschlüssel statt zwei verschiedener Passwörter.'],
 ['Server','Ein Rechner oder Programm, das anderen Geräten Dienste bereitstellt.','Ein Webserver liefert eine Internetseite aus.'],
 ['Client','Ein Programm oder Gerät, das einen Dienst anfordert.','Ein Browser ist beim Abrufen einer Webseite ein Client.'],
 ['Cloud','Über ein Netz bereitgestellte Rechenleistung, Software oder Speicherung.','Die Daten liegen weiterhin auf echten Rechnern mit Stromversorgung und Netzanschluss.'],
 ['Router','Ein Gerät, das Datenpakete zwischen Netzen weiterleitet.','Es entscheidet anhand seiner Routinginformationen über den nächsten Weg.'],
 ['Firewall','Eine Kontrolle, die Netzwerkverkehr nach festgelegten Regeln erlaubt oder blockiert.','Auch die Firewall selbst braucht sichere Zugänge und Updates.'],
 ['Malware','Der Sammelbegriff für schädliche Software.','Ein Computerwurm und ein Erpressungstrojaner sind unterschiedliche Arten.'],
 ['WebP','Ein Dateiformat für Bilder.','Zum Anzeigen muss Software den Dateiinhalt korrekt verarbeiten.'],
 ['USB','Ein verbreiteter Anschlussstandard für Geräte und Datenübertragung.','Ein USB-Gerät kann mehr sein als ein Datenspeicher, etwa eine Tastatur.'],
 ['BSI','Das Bundesamt für Sicherheit in der Informationstechnik.','Ein Verweis auf einen BSI-Bericht ist keine Zertifizierung dieser App.'],
 ['CCC','Der Chaos Computer Club.','Bei einer Vorführung muss zwischen demonstrierter Möglichkeit und realem Missbrauch unterschieden werden.'],
 ['KI','Künstliche Intelligenz: Systeme, die beispielsweise Muster erkennen oder Texte erzeugen.','Eine überzeugende Antwort kann trotzdem sachlich falsch sein.'],
 ['SQL','Eine Sprache zum Abfragen und Bearbeiten von Datenbanken.','Ungeprüfte Eingaben dürfen nicht als fremde Datenbankbefehle ausgeführt werden.'],
 ['npm','Ein Paketregister und Werkzeug im JavaScript-Umfeld.','Ein veröffentlichtes Paket ist ausführbare Software und braucht eine nachvollziehbare Herkunft.'],
 ['GitHub','Ein Dienst für Softwareprojekte und gemeinsame Versionsverwaltung.','Quellcode und automatisierte Build-Ausgaben brauchen jeweils passende Zugriffsregeln.'],
 ['Watchdog','Ein Überwachungsmechanismus, der bei ausbleibender Reaktion oder Zeitüberschreitung eingreift.','Eine Abschaltung kann die vorgesehene Schutzreaktion sein.'],
 ['Telemetrie','Automatisch erfasste Messwerte über den Zustand eines Systems.','Auch die Überwachung muss so gebaut sein, dass sie den Dienst nicht überlastet.'],
 ['Redis','Ein System, das häufig als schneller Datenspeicher oder Cache eingesetzt wird.','Die korrekte Trennung verschiedener Nutzer gilt auch in gemeinsam genutzten Zwischenspeichern.'],
 ['QR-Code','Ein maschinenlesbares Muster, das beispielsweise eine Internetadresse enthalten kann.','Das Muster bestätigt nicht, wem die darin verlinkte Webseite gehört.'],
 ['Quishing','Phishing über einen QR-Code. Das Muster führt beispielsweise auf eine gefälschte Anmeldeseite.','Ein falscher Aufkleber kann den echten Link an einem Automaten ersetzen.'],
 ['GNSS','Sammelbezeichnung für globale Satellitennavigationssysteme. GPS ist eines davon.','Ein Empfänger bestimmt aus empfangenen Signalen unter anderem seine Position.'],
 ['Jamming','Absichtliches Stören eines Funksignals.','Eine Navigation kann wegen gestörten Empfangs ausfallen oder unzuverlässig werden.'],
 ['Spoofing','Das Vortäuschen einer Herkunft oder Information. Bei Navigation können gefälschte Signale falsche Positionen erzeugen.','Ein genauer Zahlenwert ist nicht automatisch ein wahrer Messwert.'],
 ['WCAG','Richtlinien für zugängliche Webinhalte.','Dazu gehören Anforderungen etwa an Kontraste, Beschriftungen und Tastaturbedienung.'],
 ['EXIF','Ein verbreitetes Metadatenformat für Bilder. Welche Felder enthalten sind, hängt von Datei und Aufnahme ab.','Zusätzlich zum Bild können etwa Kameradaten oder ein Standort gespeichert sein.'],
 ['32-Bit','Eine Darstellung mit 32 binären Stellen. Der Wertebereich hängt auch davon ab, ob ein Vorzeichen vorgesehen ist.','Die Breite eines Zeitwerts und die Breite eines Prozessors sind verschiedene Fragen.'],
 ['SIM-Swap','Unbefugte Übertragung einer Telefonnummer auf eine andere SIM beziehungsweise ein anderes Gerät.','Danach können Nachrichten zur Kontowiederherstellung beim falschen Empfänger ankommen.'],
 ['WHOIS','Ein Abfrageverfahren für Registrierungsinformationen über Internet-Domains.','Auch eine hinterlegte Adresse eines solchen Abfragedienstes muss gepflegt werden.'],
 ['Tracking','Das Erfassen und gegebenenfalls Verknüpfen von Nutzungsvorgängen.','Ein eingebundener Werbebaustein kann eigene Datenübertragungen auslösen.'],
 ['CSV','Ein einfaches Textformat für tabellarische Daten mit getrennten Feldern.','Eine Kennung im Text kann beim Öffnen in einer anderen Anwendung als Zahl interpretiert werden.'],
 ['Kennung','Eine Zeichenfolge, die etwas identifiziert. Sie ist nicht automatisch eine Zahl zum Rechnen.','Bei einer Kennung können führende Nullen wichtig sein.'],
 ['Notzugang','Ein besonders geschützter Zugang für festgelegte Ausnahmefälle.','Er muss im vorgesehenen Notfall nutzbar sein und darf kein frei geteilter Generalschlüssel werden.']
];
state.readingLevel = saved.readingLevel === 'easy' ? 'easy' : 'technical';
state.lab = null;
let dialogTrigger = null;
const TERM_ALIASES={'Bilddecoder':'Decoder','Bibliotheken':'Bibliothek','Tokens':'Token','Backups':'Backup','Zertifikate':'Zertifikat','Zertifikaten':'Zertifikat','Patches':'Patch','Caches':'Cache','Servern':'Server','Routern':'Router','APIs':'API'};
const GLOSSARY_PATTERN = new RegExp('(^|[^\\p{L}\\p{N}_])(' + [...GLOSSARY.map(x=>x[0]),...Object.keys(TERM_ALIASES)].map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).sort((a,b)=>b.length-a.length).join('|') + ')(?=$|[^\\p{L}\\p{N}_])','giu');
function termHTML(text) {
 let last=0,out='';
 for (const m of String(text).matchAll(GLOSSARY_PATTERN)) {
  const begin=m.index+m[1].length,alias=Object.keys(TERM_ALIASES).find(x=>x.toLowerCase()===m[2].toLowerCase()),canonical=alias?TERM_ALIASES[alias]:m[2],term=GLOSSARY.find(x=>x[0].toLowerCase()===canonical.toLowerCase());
  out+=esc(String(text).slice(last,begin))+`<button class="term" data-term="${esc(term[0])}" aria-label="${esc(term[0])} erklären">${esc(m[2])}</button>`;
  last=begin+m[2].length;
 }
 return out+esc(String(text).slice(last));
}
function readingTools(c) {
 return `<section class="reading-tools" aria-label="Lesestufe"><div class="heroactions"><span>Lesestufe:</span><button class="btn ${state.readingLevel==='easy'?'primary':''}" data-reading="easy" aria-pressed="${state.readingLevel==='easy'}">Einfach erklärt</button><button class="btn ${state.readingLevel==='technical'?'primary':''}" data-reading="technical" aria-pressed="${state.readingLevel==='technical'}">Technik genauer</button><button class="btn ghost" data-action="glossary">Begriffe nachschlagen</button></div><p class="small muted">${state.readingLevel==='easy'?'Kurze Kapitelzusammenfassung mit Begriffshilfen. Alle Einzelheiten findest du unter „Technik genauer“.':'Vollständige Kapitel. Unterstrichene Technikbegriffe lassen sich antippen.'}</p><details class="case-overview"><summary>Was ist genau passiert?</summary><ol>${['Ausgangslage','Fehler oder Ablauf','Folgen & Lösung'].map((label,i)=>`<li><strong>${label}:</strong> ${termHTML((c.reading.overview||c.reading.summary)[i])}</li>`).join('')}<li><strong>Was hilft künftig?</strong> ${termHTML(c.lesson)}</li></ol><p class="small muted">Die Gliederung fasst die Akte zusammen. Wo die Quelle keine vollständige Lösung nennt, wird keine ergänzt.</p></details></section>`;
}
function successNotice(c){return c.success?`<aside class="success-notice"><strong>🛡️ Gut gegangen! – Was konkret gelang</strong><p>${esc(c.success)}</p><button class="btn ghost" data-topic="resilienz">Weitere Abwehr- und Rettungsgeschichten</button></aside>`:'';}
function caseTools(c){if(c.id==='leading-zero-training')return identifierLabHTML();if(c.cascade)return cascadeLaunchHTML(c);return c.id==='time2038-training'?`<section class="time-lab surface"><h2>Eine Sekunde über die Grenze</h2><p>Isolierte Rechenansicht mit erfundenen Testwerten. Die Uhr deines Geräts wird nicht verändert.</p><label for="time-lab-value">Testwert: Sekunden seit 1. Januar 1970 (UTC)</label><input id="time-lab-value" type="range" min="2147483645" max="2147483650" step="1" value="2147483647"><output id="time-lab-result" for="time-lab-value" aria-live="polite"></output><p class="small muted">Das alte Beispiel interpretiert den Wert als vorzeichenbehaftete 32-Bit-Zahl. Die größere Darstellung behält den korrekten Wert. Reale Systeme müssen zusätzlich ihre Schnittstellen und Speicherformate prüfen.</p></section>`:'';}
function updateTimeLab(){const input=document.getElementById('time-lab-value'),out=document.getElementById('time-lab-result');if(!input||!out)return;const value=Number(input.value),old=value|0,date=n=>new Date(n*1000).toISOString().replace('T',' · ').replace('.000Z',' UTC');out.innerHTML=`<span><strong>Größere Darstellung</strong><br>${esc(value.toLocaleString('de-DE'))}<br>${esc(date(value))}</span><span><strong>Alte 32-Bit-Darstellung</strong><br>${esc(old.toLocaleString('de-DE'))}<br>${esc(date(old))}</span>`;}
function identifierLabHTML(){return `<section class="time-lab identifier-lab surface"><h2>Was bleibt von der Kennung?</h2><p>Vereinfachte lokale Rechenansicht mit erfundenen Werten. Es wird keine Datei geöffnet oder hochgeladen.</p><label for="identifier-value">Erfundene Kennung auswählen</label><select id="identifier-value"><option value="00123">00123</option><option value="00045">00045</option><option value="000045">000045</option></select><output id="identifier-result" for="identifier-value" aria-live="polite"></output><p class="small muted">Die letzte Karte formatiert den Zahlenwert auf mindestens fünf Stellen. Sie zeigt, warum eine hübsche Anzeige den ursprünglichen Text nicht beweist. Dies ist eine gezielte Simulation und kein vollständiger Excel-Import.</p></section>`;}
function updateIdentifierLab(){const input=document.getElementById('identifier-value'),out=document.getElementById('identifier-result');if(!input||!out)return;const original=input.value,numeric=String(Number(original)),display=numeric.padStart(5,'0');out.innerHTML=`<span><strong>Als Text erhalten</strong><br><code>${esc(original)}</code></span><span><strong>Als Zahl interpretiert</strong><br><code>${esc(numeric)}</code></span><span><strong>Danach auf fünf Stellen angezeigt</strong><br><code>${esc(display)}</code><br>${display===original?'Sieht gleich aus; der gespeicherte Zahlenwert enthält die Nullen trotzdem nicht.':'Die ursprüngliche Zeichenfolge wurde nicht wiederhergestellt.'}</span>`;}
function cascadeLaunchHTML(c){return `<section class="success-notice cascade-notice"><strong>🧩 Der zweite Fehler</strong><p>Zusätzliche Fehler und Abhängigkeiten dieses Falls in drei Lernschritten prüfen. Deine Antworten ändern den dokumentierten Verlauf nicht.</p><button class="btn" data-cascade="${c.id}">Vor dem nächsten Schritt entscheiden →</button></section>`;}
function chapterText(c,index) {
 const text=state.readingLevel==='easy'?c.reading.summary[index]:c.acts[index][1];
 return termHTML(text);
}
function sourceStatusHTML(c) {
 const status=c.reading.sourceStatus;
 const labels={retrieved:'Bericht beim Quellenabruf erreichbar',unavailable:'Erneuter Abruf nicht möglich',redirected:'Quellenlink leitet auf eine andere Seite weiter','not-rechecked':'In dieser Überarbeitung nicht erneut abgerufen'};
 return `<section class="source-status"><h3>Quellenstand</h3><dl><dt>${c.origin==='Trainingsfall'?'Szenario':'Ereignis / Veröffentlichung'}</dt><dd>${c.origin==='Trainingsfall'?'Fiktiv; kein historisches Ereignis':esc(c.reading.eventDate||c.year)}</dd><dt>Textprüfung</dt><dd>25.10.2026 · Struktur und Kurzfassung</dd><dt>Quellenabruf</dt><dd>${labels[status.status]}${status.checked?' · '+status.checked.split('-').reverse().join('.'):''}</dd></dl><p class="small muted">Ein erreichbarer Bericht ist noch keine vollständige unabhängige Faktenprüfung.</p><details><summary>Was bleibt offen?</summary><p>${c.scope?esc(c.scope):c.origin==='Trainingsfall'?'Dieser Fall ist frei erfunden. Er dient ausschließlich dem Üben.':CASE_META[c.id]?.type==='research'?'Die Vorführung einer Möglichkeit belegt keinen flächendeckenden Missbrauch. Maßgeblich sind die im Kapitel genannten Voraussetzungen.':c.origin==='Nachschlagewerk'?'Die verlinkte Übersicht ist ein Recherche-Einstieg. Einzelheiten sollten zusätzlich an Originalberichten geprüft werden.':c.origin==='Unternehmensquelle'?'Der Bericht gibt die Sicht des betroffenen Unternehmens wieder. Er belegt nicht automatisch sämtliche möglichen Folgen oder eine unabhängige Untersuchung.':'Die Akte beschreibt den Umfang der genannten Veröffentlichung. Nicht dokumentierte Schäden, Motive und spätere Entwicklungen werden damit nicht bestätigt.'} ${status.status==='redirected'?'Der historische Bericht lässt sich über diesen Link aktuell nicht verlässlich prüfen.':status.status==='unavailable'?'Der Link konnte bei dieser Prüfung nicht gelesen werden; daraus folgt nicht, dass der Bericht gelöscht wurde.':''}</p></details><button class="btn ghost" data-report="${c.id}">Fehler im Fall melden</button></section>`;
}
function decisionMoment(c) {
 return `<section class="decision-moment"><div class="eyebrow">Bevor du die Auflösung liest</div><h3>Wie würdest du vorgehen?</h3><p class="small muted">Eine Lernentscheidung zur Akte; keine Behauptung über einen historischen Wortwechsel.</p>${questionHTML(c,'decision')}<button class="btn" data-chapter="2">So ging es in der Akte weiter →</button></section>`;
}
function showDialog(title,inner) {
 stopSpeak();if(!document.getElementById('learning-dialog'))dialogTrigger=document.activeElement;
 document.getElementById('learning-dialog')?.remove();
 const el=document.createElement('dialog');el.id='learning-dialog';el.className='learning-dialog';
 el.innerHTML=`<div class="dialog-head"><h2 id="dialog-heading">${esc(title)}</h2><button class="btn ghost" data-close-dialog aria-label="Dialog schließen">✕ Schließen</button></div>${inner}`;
 el.setAttribute('aria-labelledby','dialog-heading');app.append(el);
 if(typeof el.showModal==='function')el.showModal();else el.setAttribute('open','');
 el.addEventListener('cancel',e=>{e.preventDefault();closeLearningDialog();});
 el.querySelector('button,textarea')?.focus();
}
function closeLearningDialog(){document.getElementById('learning-dialog')?.remove();if(dialogTrigger?.isConnected)dialogTrigger.focus();}
function showTerm(name){const t=GLOSSARY.find(x=>x[0]===name);if(t)showDialog(t[0],`<p>${esc(t[1])}</p><p class="term-example"><strong>Beispiel:</strong> ${esc(t[2])}</p><button class="btn" data-action="glossary">Alle Begriffe ansehen</button>`);}
function showGlossary(){showDialog('Technikbegriffe einfach erklärt',`<input class="search" id="glossary-search" type="search" aria-label="Begriffe filtern" placeholder="Begriff suchen …"><div class="glossary-list">${GLOSSARY.map(t=>`<details data-glossary-entry="${esc(t.join(' ').toLowerCase())}"><summary>${esc(t[0])}</summary><p>${esc(t[1])}</p><p class="small muted">${esc(t[2])}</p></details>`).join('')}</div><p id="glossary-empty" hidden>Kein passender Begriff gefunden.</p>`);}
function reportText(c){return `Adrakir – Akte ${c.number}: ${c.title}\nFall-ID: ${c.id}\nLink: https://adrakir.github.io/#akte=${encodeURIComponent(c.id)}\nQuelle: ${c.source[1]}\n\nWas ist fehlerhaft oder unklar?\n\nMein Korrekturvorschlag / Beleg:\n`;}
function showReport(id){const c=find(id);if(!c)return;showDialog('Korrekturmeldung vorbereiten',`<p>Beschreibe die Stelle und möglichst einen Beleg. Du kannst den Text kopieren oder selbst als GitHub-Issue einreichen.</p><label for="report-body">Meldung zu Akte ${c.number}</label><textarea id="report-body" rows="11">${esc(reportText(c))}</textarea><div class="heroactions"><button class="btn primary" data-copy-report>Kopieren</button><a class="btn" id="report-link" target="_blank" rel="noopener noreferrer">Auf GitHub vorbereiten ↗</a></div><p id="report-status" class="small muted" role="status">Es wird nichts automatisch versendet. Vor dem Einreichen persönliche Daten entfernen.</p>`);refreshReportLink(c);}
function refreshReportLink(c=find(state.id)){const body=document.getElementById('report-body'),a=document.getElementById('report-link');if(body&&a){a.href='https://github.com/Adrakir/adrakir.github.io/issues/new?title='+encodeURIComponent('Korrektur: '+(c?.title||'Adrakir-Akte'))+'&body='+encodeURIComponent(body.value);}}
async function copyReport(){const el=document.getElementById('report-body');try{await navigator.clipboard.writeText(el.value);document.getElementById('report-status').textContent='Meldung kopiert. Du entscheidest, wo du sie einreichst.';}catch{el.focus();el.select();document.getElementById('report-status').textContent='Bitte den markierten Text über das Kopiermenü deines Geräts kopieren.';}}

function practiceHubHTML(){return `<section class="surface practice-hub"><div class="eyebrow">Wissen anwenden</div><h2>Vier Wege zu üben</h2><p>Kapitel ordnen, Fall und Lehre verbinden, Behauptungen prüfen oder Fehlerketten durchdenken. Die Übungen wechseln zwischen den Akten.</p><div class="heroactions"><button class="btn" data-lab="order">Ablauf ordnen</button><button class="btn" data-lab="match">Lehren zuordnen</button><button class="btn" data-lab="error">Fehler finden</button><button class="btn" data-lab="cascade">Der zweite Fehler</button></div></section>`;}
function startLab(mode){
 if(mode==='cascade'){startCascade();return;}
 stopSpeak();state.screen='lab';
 const c=STORIES[Math.floor(Math.random()*STORIES.length)];
 let order=shuffled([0,1,2]);if(order.join()==='0,1,2')order=[1,2,0];
 const peers=shuffled(STORIES.filter(x=>x.id!==c.id&&x.lesson!==c.lesson));
 const pairs=[c];for(const p of peers){if(pairs.every(x=>x.lesson!==p.lesson))pairs.push(p);if(pairs.length===3)break;}
 const statementIsTrue=Math.random()>=.5;
 const statement=statementIsTrue?c.quiz[1][c.quiz[2]]:c.quiz[1].find((_,i)=>i!==c.quiz[2]);
 state.lab={mode,id:c.id,order,pairs:pairs.map(x=>x.id),options:shuffled(pairs.map(x=>x.id)),matches:{},checked:false,errorStatement:statement,statementIsTrue,errorAnswer:null};
 setRoute();renderLab();window.scrollTo(0,0);
}
function renderLab(){
 if(state.lab?.mode==='cascade'){renderCascade();return;}
 const lab=state.lab;if(!lab){go('quizhub');return;}
 const c=find(lab.id);let body='';
 if(lab.mode==='order'){
  const correct=lab.order.every((n,i)=>n===i);
  body=`<h1>Bringe die Kapitel in die Reihenfolge der Akte</h1><p class="muted">${esc(c.title)} · Erst Ausgangslage, dann Ablauf, dann Ergebnis. Bewege die Karten mit den Pfeilen; Ziehen ist nicht nötig.</p><ol class="order-list">${lab.order.map((n,i)=>`<li><div><strong>${esc(c.acts[n][0])}</strong><p>${termHTML(c.reading.summary[n])}</p></div><div class="order-buttons"><button class="btn" data-move="${i}" data-direction="-1" aria-label="Karte ${i+1} nach oben" ${i===0||lab.checked?'disabled':''}>↑</button><button class="btn" data-move="${i}" data-direction="1" aria-label="Karte ${i+1} nach unten" ${i===2||lab.checked?'disabled':''}>↓</button></div></li>`).join('')}</ol>${lab.checked?`<p class="feedback ${correct?'correct':'wrong'}" role="status">${correct?'✓ Die Reihenfolge stimmt.':'Die Reihenfolge der Akte lautet: '+esc(c.acts.map(a=>a[0]).join(' → '))+'.'}</p>`:''}`;
 }else if(lab.mode==='match'){
  body=`<h1>Welche Lehre gehört zu welchem Fall?</h1><p>Lies die kurzen Fallhinweise und wähle jeweils die passende Lehre.</p><div class="match-list">${lab.pairs.map((id,i)=>{const x=find(id);return `<section><h3>${esc(x.title)}</h3><p>${termHTML(x.daily.slice(1).join(' '))}</p><label for="match-${i}">Passende Lehre<select id="match-${i}" data-match="${id}" ${lab.checked?'disabled':''}><option value="">Bitte auswählen</option>${lab.options.map(v=>`<option value="${v}" ${lab.matches[id]===v?'selected':''}>${esc(find(v).lesson)}</option>`).join('')}</select></label>${lab.checked?`<p class="feedback ${lab.matches[id]===id?'correct':'wrong'}">${lab.matches[id]===id?'✓ Richtig.':'Passend: '+esc(x.lesson)}</p>`:''}</section>`;}).join('')}</div>`;
 }else{
  const correct=lab.errorAnswer===String(lab.statementIsTrue);
  body=`<h1>Prüfe die Behauptung</h1><p class="muted">${esc(c.title)}</p><p>Die folgende Aussage ist eine Quizbehauptung, kein Auszug aus dem historischen Bericht. Manche Aussagen stimmen, andere enthalten einen Fehler.</p><blockquote>${esc(lab.errorStatement)}</blockquote><p>Passt diese Aussage als Antwort auf die Frage „${esc(c.quiz[0])}“?</p><div class="heroactions"><button class="btn ${lab.errorAnswer==='true'?'primary':''}" data-error-answer="true" ${lab.checked?'disabled':''}>Ja, passt</button><button class="btn ${lab.errorAnswer==='false'?'primary':''}" data-error-answer="false" ${lab.checked?'disabled':''}>Nein, hier steckt ein Fehler</button></div>${lab.checked?`<div class="feedback ${correct?'correct':'wrong'}" role="status"><strong>${correct?'✓ Richtig erkannt.':lab.statementIsTrue?'Diese Aussage passt zur Akte.':'Diese Behauptung passt nicht.'}</strong><p>${c.origin==='Trainingsfall'?'Im fiktiven Szenario gilt':'Die Akte nennt'}: ${esc(c.quiz[1][c.quiz[2]])}</p><p>${esc(c.quiz[3])}</p></div>`:''}`;
 }
 renderShell(`<div class="crumb">${menuBtn('← Zum Lerntraining','quizhub','ghost')}</div><section class="surface lab-card">${body}<div class="heroactions">${lab.checked?`<button class="btn primary" data-lab="${lab.mode}">Nächste Übung →</button><button class="btn" data-open="${c.id}">Akte nachlesen</button>`:'<button class="btn primary" data-check-lab>Antwort prüfen</button>'}</div><p id="lab-status" class="small muted" role="status">${lab.checked?'Diese Zusatzübungen verändern den bisherigen Aktenabschluss nicht.':'Du kannst die passende Akte jederzeit über die Sammlung nachlesen.'}</p></section>${practiceHubHTML()}`);
}
function checkLab(){const l=state.lab;if(!l||l.checked)return;if(l.mode==='match'&&l.pairs.some(id=>!l.matches[id])){document.getElementById('lab-status').textContent='Bitte für alle drei Fälle eine Lehre auswählen.';return;}if(l.mode==='error'&&!l.errorAnswer){document.getElementById('lab-status').textContent='Bitte zuerst eine Antwort wählen.';return;}l.checked=true;renderLab();document.querySelector('.feedback')?.scrollIntoView({block:'nearest'});}
function startCascade(id){
 const pool=STORIES.filter(c=>Array.isArray(c.cascade)&&c.cascade.length);
 const c=pool.find(c=>c.id===id)||pool[Math.floor(Math.random()*pool.length)];if(!c)return;
 stopSpeak();state.screen='lab';state.lab={mode:'cascade',id:c.id,stage:0,choice:null,score:0,answerOrder:null};setRoute();renderCascade();window.scrollTo(0,0);
}
function pickCascade(index){const l=state.lab;if(l?.mode!=='cascade'||l.choice!==null)return;const step=find(l.id)?.cascade[l.stage];if(!step||!Number.isInteger(index)||index<0||index>=step.options.length)return;l.choice=index;if(index===step.answer)l.score++;const y=scrollY;renderCascade();scrollTo(0,y);}
function renderCascade(){
 const l=state.lab,c=find(l?.id);if(!c?.cascade){go('quizhub');return;}
 const steps=c.cascade,finished=l.stage>=steps.length;let body='';
 if(finished){body=`<h1>Die Fehlerkette ist durchgearbeitet</h1><p>${esc(c.title)} · ${l.score} von ${steps.length} Lernfragen richtig.</p><p>Deine Antworten sind Lernentscheidungen. Der dokumentierte Verlauf wurde dadurch nicht verändert. Manche Ketten enthalten einen weiteren Bedienfehler, andere eine zusätzliche technische Abhängigkeit.</p><ol>${steps.map(s=>`<li><strong>${esc(s.title)}</strong><p>${esc(s.happened)}</p></li>`).join('')}</ol><p class="dailylesson"><strong>Zum Mitnehmen:</strong> ${esc(c.lesson)}</p><div class="heroactions"><button class="btn primary" data-cascade="${c.id}">Diesen Fall erneut üben</button><button class="btn" data-open="${c.id}">Ganze Akte lesen</button></div>`;}
 else{
  const step=steps[l.stage];if(!l.answerOrder)l.answerOrder=shuffled(step.options.map((_,i)=>i));
  body=`<div class="eyebrow">Lernschritt ${l.stage+1} von ${steps.length}</div><h1>${esc(step.title)}</h1><p class="muted">${esc(c.title)}</p><p>Bewerte die folgende Lernfrage. Danach siehst du, was im dokumentierten Fall geschah.</p><section class="quizbox"><h2>${esc(step.question)}</h2><div class="choices">${l.answerOrder.map(i=>`<button class="choice ${l.choice!==null&&i===step.answer?'correct':''} ${l.choice===i&&i!==step.answer?'wrong':''}" data-cascade-pick="${i}" ${l.choice!==null?'disabled':''}>${esc(step.options[i])}</button>`).join('')}</div>${l.choice!==null?`<div class="feedback ${l.choice===step.answer?'correct':'wrong'}" role="status"><strong>${l.choice===step.answer?'✓ Richtig eingeordnet.':'Diese Einordnung passt nicht.'}</strong><p>${esc(step.explanation)}</p></div><div class="historical-step"><h3>Im dokumentierten Fall</h3><p>${esc(step.happened)}</p></div><button class="btn primary" data-cascade-next>${l.stage===steps.length-1?'Lernbilanz ansehen':'Nächsten Schritt prüfen →'}</button>`:''}</section>`;
 }
 renderShell(`<div class="crumb">${menuBtn('← Zum Lerntraining','quizhub','ghost')}</div><section class="surface lab-card cascade-card"><div class="eyebrow">Der zweite Fehler</div>${body}<p class="small muted">Zusatzübung ohne Veränderung deines bisherigen Aktenabschlusses. Quelle: <a href="${esc(c.source[1])}" target="_blank" rel="noopener noreferrer">${esc(c.source[0])}</a></p></section><section class="surface practice-hub"><h2>Weitere Fehlerketten</h2><div class="heroactions">${STORIES.filter(x=>x.cascade).map(x=>`<button class="btn ${x.id===c.id?'primary':''}" data-cascade="${x.id}">${esc(x.title)}</button>`).join('')}</div></section>`);
}
function qualitySummaryHTML(){
 const fragments=STORIES.flatMap(c=>c.daily.filter(p=>/\b\d{1,2}\.$/.test(p)));
 const duplicateQuestions=STORIES.flatMap(c=>[c.quiz[0],c.decision[0]]).filter((q,i,a)=>a.indexOf(q)!==i);
 const sources=STORIES.reduce((a,c)=>{const k=c.reading.sourceStatus.status;a[k]=(a[k]||0)+1;return a;},{});
 return `<section class="surface quality-summary"><h2>Qualitätsprüfung vom 25.10.2026</h2><p>${STORIES.length} Akten · ${STORIES.length*3} Kapitel · ${STORIES.length*2} Fragen strukturell geprüft.</p><ul><li>50 abgebrochene Kurzabsätze in 47 Akten aus vollständigen Kapiteln ergänzt.</li><li>${fragments.length} verbliebene Datumsabbrüche; ${duplicateQuestions.length} identische Fragentexte.</li><li>Wiederholte Antwortbausteine durch fallbezogene Alternativen ersetzt.</li><li>${sources.retrieved||0} Akten mit erneut abrufbarem Bericht; ${(sources.unavailable||0)+(sources.redirected||0)} mit Abruf- oder Weiterleitungsproblem.</li><li>${sources['not-rechecked']||0} Akten ohne erneuten Quellenabruf.</li></ul><p class="small muted">Die Strukturprüfung erkennt fehlende Felder, abgebrochene Datumsangaben und identische Fragen. Sie ist keine vollständige neue Faktenprüfung aller ${STORIES.length} Fälle. Der individuelle Quellenstand steht in jeder Akte.</p><button class="btn" data-action="glossary">Technikbegriffe öffnen</button></section>`;
}
// Extend the existing event handling without changing stored progress keys.
app.addEventListener('click',e=>{
 const t=e.target.closest('button,a');if(!t||t.disabled)return;
 if(t.hasAttribute('data-close-dialog')){closeLearningDialog();return;}
 if(t.dataset.term){showTerm(t.dataset.term);return;}
 if(t.dataset.reading){stopSpeak();state.readingLevel=t.dataset.reading;save();const y=scrollY;renderStory();scrollTo(0,y);return;}
 if(t.dataset.report){showReport(t.dataset.report);return;}
 if(t.hasAttribute('data-copy-report')){copyReport();return;}
 if(t.dataset.action==='glossary'){showGlossary();return;}
 if(t.dataset.cascade){startCascade(t.dataset.cascade);return;}
 if(t.dataset.lab){startLab(t.dataset.lab);return;}
 if(t.dataset.cascadePick!==undefined){pickCascade(Number(t.dataset.cascadePick));return;}
 if(t.hasAttribute('data-cascade-next')){const l=state.lab;if(l?.mode==='cascade'&&l.choice!==null){l.stage++;l.choice=null;l.answerOrder=null;renderCascade();}return;}
 if(t.dataset.move!==undefined){const l=state.lab;if(l?.checked||l?.mode!=='order')return;const a=Number(t.dataset.move),b=a+Number(t.dataset.direction);if(b>=0&&b<3){[l.order[a],l.order[b]]=[l.order[b],l.order[a]];renderLab();document.querySelector(`[data-move="${b}"][data-direction="${t.dataset.direction}"]:not(:disabled)`)?.focus();}return;}
 if(t.dataset.errorAnswer){state.lab.errorAnswer=t.dataset.errorAnswer;renderLab();return;}
 if(t.hasAttribute('data-check-lab'))checkLab();
});
app.addEventListener('input',e=>{
 if(e.target.id==='time-lab-value')updateTimeLab();
 if(e.target.id==='glossary-search'){let visible=0;for(const el of document.querySelectorAll('[data-glossary-entry]')){el.hidden=!el.dataset.glossaryEntry.includes(e.target.value.toLowerCase().trim());if(!el.hidden)visible++;}document.getElementById('glossary-empty').hidden=visible>0;}
 if(e.target.id==='report-body')refreshReportLink();
});
app.addEventListener('change',e=>{if(e.target.id==='identifier-value')updateIdentifierLab();if(e.target.dataset.match&&state.lab&&!state.lab.checked)state.lab.matches[e.target.dataset.match]=e.target.value;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('learning-dialog'))closeLearningDialog();});
