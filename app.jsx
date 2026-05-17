/* global React, ReactDOM, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakColor, Case */

const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "pairing": "mono",
  "redTone": "#870F11",
  "showTopbar": true
}/*EDITMODE-END*/;

const PAIRING_STACKS = {
  mono:    `"JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace`,
  grotesk: `"Inter", "Neue Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif`,
  serif:   `"EB Garamond", "Times New Roman", Georgia, serif`,
};

function applyTweaks(t) {
  const root = document.documentElement;
  root.style.setProperty("--mono", PAIRING_STACKS[t.pairing] || PAIRING_STACKS.mono);
  root.style.setProperty("--red", t.redTone || "#870F11");
  // derive a slightly deeper red for photo backdrops
  root.style.setProperty("--red-deep", shade(t.redTone || "#870F11", -0.35));
  document.body.dataset.topbar = t.showTopbar ? "1" : "0";
}

// quick shade helper (clamp & darken/lighten an #rrggbb)
function shade(hex, amt) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const c = [m[1], m[2], m[3]].map((h) => parseInt(h, 16));
  const out = c.map((v) => {
    const n = Math.round(v + (amt < 0 ? v * amt : (255 - v) * amt));
    return Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  });
  return "#" + out.join("");
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => applyTweaks(t), [t]);

  return (
    <>
      <Case />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Type pairing">
          <TweakRadio
            value={t.pairing}
            onChange={(v) => setTweak("pairing", v)}
            options={[
              { value: "mono",    label: "Mono" },
              { value: "grotesk", label: "Grotesk" },
              { value: "serif",   label: "Serif" },
            ]}
          />
        </TweakSection>

        <TweakSection label="Red tone">
          <TweakColor
            label="Background"
            value={t.redTone}
            onChange={(v) => setTweak("redTone", v)}
            options={["#870F11", "#6B0A0C", "#A8131A", "#3A0608"]}
          />
        </TweakSection>

        <TweakSection label="Chrome">
          <TweakToggle
            label="Top bar"
            value={t.showTopbar}
            onChange={(v) => setTweak("showTopbar", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const dynStyle = document.createElement("style");
dynStyle.textContent = `
  body[data-topbar="0"] .topbar { display: none; }
`;
document.head.appendChild(dynStyle);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
