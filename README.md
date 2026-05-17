# Red Sunrise — A/V Live

Case site for the dome audiovisual performance *Red Sunrise* by **Konstruktor** (Danil Matvienko) and **Elizabeth Ros**. Premiered at *Future Vision Lab 2025*, C-LAB Taipei.

## Run locally

Any static server works. From the project root:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open <http://localhost:3000/> (or :8000) in a browser.

> Note: opening `index.html` directly with `file://` will fail to load the JSX scripts because of browser CORS rules. Always serve over HTTP.

## Deploy to GitHub Pages

1. Create a GitHub repo and push the contents of this folder to it.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - *Source*: **Deploy from a branch**
   - *Branch*: `main` (or `master`), folder `/ (root)`
4. Save. After ~1 minute the site is live at  
   `https://<your-username>.github.io/<repo-name>/`.

The `.nojekyll` file in this repo tells GitHub Pages to serve the files as-is (no Jekyll processing).

## Project structure

```
index.html           — entry point, page styles, script imports
app.jsx              — Tweaks panel wiring
redsunrise.jsx       — <Case /> component (the page content)
tweaks-panel.jsx     — Tweaks shell + form controls
assets/
  fonts/
    MoonSwing.otf    — display brand font
    MoonSwing.ttf
  img/
    dome-*.jpg       — dome stills (8 frames)
    portrait-*.jpg   — artist portraits
```

## Notes

- The page is React + JSX transpiled in-browser via Babel standalone (no build step).
- Background colour `#870F11`, display type **MoonSwing**, body type **JetBrains Mono**.
- Tweaks panel (top-right) lets you switch the body type pairing and red tone live.
