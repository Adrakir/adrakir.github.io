# Adrakir – IT-Pannenakte

[Online-App öffnen](https://adrakir.github.io/)

370 illustrierte Akten mit Quellen, drei Kapiteln, einer kurzen Tagesgeschichte und zwei Quizfragen pro Akte. Drei Akten sind ausdrücklich fiktive Trainingsfälle. Die übrigen sind dokumentierte Vorfälle, Forschungsfälle und Technikgeschichte. Die App ist ein unabhängiges Lernprojekt, keine offizielle oder vom BSI geprüfte Anwendung.

## Lesen und entdecken

- Jede Akte hat eine direkt zugängliche **Kurzgeschichte** und eine ausführliche Ansicht mit Quiz.
- Acht Themenbereiche bündeln die Sammlung. Zusätzliche Filter unterscheiden Geschichte, Quelle, Ereignisart und Besonderheiten.
- Der **Fall des Tages** richtet sich nach dem Kalenderdatum in Europe/Berlin. Das Tagesarchiv beginnt am 24. Oktober 2026; alle anderen Kurzgeschichten bleiben jederzeit über die Sammlung zugänglich.
- Verwandte Akten verlinken aufeinander. Unter **Einstellungen → Akten vergleichen & prüfen** lassen sich zwei Akten nebeneinander lesen und mögliche Überschneidungen markieren. Die automatische Prüfung ist ein Hinweisverfahren und ersetzt keine vollständige Quellenprüfung. Eigene Markierungen bleiben auf dem jeweiligen Gerät.

## Lernen

Die Challenge zieht Wissens- und Entscheidungsfragen aus einem wechselnden Vorrat. Falsche Antworten werden dauerhaft im lokalen Lernstand vorgemerkt. Nach fünf Minuten sind sie zur Wiederholung fällig; richtig beantwortete Wiederholungen folgen nach einem und drei Tagen. Nach drei richtigen Wiederholungen wird der Eintrag entfernt. Freiwilliges früheres Üben ist möglich. Vorhandene Favoriten und gelöste Aufgaben bleiben beim Update erhalten.

## Installation und offline

Unter **Einstellungen → App & Offline-Nutzung** stehen der Speicherstatus und die Installationshilfe. Nach erfolgreicher Vorbereitung sind alle Geschichten, Illustrationen und Quizfragen offline verfügbar. Chrome/Edge bieten bei Unterstützung einen Installationsdialog; auf dem iPhone/iPad führt der Weg über **Teilen → Zum Home-Bildschirm**. Browserbezeichnungen können abweichen.

Externe Quellenlinks benötigen Internet. Vorlesen nutzt Stimmen des Browsers bzw. Geräts; offline hängt die Verfügbarkeit von lokalen Stimmen ab. Ein Browser kann gespeicherte App-Daten bei Platzmangel oder beim Löschen von Website-Daten entfernen. Es gibt keinen Benutzeraccount und keine geräteübergreifende Synchronisierung des Lernstands.

## Technischer Aufbau und Prüfung

Die App läuft ohne Buildprozess auf GitHub Pages. `index.html` enthält Inhalt, Oberfläche und eingebettete Illustrationen. `daily-stories.json` ist der Inhaltsfeed für den täglichen Fall. `manifest.webmanifest`, `sw.js` und die App-Icons ermöglichen Installation und Offline-Speicherung. Der Service Worker speichert ausschließlich eigene App-Dateien; externe Quellen werden nicht gespiegelt. Navigation versucht zuerst das Netz und verwendet bei Ausfall die gespeicherte App.

Entwicklungstests benötigen Node.js und die Entwicklungsabhängigkeiten:

```sh
npm install
npm test
```

Die Tests prüfen alle 370 Kurzansichten, Themen und Kennzeichnung, Archivgrenzen, Vorlesen, Verweise und Vergleich, gespeicherte Wiederholungen, Übernahme des vorhandenen Lernstands, Direktlinks und Offline-Auslieferung. Die Installation auf einem konkreten Gerät bleibt browserabhängig. Für eine neue Offline-Version den Cache-Namen in `sw.js` erhöhen und die Funktionstests ausführen.


## Qualität und Verständlichkeit (Version 2.2)

- Strukturprüfung der 370 Akten, 1.110 Kapitel und 740 vorhandenen Fragen.
- 50 Datumsabbrüche in 47 Kurzfassungen aus den vollständigen Kapiteln ergänzt.
- 586 häufig wiederholte falsche Antwortbausteine durch fallbezogene Quizalternativen ersetzt.
- Zwei Lesestufen, gegliederte Fallübersicht und 37 Begriffserklärungen mit Beispielen.
- Lernentscheidung vor der Auflösung sowie zusätzliche Übungen zum Ordnen, Zuordnen und Prüfen von Behauptungen.
- Individueller Quellenabrufstatus und ausdrücklich benannte Grenzen der Einordnung.
- Vorbereitete Korrekturmeldung: Kopieren oder vom Nutzer auf GitHub einreichen; kein automatischer Versand.
- Zusätzliche Aussprachehilfen und Satztrennung, die deutsche Datumsangaben zusammenhält.

`quality-audit.json` protokolliert die Korrekturen und die überprüften Quellenabrufe. Erreichbarkeit einer Quelle ist keine vollständige unabhängige Faktenprüfung; nicht erneut gelesene oder nicht zugängliche Quellen sind gekennzeichnet. Historische Angaben wurden nicht pauschal als neu verifiziert markiert.

Die App bleibt buildless und enthält die Laufzeitfunktionen eingebettet in `index.html`, damit sie auch offline funktionieren. Bei Änderungen an den redaktionellen Helfern:

```sh
python scripts/quality-content.py
python scripts/build-quality.py
npm test
```

`quality-content.py` erhält bestehende redaktionelle Antwortänderungen und die Korrekturhistorie bei erneutem Aufruf. `build-quality.py` aktualisiert die eingebetteten UI- und CSS-Quellen. Die zusätzlichen Übungen verändern bestehende Aktenabschlüsse nicht.


## Neue Themen und „Gut gegangen!“ (Version 2.3)

Die Sammlung enthält 381 Akten. Die Erweiterung umfasst elf neue Akten mit 33 Kapiteln und 22 Fragen:

- QR-Code-Betrug am Parkautomaten (Polizei Celle und Stadt Mannheim, 2025).
- GNSS-Spoofing und Jamming (EASA-Sicherheitshinweis, 2024).
- Serverabschaltung des ursprünglichen The Crew (historische Ubisoft-Ankündigung für 2024).
- Unterseekabel und Notkommunikation in Tonga (ITU/UNESCO, 2022).
- Robodebt (Untersuchungsbericht 2023 über das bereits 2019 beendete Programm).
- Barrierefreiheit (WebAIM-Studie 2024 und Grenzen automatisierter Tests).
- Foto-Metadaten (ausdrücklich fiktives Trainingsszenario).
- Nest Secure (Support- und Dienstende, 2024).
- Jahr 2038 (ausdrücklich fiktives Zukunftslabor mit lokalem Zeitwertvergleich).
- Qakbot-Abwehr (dokumentierte internationale Operation, 2023).
- Rhysida-Datenrettung (begrenzter Forschungserfolg, 2024).

„Gut gegangen!“ bündelt sieben neue und vorhandene Akten. Jede erklärt den konkreten Erfolg und seine Grenzen. Die neuen Themen sind über eigene Themenkarten und den Filter „Neue Themen (11)“ erreichbar. Von den 381 Akten sind fünf ausdrücklich fiktive Trainingsfälle; Studien und Sicherheitshinweise werden nicht als Einzelunfälle erzählt.

Der Zeitwertregler rechnet ausschließlich mit Testzahlen. Er verändert weder Geräteuhr noch Systemkonfiguration. Standortdaten der Nutzer werden weder abgefragt noch hochgeladen. Alle neuen Laufzeitinhalte bleiben in der Offline-App enthalten.

Zur Pflege der Erweiterung dienen `scripts/new-topics.json` und `scripts/add-new-topics.py`; danach werden `scripts/quality-content.py` und `scripts/build-quality.py` ausgeführt. Die alte Sammlung wird dabei erhalten. Der fehlgeschlagene direkte GNU-Abruf ist in der Quellenanzeige vermerkt; die Linux-Kernel-Dokumentation ist als ergänzende technische Quelle verlinkt.
