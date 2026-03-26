# OG Nails — Website

Offizielle Website für **OG Nails** — Nagelstudio von Olga Görzen in Simbach am Inn.

**Domain:** [ognail-simbach.de](https://ognail-simbach.de)

## Lokal starten

Einfach `index.html` im Browser öffnen — kein Build-Tool oder Server nötig.

Alternativ mit einem lokalen Server:

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .
```

## Auf Vercel deployen

### Option 1: GitHub verbinden

1. Repository auf GitHub pushen
2. [vercel.com](https://vercel.com) → „New Project" → GitHub-Repo auswählen
3. Deploy — fertig

### Option 2: CLI

```bash
npm i -g vercel
vercel
```

### Domain verbinden

In den Vercel-Projekteinstellungen unter „Domains" die Domain `ognail-simbach.de` hinzufügen und DNS-Einträge beim Provider anpassen.

## Inhalte anpassen

Alle Inhalte befinden sich in `index.html`:

- **Preise:** Suche nach `service-card__price` um Preise zu ändern
- **Öffnungszeiten:** Suche nach `contact__hours-table`
- **Kontaktdaten:** Suche nach `contact__detail`
- **Bewertungen:** Suche nach `review-card`
- **Texte:** Hero-Bereich und Über-mich-Sektion direkt im HTML

Farben und Schriften werden in `css/style.css` über CSS Custom Properties (`:root`) gesteuert.

## Technik

- HTML5 + CSS3 + Vanilla JavaScript
- Keine Frameworks, keine Build-Tools
- Responsive (Mobile-first)
- Google Fonts (Playfair Display + Nunito)
- IntersectionObserver für Scroll-Animationen
