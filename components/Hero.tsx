"use client";

import { PERSONAS } from "@/lib/data";
import { useApp } from "./Providers";

export default function Hero() {
  const { persona, toast } = useApp();
  const p = PERSONAS.find((x) => x.id === persona)!;

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div>
          <span className="hero-eyebrow">{p.hero.eyebrow}</span>
          <h1>{p.hero.title} <em>{p.hero.titleEm}</em></h1>
          <p className="lede">{p.hero.lede}</p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => toast(`Action: ${p.hero.cta}`)}>{p.hero.cta}</button>
            <button className="btn btn-light" onClick={() => toast("Opening: Talk to us")}>Talk to us</button>
          </div>
          <div className="hero-stats">
            <div><div className="n">217,000+</div><div className="l">Members worldwide</div></div>
            <div><div className="n">100%</div><div className="l">Free CPD for members</div></div>
            <div><div className="n">#1</div><div className="l">Tax training in Canada</div></div>
          </div>
        </div>

        {/* Personalized spotlight card */}
        <aside className="hero-card" aria-label="Personalized spotlight">
          <span className="badge">{p.spotlight.badge}</span>
          <h3>{p.spotlight.title}</h3>
          <p>{p.spotlight.body}</p>
          <div className="mini">
            {p.spotlight.links.map((l) => (
              <a key={l.label} href="#" onClick={(e) => { e.preventDefault(); toast(`Opening: ${l.label}`); }}>
                <span>{l.label}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: ".72rem", opacity: .8 }}>{l.tag}</span>
                  <span className="arr">→</span>
                </span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
