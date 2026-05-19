/*
 * OG Nails — Tweaks panel mount
 * Three expressive controls that reshape the design:
 *   • Mood  — palette: rose gold / mocha noir / bordeaux
 *   • Voice — type pairing: editorial / couture / bold
 *   • Photo — film treatment: natural / warm / hushed
 *
 * Each control sets a data-* attribute on <html>; CSS in the main file
 * does the heavy lifting via attribute selectors.
 */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "rose",
  "voice": "editorial",
  "photo": "natural"
}/*EDITMODE-END*/;

function applyAttrs(t) {
  const root = document.documentElement;
  root.setAttribute('data-mood',  t.mood);
  root.setAttribute('data-voice', t.voice);
  root.setAttribute('data-photo', t.photo);
}

// Apply once on first paint so the panel doesn't flash the default.
applyAttrs(TWEAK_DEFAULTS);

// Tiny preview swatches — three colours stacked, matches the palette feel.
function MoodSwatch({colors}) {
  return (
    <span style={{
      display:'inline-flex',
      borderRadius:'50%',
      overflow:'hidden',
      border:'1px solid #00000018',
      width:18, height:18, flex:'none',
    }}>
      {colors.map((c, i) => (
        <span key={i} style={{flex:1, background:c}}/>
      ))}
    </span>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyAttrs(t); }, [t.mood, t.voice, t.photo]);

  return (
    <TweaksPanel title="Tweaks · OG Nails">
      <TweakSection label="Mood" />
      <TweakRadio
        label="Palette"
        value={t.mood}
        options={[
          { value: 'rose',     label: 'Rose Gold' },
          { value: 'noir',     label: 'Mocha Noir' },
          { value: 'bordeaux', label: 'Bordeaux' },
        ]}
        onChange={(v) => setTweak('mood', v)}
      />

      <TweakSection label="Voice" />
      <TweakRadio
        label="Type pairing"
        value={t.voice}
        options={[
          { value: 'editorial', label: 'Editorial' },
          { value: 'couture',   label: 'Couture' },
          { value: 'bold',      label: 'Bold' },
        ]}
        onChange={(v) => setTweak('voice', v)}
      />

      <TweakSection label="Imagery" />
      <TweakRadio
        label="Photo treatment"
        value={t.photo}
        options={[
          { value: 'natural', label: 'Natural' },
          { value: 'warm',    label: 'Warm' },
          { value: 'hushed',  label: 'Hushed' },
        ]}
        onChange={(v) => setTweak('photo', v)}
      />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App/>);
