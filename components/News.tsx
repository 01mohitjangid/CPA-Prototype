"use client";

import { NEWS } from "@/lib/data";
import { useApp } from "./Providers";
import Reveal from "./Reveal";

export default function News() {
  const { toast } = useApp();
  return (
    <section className="news">
      <div className="wrap">
        <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", maxWidth: "none" }}>
          <div>
            <div className="kicker">In the news</div>
            <h2>Insights & thought leadership</h2>
          </div>
          <a className="btn btn-ghost" href="#" onClick={(e) => { e.preventDefault(); toast("Opening: All news"); }}>View all</a>
        </div>
        <div className="news-grid">
          {NEWS.map((n, i) => (
            <Reveal key={n.title} delay={i * 50}>
              <article className={`news-card${n.feature ? " feature" : ""}`} role="button" tabIndex={0}
                       onClick={() => toast(`Opening: ${n.title}`)}>
                <div className="thumb" aria-hidden>
                  <img src={n.img} alt="" loading="lazy" />
                </div>
                <div className="body">
                  <div className="cat">{n.cat}</div>
                  <h3>{n.title}</h3>
                  <p>{n.desc}</p>
                  <div className="meta">{n.meta}</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
