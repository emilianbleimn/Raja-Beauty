# Raja Beauty by Anam — Website-Entwurf

Einseitige Website als **Vorschau für die Kundin**. Sie soll einen groben
Eindruck von Aufbau, Stil und Tonfall geben — noch keine fertige,
veröffentlichungsreife Seite.

## Gestaltung

Farben und Typografie sind nicht geschätzt, sondern aus der Logodatei
ausgelesen:

| Rolle | Wert | Herkunft |
| --- | --- | --- |
| Seide (Grund) | `#EFE7D7` → `#FFFBF0` → `#DBD2C3` | Verlauf des Logohintergrunds |
| Goldfolie | `#8A6D3D` → `#B08A4A` → `#F3E4C0` | Farbwerte der Logoschrift |
| Tinte | `#19120E` | Schriftfarbe „BY ANAM“ |

* **Display:** Cormorant Garamond — kontrastreiche Antiqua wie im Logo
* **Auszeichnung:** Jost — geometrische Grotesk wie in „BY ANAM“
* **Aufbau:** Die Behandlungen stehen als typografische Karte mit Haarlinien,
  nicht als Kachelraster. Studiobilder sitzen versetzt übereinander.

Helles und dunkles Theme sind beide gestaltet, umschaltbar über das Symbol in
der Kopfzeile. Für das dunkle Theme gibt es eigene Logodateien
(`logo-dark.png`, `wordmark-dark.png`): darin ist die fast schwarze Zeile
„BY ANAM“ nach Creme umgefärbt, weil sie sonst auf dunklem Grund verschwindet.

## Inhalte

**Belegt** (aus dem öffentlichen Google-Profil und den Studiofotos):
Bewertung 4,9 aus 28 Rezensionen, die zitierten Rezensionsausschnitte,
Termine nur nach Vereinbarung, Barzahlung, WC vorhanden, sowie die
Leistungen von der Schaufensterbeschriftung — Kosmetik, Maniküre, Aquafacial,
Pediküre, Microneedling, Lash\&Browlifting, Fadentechnik.

**Noch offen** — auf der Seite gepunktet unterstrichen dargestellt:

- Adresse, Telefonnummer, E-Mail-Adresse, Instagram-Profil
- Impressum und Datenschutzerklärung (rechtlich verpflichtend vor dem Livegang)
- Preise und Behandlungsdauern (stehen derzeit als „auf Anfrage“)
- Die Beschreibungstexte der Behandlungen sind Entwürfe und sollten von Anam
  gegengelesen werden.

Das Terminformular ist eine Attrappe: Es versendet nichts, sondern zeigt nur
eine Bestätigung an. Für den Livegang muss es an ein Postfach oder ein
Buchungstool angebunden werden.

## Aufbau

```
index.html
assets/css/style.css
assets/js/main.js
assets/img/            Logo, dunkle Logovariante, Seidenhintergrund, Studiofotos
```

Kein Build-Schritt, keine Abhängigkeiten. Die Seite besteht aus statischen
Dateien und läuft auf jedem Webspace.

## Veröffentlichen über GitHub Pages

Einmalig: Repository → **Settings → Pages** → unter *Source* **GitHub Actions**
auswählen. Danach veröffentlicht der Workflow `.github/workflows/pages.yml` die
Seite bei jedem Push automatisch unter
<https://emilianbleimn.github.io/Raja-Beauty/>.

Dieser eine Schritt lässt sich nicht automatisieren: Der `GITHUB_TOKEN` eines
Workflows darf eine Pages-Site deployen, aber nicht erstmalig anlegen.

Die `og:`-Angaben in `index.html` zeigen auf genau diese Adresse, damit beim
Versenden des Links eine Vorschaukarte mit Bild erscheint. Bei einer eigenen
Domain müssen diese beiden Zeilen angepasst werden.

## Ansehen

`index.html` im Browser öffnen, oder:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Bilder

Die drei zugelieferten Aufnahmen wurden aufbereitet: die eingeblendeten
Pfeile des Bildwechslers sind weggeschnitten, das Logo ist vom
Hintergrund freigestellt (transparentes PNG) und der Seidenverlauf des
Logohintergrunds dient als Hintergrundtextur im Kopfbereich.
