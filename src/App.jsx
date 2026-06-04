import { useState, useEffect, useRef } from "react";

// Unsplash photos — tech people, innovation, AI, creators
const ARTICLES = [
  {
    id: 1,
    category: "Founders",
    tag: "COVER STORY",
    tagColor: "#FF6B6B",
    title: "The Quiet Engineer Who Rewired How the World Codes",
    excerpt: "At 31, Priya Mehta has shipped compilers used by 40 million developers. She rarely tweets. She doesn't do keynotes. She just builds.",
    author: "James Okafor",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    date: "Jun 1, 2026",
    readTime: "12 min",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=600&fit=crop&crop=top",
    featured: true,
  },
  {
    id: 2,
    category: "AI & Society",
    tag: "INVESTIGATION",
    tagColor: "#845EF7",
    title: "Inside the Labs Building the Models That Will Replace White-Collar Work",
    excerpt: "We spent three months inside four frontier AI labs. What we found was equal parts brilliant and alarming.",
    author: "Lena Fischer",
    authorImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
    date: "May 29, 2026",
    readTime: "18 min",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    category: "Design",
    tag: "INTERVIEW",
    tagColor: "#20C997",
    title: "Figma's New Head of AI on Why Designers Shouldn't Fear the Prompt",
    excerpt: "\"The best designers I know have already made AI part of how they think.\" An honest conversation about creativity and automation.",
    author: "Marcus Webb",
    authorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
    date: "May 26, 2026",
    readTime: "9 min",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
  },
  {
    id: 4,
    category: "Innovation",
    tag: "DEEP DIVE",
    tagColor: "#FCC419",
    title: "How a Team of Five Built the Fastest Vector Database on Earth",
    excerpt: "Qdrant started in a Berlin apartment. Now it's powering AI search for some of the largest companies in the world.",
    author: "Priya Nair",
    authorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face",
    date: "May 23, 2026",
    readTime: "11 min",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
  },
  {
    id: 5,
    category: "People",
    tag: "PROFILE",
    tagColor: "#FF922B",
    title: "The Open Source Maintainer Burning Out in Plain Sight",
    excerpt: "Kai Lindqvist's library ships in 120 million Node.js projects. He earns $0 from it. He's been trying to quit for two years.",
    author: "James Okafor",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    date: "May 20, 2026",
    readTime: "15 min",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=500&fit=crop",
  },
  {
    id: 6,
    category: "Startups",
    tag: "ANALYSIS",
    tagColor: "#339AF0",
    title: "Why YC's Newest Batch Looks Nothing Like 2021",
    excerpt: "Fewer consumer apps. More infrastructure plays. A lot more solo founders over 40. What the data from W26 actually tells us.",
    author: "Lena Fischer",
    authorImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
    date: "May 17, 2026",
    readTime: "7 min",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
  },
  {
    id: 7,
    category: "AI & Society",
    tag: "ESSAY",
    tagColor: "#845EF7",
    title: "The Alignment Tax Is Real — and Startups Are Refusing to Pay It",
    excerpt: "As safety teams shrink and deployment timelines compress, one researcher asks: who is actually responsible now?",
    author: "Marcus Webb",
    authorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
    date: "May 14, 2026",
    readTime: "10 min",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop",
  },
  {
    id: 8,
    category: "Founders",
    tag: "Q&A",
    tagColor: "#FF6B6B",
    title: "\"We Almost Ran Out of Money Three Times.\" Linear's Origin Story",
    excerpt: "Karri Saarinen on building a company against conventional wisdom, why they stayed small, and what's next for Linear.",
    author: "Priya Nair",
    authorImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face",
    date: "May 11, 2026",
    readTime: "14 min",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop",
  },
];

const CATEGORIES = ["All", "Founders", "AI & Society", "People", "Innovation", "Design", "Startups"];

const AUTHORS = [
  { name: "James Okafor", role: "Senior Writer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", articles: 24 },
  { name: "Lena Fischer", role: "Investigations", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", articles: 18 },
  { name: "Marcus Webb", role: "Tech Editor", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", articles: 31 },
  { name: "Priya Nair", role: "AI Correspondent", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face", articles: 19 },
];

export default function DevStyler() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 60);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const filtered = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory);

  const featured = ARTICLES[0];
  const secondary = ARTICLES.slice(1, 3);
  const gridArticles = filtered.filter(a => a.id > 3 || activeCategory !== "All");
  const showHero = activeCategory === "All";

  // Palette
  const C = darkMode ? {
    bg: "#0E0E12",
    surface: "#16161C",
    surface2: "#1E1E26",
    border: "rgba(255,255,255,0.07)",
    text: "#EEEDF5",
    textMuted: "#7B7A90",
    textDim: "#2E2E3E",
    accent: "#FF6B6B",
    accentText: "#FF6B6B",
    navBg: "rgba(14,14,18,0.92)",
  } : {
    bg: "#F7F6F2",
    surface: "#FFFFFF",
    surface2: "#EEEDE8",
    border: "rgba(0,0,0,0.08)",
    text: "#14131E",
    textMuted: "#7A7890",
    textDim: "#D0CFE0",
    accent: "#E8302A",
    accentText: "#C02020",
    navBg: "rgba(247,246,242,0.94)",
  };

  const display = "'Fraunces', Georgia, serif";
  const body = "'Libre Franklin', 'Helvetica Neue', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=Libre+Franklin:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        #dsr { box-sizing: border-box; }
        #dsr *, #dsr *::before, #dsr *::after { box-sizing: border-box; margin: 0; padding: 0; }
        #dsr { font-family: ${body}; background: ${C.bg}; color: ${C.text}; height: 100vh; overflow-y: auto; overflow-x: hidden; transition: background .35s, color .35s; }
        #dsr img { display: block; }
        .ds-pill { font-family: ${mono}; font-size: 10px; font-weight: 500; letter-spacing: .08em; padding: 4px 10px; border-radius: 2px; cursor: pointer; border: 1px solid ${C.border}; white-space: nowrap; transition: all .15s; background: none; color: ${C.textMuted}; }
        .ds-pill.active { color: #fff; border-color: transparent; }
        .ds-card-hover { transition: transform .25s ease, box-shadow .25s ease; }
        .ds-card-hover:hover { transform: translateY(-3px); }
        .img-overlay { position: relative; overflow: hidden; }
        .img-overlay img { transition: transform .5s ease; width: 100%; height: 100%; object-fit: cover; display: block; }
        .img-overlay:hover img { transform: scale(1.04); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp .55s ease both; }
        .ticker-track { display: flex; white-space: nowrap; }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-track { animation: ticker 35s linear infinite; }
        .scroll-row { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; }
        .scroll-row::-webkit-scrollbar { display: none; }
        .tag-badge { font-family: ${mono}; font-size: 9px; font-weight: 600; letter-spacing: .1em; padding: 3px 8px; border-radius: 2px; }
        a { text-decoration: none; color: inherit; cursor: pointer; }
      `}</style>

      <div id="dsr" ref={rootRef}>

        {/* Top bar */}
        <div style={{ background: C.accent, padding: "7px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ overflow: "hidden", flex: 1, marginRight: 24 }}>
            <div className="ticker-track" style={{ fontFamily: mono, fontSize: 10, fontWeight: 500, letterSpacing: ".07em", color: "#fff", display: "flex" }}>
              {[...Array(2)].map((_, i) => (
                <span key={i} style={{ display: "flex" }}>
                  {["COVER STORY: PRIYA MEHTA", "AI LAB INVESTIGATION", "OPEN SOURCE BURNOUT CRISIS", "LINEAR ORIGIN STORY", "YC W26 BATCH ANALYSIS", "FIGMA AI INTERVIEW"].map((t, j) => (
                    <span key={j} style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ margin: "0 20px", opacity: .6 }}>◆</span>{t}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <span style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,.8)", flexShrink: 0 }}>JUNE 2026</span>
        </div>

        {/* Header */}
        <header style={{
          position: "sticky", top: 0, zIndex: 100,
          background: scrolled ? C.navBg : C.surface,
          borderBottom: `1px solid ${C.border}`,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "background .3s",
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", height: 60, gap: 32 }}>
            {/* Logo */}
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ fontFamily: display, fontSize: 22, fontWeight: 900, letterSpacing: "-.03em", color: C.text }}>
                dev<span style={{ color: C.accent }}>styler</span>
              </span>
              <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: ".18em", color: C.textMuted, marginTop: 1 }}>TECHNOLOGY · PEOPLE · IDEAS</span>
            </div>

            {/* Nav */}
            <nav style={{ display: "flex", gap: 28, flex: 1, justifyContent: "center" }}>
              {["Stories", "Founders", "AI & Society", "Innovation", "People", "Podcast"].map(l => (
                <span key={l} style={{ fontFamily: body, fontSize: 13, fontWeight: 500, color: C.textMuted, cursor: "pointer", letterSpacing: ".01em", transition: "color .15s" }}
                  onMouseEnter={e => e.target.style.color = C.text}
                  onMouseLeave={e => e.target.style.color = C.textMuted}>
                  {l}
                </span>
              ))}
            </nav>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
              {searchOpen ? (
                <input ref={searchRef} placeholder="Search stories, people…"
                  style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 3, color: C.text, fontFamily: body, fontSize: 13, padding: "6px 12px", outline: "none", width: 220 }}
                  onBlur={() => setSearchOpen(false)} />
              ) : (
                <button onClick={() => setSearchOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, display: "flex" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </button>
              )}
              <button onClick={() => setDarkMode(d => !d)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, display: "flex" }}>
                {darkMode
                  ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                  : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
              </button>
              <button style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: ".1em", padding: "8px 18px", borderRadius: 2, cursor: "pointer", background: C.accent, color: "#fff", border: "none" }}>
                SUBSCRIBE
              </button>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 80px" }}>

          {/* ── HERO ── */}
          {showHero && (
            <section className="fade-up" style={{ paddingTop: 48, paddingBottom: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 2, borderRadius: 6, overflow: "hidden" }}>

                {/* Big featured image */}
                <div className="img-overlay" style={{ height: 520, position: "relative" }}>
                  <img src={featured.img} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 50%, transparent 100%)" }}></div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <span className="tag-badge" style={{ background: featured.tagColor, color: "#fff" }}>{featured.tag}</span>
                      <span style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,.65)", letterSpacing: ".08em" }}>{featured.category.toUpperCase()}</span>
                    </div>
                    <h1 style={{ fontFamily: display, fontSize: 38, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-.02em", color: "#fff", marginBottom: 14, maxWidth: 560 }}>
                      {featured.title}
                    </h1>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,.72)", lineHeight: 1.65, marginBottom: 20, maxWidth: 480 }}>
                      {featured.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img src={featured.authorImg} alt={featured.author} style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,.3)" }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,.8)", fontWeight: 500 }}>{featured.author}</span>
                      <span style={{ color: "rgba(255,255,255,.35)" }}>·</span>
                      <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,.5)" }}>{featured.readTime} read</span>
                    </div>
                  </div>
                </div>

                {/* Side stack — two secondary articles */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {secondary.map(a => (
                    <div key={a.id} className="img-overlay ds-card-hover" style={{ flex: 1, position: "relative", height: 259 }}>
                      <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.82) 0%, rgba(0,0,0,.2) 60%, transparent 100%)" }}></div>
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <span className="tag-badge" style={{ background: a.tagColor, color: "#fff" }}>{a.tag}</span>
                          <span style={{ fontFamily: mono, fontSize: 9, color: "rgba(255,255,255,.55)", letterSpacing: ".08em" }}>{a.category.toUpperCase()}</span>
                        </div>
                        <h2 style={{ fontFamily: display, fontSize: 17, fontWeight: 700, lineHeight: 1.2, color: "#fff", marginBottom: 8 }}>{a.title}</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <img src={a.authorImg} alt={a.author} style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }} />
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,.65)" }}>{a.author}</span>
                          <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,.45)" }}>{a.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── CATEGORY FILTER ── */}
          <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "14px 0", marginBottom: 40, display: "flex", alignItems: "center", gap: 0 }}>
            <span style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, letterSpacing: ".1em", marginRight: 20, flexShrink: 0 }}>FILTER</span>
            <div className="scroll-row" style={{ flex: 1 }}>
              {CATEGORIES.map(cat => (
                <button key={cat} className={`ds-pill${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  style={{ background: activeCategory === cat ? C.accent : "none", color: activeCategory === cat ? "#fff" : C.textMuted, borderColor: activeCategory === cat ? C.accent : C.border }}>
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
            <span style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, marginLeft: 20, flexShrink: 0 }}>{filtered.length} STORIES</span>
          </div>

          {/* ── ARTICLE GRID ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {gridArticles.map((a, i) => (
              <article key={a.id} className="ds-card-hover fade-up" style={{ animationDelay: `${i * 70}ms`, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, overflow: "hidden" }}>
                {/* Photo */}
                <div className="img-overlay" style={{ height: 220 }}>
                  <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span className="tag-badge" style={{ background: a.tagColor, color: "#fff" }}>{a.tag}</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "20px 22px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, color: a.tagColor, letterSpacing: ".08em" }}>{a.category.toUpperCase()}</span>
                    <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 10, color: C.textMuted }}>{a.readTime} read</span>
                  </div>
                  <h2 style={{ fontFamily: display, fontSize: 20, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.01em", marginBottom: 10, color: C.text }}>
                    {a.title}
                  </h2>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: C.textMuted, marginBottom: 18 }}>
                    {a.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                    <img src={a.authorImg} alt={a.author} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{a.author}</div>
                      <div style={{ fontFamily: mono, fontSize: 10, color: C.textMuted }}>{a.date}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── WRITERS SECTION ── */}
          <section style={{ marginTop: 72 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 28, borderBottom: `2px solid ${C.accent}`, paddingBottom: 12 }}>
              <h2 style={{ fontFamily: display, fontSize: 26, fontWeight: 900, letterSpacing: "-.02em" }}>The Writers</h2>
              <span style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, letterSpacing: ".08em" }}>WHO TELLS THESE STORIES</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {AUTHORS.map((w, i) => (
                <div key={i} className="ds-card-hover fade-up" style={{ animationDelay: `${i * 80}ms`, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: "24px 20px", textAlign: "center" }}>
                  <img src={w.img} alt={w.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", margin: "0 auto 14px", border: `3px solid ${C.border}` }} />
                  <div style={{ fontFamily: display, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{w.name}</div>
                  <div style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, letterSpacing: ".07em", marginBottom: 12 }}>{w.role.toUpperCase()}</div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: C.accent }}>{w.articles} stories</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── NEWSLETTER ── */}
          <section style={{ marginTop: 72, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {/* Left image */}
              <div style={{ height: 340, position: "relative" }}>
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 60%, ${C.surface})` }}></div>
              </div>
              {/* Right copy */}
              <div style={{ padding: "48px 48px 48px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: mono, fontSize: 10, color: C.accent, letterSpacing: ".12em", marginBottom: 12 }}>WEEKLY NEWSLETTER</div>
                <h2 style={{ fontFamily: display, fontSize: 32, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 16 }}>
                  The people<br /><em>behind</em> the code.
                </h2>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, marginBottom: 24 }}>
                  Every Thursday — one long-form story about the humans building the future. No product announcements. No sponsored content.
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input placeholder="your@email.com" style={{ flex: 1, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 2, color: C.text, fontFamily: body, fontSize: 13, padding: "10px 14px", outline: "none" }} />
                  <button style={{ fontFamily: mono, fontSize: 10, fontWeight: 600, letterSpacing: ".08em", padding: "10px 20px", borderRadius: 2, cursor: "pointer", background: C.accent, color: "#fff", border: "none", flexShrink: 0 }}>
                    JOIN FREE
                  </button>
                </div>
                <p style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, marginTop: 10 }}>5,800 readers · No spam · Unsubscribe any time</p>
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer style={{ marginTop: 64, paddingTop: 32, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: display, fontSize: 18, fontWeight: 900, letterSpacing: "-.02em", marginBottom: 3 }}>
                dev<span style={{ color: C.accent }}>styler</span>
              </div>
              <div style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, letterSpacing: ".1em" }}>TECHNOLOGY · PEOPLE · IDEAS</div>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {["Twitter / X", "LinkedIn", "Instagram", "RSS", "Advertise", "Privacy"].map(l => (
                <span key={l} style={{ fontFamily: mono, fontSize: 10, color: C.textMuted, cursor: "pointer", letterSpacing: ".04em" }}>{l}</span>
              ))}
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}
