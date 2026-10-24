# Adrakir – IT-Pannenakte

[Online-App öffnen](https://adrakir.github.io/)

340 illustrierte Akten mit Quellen, drei Kapiteln, einer kurzen Tagesgeschichte und zwei Quizfragen pro Akte. Drei Akten sind ausdrücklich fiktive Trainingsfälle. Die übrigen sind dokumentierte Vorfälle, Forschungsfälle und Technikgeschichte. Die App ist ein unabhängiges Lernprojekt, keine offizielle oder vom BSI geprüfte Anwendung.

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

Die Tests prüfen alle 340 Kurzansichten, Themen und Kennzeichnung, Archivgrenzen, Vorlesen, Verweise und Vergleich, gespeicherte Wiederholungen, Übernahme des vorhandenen Lernstands, Direktlinks und Offline-Auslieferung. Die Installation auf einem konkreten Gerät bleibt browserabhängig. Für eine neue Offline-Version den Cache-Namen in `sw.js` erhöhen und die Funktionstests ausführen.
