## Lokaler Dev & Deploy

```bash
# Lokal
python3 -m http.server 8000   # oder: npx serve .
# Kein Build-Schritt. Direkt im Browser öffnen reicht.

# Deploy
git push   # → Vercel auto-deploy (kein Build-Command konfiguriert)
```

## Stack

- **Kein Framework, kein Build-Tool** — HTML5 + CSS3 + Vanilla JS
- **Vercel** (static hosting, `vercel.json` ist minimal)
- Google Fonts: Playfair Display (Headings) + Nunito (Body)
- Responsive, Mobile-first

## Architektur

Alle Inhalte in einer einzigen `index.html`. Weitere Seiten: `danke.html` (Formular-Danke), `datenschutz.html`, `impressum.html`. Styles in `css/style.css` (CSS Custom Properties in `:root`), Logik in `js/main.js`. Galerie-Bilder in `assets/`, weitere in `images/gallery/`.

## Wichtige Stellen in index.html

| Inhalt | Selektor / Suche |
|---|---|
| Preise | `service-card__price` |
| Öffnungszeiten | `contact__hours-table` |
| Kontaktdaten | `contact__detail` |
| Bewertungen | `review-card` |

## Nicht-offensichtliche Eigenheiten

**Design-Achsen via CSS-Attributselektoren:** Das Design hat drei schaltbare Achsen — `data-mood` (rose / mocha / bordeaux), `data-voice` (editorial / couture / bold), `data-photo` (natural / warm / hushed) — als Attribute auf `<html>`. Das CSS reagiert darauf via `[data-mood="mocha"] { ... }`. Defaults stehen in `tweaks-app.jsx` unter `TWEAK_DEFAULTS`.

**tweaks-app.jsx / tweaks-panel.jsx:** Kein kompilierter Code — diese JSX-Dateien werden im Browser via Babel-CDN ausgeführt. Sie implementieren ein Live-Tweaks-Panel für Claude Code's Edit-Mode-Protokoll (`__activate_edit_mode` / `__edit_mode_set_keys`). Nicht anfassen ohne das Protokoll zu kennen.
