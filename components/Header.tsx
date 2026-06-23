"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { NAV, SEARCH_INDEX } from "@/lib/data";
import { useApp } from "./Providers";
import { SearchIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon } from "./Icons";

export default function Header() {
  const { theme, toggleTheme, toast } = useApp();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search on outside click / escape.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setSearchOpen(false); setDrawer(false); } };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => { if (searchOpen) inputRef.current?.focus(); }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((d) =>
      (d.title + " " + d.desc + " " + d.keywords + " " + d.tag).toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  return (
    <>
      {/* Utility bar */}
      <div className="utility">
        <div className="wrap">
          <a href="#" onClick={(e) => { e.preventDefault(); toast("Switching to Français (demo)"); }}>FR</a>
          <span className="divider" />
          <a className="desktop-only" href="#" onClick={(e) => { e.preventDefault(); toast("Opening login (demo)"); }}>Log in</a>
          <a href="#" onClick={(e) => { e.preventDefault(); toast("Opening registration (demo)"); }}>Register</a>
        </div>
      </div>

      {/* Main header */}
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <div className="wrap">
          <nav className="nav" aria-label="Primary">
            <a className="brand" href="#top" aria-label="CPA Canada home">
              <span className="brand-logo">CPA</span>
              <span className="brand-text">CPA <span>Canada</span></span>
            </a>

            <div className="nav-links" onMouseLeave={() => setOpenMenu(null)}>
              {NAV.map((group, i) => (
                <div
                  key={group.label}
                  className={`nav-item${openMenu === i ? " open" : ""}`}
                  onMouseEnter={() => setOpenMenu(i)}
                >
                  <button
                    className="nav-link"
                    aria-expanded={openMenu === i}
                    onClick={() => setOpenMenu(openMenu === i ? null : i)}
                  >
                    {group.label}
                    <span className="chev">▾</span>
                  </button>
                  <div className="mega" role="menu">
                    {group.items.map((it) => (
                      <a key={it.label} className="mega-link" href="#"
                         onClick={(e) => { e.preventDefault(); toast(`Opening: ${it.label}`); setOpenMenu(null); }}>
                        <strong>{it.label}</strong>
                        <small>{it.desc}</small>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="nav-spacer" />

            {/* Search */}
            <div className={`search${searchOpen ? " open" : ""}`} ref={searchRef}>
              <button className="search-toggle" aria-label="Search" aria-expanded={searchOpen}
                      onClick={() => setSearchOpen((s) => !s)}>
                <SearchIcon />
              </button>
              <div className="search-panel">
                <input
                  ref={inputRef}
                  className="search-input"
                  placeholder="Search CPD, Handbook, tax, membership…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search the site"
                />
                <div className="search-results">
                  {query.trim() === "" && <p className="search-hint">Try “become a CPA”, “free CPD”, or “Handbook”.</p>}
                  {query.trim() !== "" && results.length === 0 && <p className="search-hint">No matches. Try another term.</p>}
                  {results.map((r) => (
                    <div key={r.title} className="sr-item" role="button" tabIndex={0}
                         onClick={() => { toast(`Opening: ${r.title}`); setSearchOpen(false); setQuery(""); }}>
                      <span className="tag">{r.tag}</span>
                      <span><strong>{r.title}</strong><small>{r.desc}</small></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="icon-btn" aria-label="Toggle dark mode" onClick={toggleTheme}>
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>

            <a className="btn btn-primary desktop-only" href="#" style={{ marginLeft: 6 }}
               onClick={(e) => { e.preventDefault(); toast("Opening: Become a member"); }}>
              Become a member
            </a>

            <button className="icon-btn burger" aria-label="Open menu" onClick={() => setDrawer(true)}>
              <MenuIcon />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer-backdrop${drawer ? " open" : ""}`} onClick={() => setDrawer(false)} />
      <aside className={`drawer${drawer ? " open" : ""}`} aria-hidden={!drawer}>
        <div className="d-head">
          <span className="brand-text">CPA <span>Canada</span></span>
          <button className="icon-btn" aria-label="Close menu" onClick={() => setDrawer(false)}><CloseIcon /></button>
        </div>
        {NAV.map((g) => (
          <a key={g.label} className="d-link" href="#"
             onClick={(e) => { e.preventDefault(); toast(`Opening: ${g.label}`); setDrawer(false); }}>{g.label}</a>
        ))}
        <a className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 18 }}
           href="#" onClick={(e) => { e.preventDefault(); toast("Opening: Become a member"); setDrawer(false); }}>
          Become a member
        </a>
      </aside>
    </>
  );
}
