/* global React */
// Red Sunrise — single hi-fi case page.
// Red (#870F11) bg, cream type. Cinematic full-bleed breaks between info blocks.
// Order: cover → concept → break1 → artists → break2 → festival → gallery → footer.

const { useEffect } = React;

// portrait native aspect ratio (matches both uploaded portraits)
const PORTRAIT_RATIO = 948 / 2126; // width / height ≈ 0.446

const CONCEPT_LINES = [
"The fiery sun of awakening",
"is destructive as everyday life.",
"Distorted shapes, motifs, figures.",
"Intervention."];


const PHOTOS = {
  cover:   "assets/img/dome-hands.jpg",     // hands silhouettes — cover
  break1:  "assets/img/dome-03.jpg",        // sun — Frame 01 (after concept)
  midBreak:"assets/img/dome-04.jpg",        // fracture — Frame 02 (between artists & festival)
  g_lead:  "assets/img/dome-07.jpg",        // noise — Frame 03 (gallery hero, swapped)
  g_a:     "assets/img/dome-02.jpg",        // lines — Frame 04
  g_b:     "assets/img/dome-06.jpg",        // tower — Frame 07
  g_c:     "assets/img/dome-01.jpg",        // structures — Frame 08 (gallery tail, swapped)
  g_d:     "assets/img/dome-05.jpg",        // flare — Frame 06
};

const ARTISTS = [
{
  id: "konstruktor",
  name: "Konstruktor",
  aka: "Danil Matvienko",
  portrait: "assets/img/portrait-konstruktor.jpg",
  role: "Sound · Visual / Unity · AI",
  title: "Sound and media artist.",
  bio: "He works at the intersection of audiovisual performance, combining sound, light and visual devices into cohesive live compositions.",
  stack: ["Unity", "AI", "Live sound"],
  links: [
  { label: "Web", href: "https://matvienkodanil.com/" },
  { label: "Instagram", href: "https://www.instagram.com/danil_matvienko/" }]

},
{
  id: "elizabeth-ros",
  name: "Elizabeth Ros",
  aka: null,
  portrait: "assets/img/portrait-elizabeth.jpg",
  role: "Visual / TouchDesigner",
  title: "Creative director, generative artist.",
  bio: "[bio будет дополнен — текст от художницы.]",
  stack: ["TouchDesigner", "Generative"],
  links: [
  { label: "Behance", href: "https://www.behance.net/elizabethros" },
  { label: "Instagram", href: "https://www.instagram.com/elizabethros__/" }]

}];


// --- atoms ---

function Photo({ src, caption, frameId, style, className }) {
  return (
    <div className={"photo " + (className || "")} style={style}>
      <img src={src} alt={caption || ""} loading="lazy" />
      {frameId && <span className="frame-id">{frameId}</span>}
      {caption && <span className="cap">{caption}</span>}
    </div>);

}

function ArtistLinks({ links }) {
  return (
    <div className="links">
      {links.map((l) =>
      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn">
          {l.label}
          <span className="arr">↗</span>
        </a>
      )}
    </div>);

}

// --- page ---

// Sizes each artist's portrait column so its height = the info column's
// content height AND width = height * portrait aspect ratio.
// Done in JS because flex + aspect-ratio + align-stretch does not resolve
// width from a stretched height in any current browser.
function useFitPortraits() {
  useEffect(() => {
    let raf = 0;
    const sync = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.querySelectorAll(".artists .artist").forEach((a) => {
          const info = a.querySelector(".info");
          const col  = a.querySelector(".portrait-col");
          if (!info || !col) return;
          // measure with portrait collapsed so info width is its "natural" max
          const h = info.offsetHeight;
          const w = Math.round(h * PORTRAIT_RATIO);
          // skip near-no-op writes to prevent a ResizeObserver feedback loop
          if (col._w === w && col._h === h) return;
          col._w = w; col._h = h;
          col.style.height = h + "px";
          col.style.width  = w + "px";
        });
      });
    };
    sync();
    window.addEventListener("resize", sync);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
    // Re-measure after late layout shifts (web fonts, images, video iframe)
    const t1 = setTimeout(sync, 200);
    const t2 = setTimeout(sync, 800);
    const t3 = setTimeout(sync, 2000);
    return () => {
      window.removeEventListener("resize", sync);
      cancelAnimationFrame(raf);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);
}

function Case() {
  useFitPortraits();
  return (
    <>
      {/* fixed top bar — no nav tabs, just brand metadata */}
      <div className="topbar">
        <div className="left">
          <span className="dot" />
          <span>Red Sunrise</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>A/V Live</span>
        </div>
        <div className="right">
          <span>Dome · 60′</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>2025</span>
        </div>
      </div>

      {/* HERO — full-bleed photo, title overlaid */}
      <section className="hero" data-screen-label="01 Cover">
        <img className="hero-bg" src={PHOTOS.cover} alt="" />
        <div className="hero-veil" />
        <div className="hero-inner">
          <h1 className="title">
            <span className="l1">Red</span>
            <span className="l2">sunrise</span>
          </h1>
        </div>
      </section>

      {/* CONCEPT */}
      <section className="concept sect-pad" data-screen-label="02 Concept">
        <div className="display text">
          {CONCEPT_LINES.map((l, i) =>
          <div key={i}>{l}</div>
          )}
        </div>
      </section>

      {/* PHOTO BREAK 01 */}
      <section className="break" data-screen-label="03 Frame · Structures">
        <Photo src={PHOTOS.break1} frameId="Frame · 01" caption="structures of the everyday" />
      </section>

      {/* ARTISTS — moved above gallery */}
      <section className="artists sect-pad" data-screen-label="04 Artists">
        {ARTISTS.map((a, i) =>
        <div key={a.id} className="artist">
            <div className="portrait-col">
              <Photo src={a.portrait} className="portrait" frameId={`0${i + 1} / Portrait`} />
            </div>
            <div className="info">
              <div className="display name">{a.name}</div>
              {a.aka && <div className="aka">aka {a.aka}</div>}
              <div className="role">{a.role}</div>
              <p className="bio">
                <span style={{ display: "block", fontWeight: 500, color: "var(--cream)", marginBottom: 8 }}>
                  {a.title}
                </span>
                {a.bio}
              </p>
              <ArtistLinks links={a.links} />
            </div>
          </div>
        )}
      </section>

      {/* PHOTO BREAK — between artists and festival (Frame 02) */}
      <section className="break" data-screen-label="05 Frame · Fracture">
        <Photo src={PHOTOS.midBreak} frameId="Frame · 02" caption="fracture" />
      </section>

      {/* FESTIVAL / FULL RECORDING — moved above gallery */}
      <section className="festival sect-pad" data-screen-label="06 Festival">
        <h2 className="ftitle">
          <span className="cjk">「</span>
          <span className="latin">Future Vision Lab 2025</span>
          <span className="cjk">」</span>
          <span className="cjk suffix">作品全紀錄</span>
        </h2>
        <p className="intro">
          <span className="lead">
            The work premiered at Future Vision Lab 2025 — C-LAB Taipei.
          </span>
          A 60-minute audiovisual live built for full-dome projection, presented
          for the first time inside the inflatable dome of the Taiwan Contemporary
          Culture Lab. The complete documentation of the live appears below.
        </p>
        <div className="video">
          <iframe
            src="https://www.youtube.com/embed/qTb0QXlOlZs?start=23"
            title="Red Sunrise — Future Vision Lab 2025 — full recording"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen />
        </div>
        <div className="video-meta">
          <span>Full Recording · Live A/V</span>
          <span>C-LAB Taipei · 2025</span>
        </div>
      </section>

      {/* GALLERY — cinematic, big frames */}
      <section data-screen-label="07 Gallery" className="gallery-wrap">
        <div className="gallery">
          <div className="row r-1 h-tall">
            <Photo src={PHOTOS.g_lead} frameId="Frame · 03" caption="noise field" />
          </div>
          <div className="row r-2 h-med">
            <Photo src={PHOTOS.g_a} frameId="Frame · 04" caption="lines" />
            <Photo src={PHOTOS.break1} frameId="Frame · 05" caption="the sun, overhead" />
          </div>
          <div className="row r-12 h-med">
            <Photo src={PHOTOS.g_d} frameId="Frame · 06" caption="flare" />
            <Photo src={PHOTOS.g_b} frameId="Frame · 07" caption="the everyday as a tower" />
          </div>
          <div className="row r-1 h-short">
            <Photo src={PHOTOS.g_c} frameId="Frame · 08" caption="structures" />
          </div>
        </div>
      </section>

      <footer>
        <div className="row">
          <span className="num">Red Sunrise · A/V Live · 2025</span>
          <span className="num">hello@redsunrise.av</span>
        </div>
      </footer>
    </>);

}

Object.assign(window, { Case });