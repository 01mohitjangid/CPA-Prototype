"use client";

import { FOCUS } from "@/lib/data";
import { useApp } from "./Providers";
import Reveal from "./Reveal";

export default function FocusAreas() {
  const { toast } = useApp();
  return (
    <section id="focus">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Our focus areas</div>
          <h2>Expertise that keeps you ahead</h2>
          <p>Deep resources across the issues shaping the profession — scannable, not walls of text.</p>
        </div>
        <div className="focus-grid">
          {FOCUS.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <article className="focus-card" style={{ ["--accent" as any]: f.accent }}>
                <div className="ico" aria-hidden>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <a className="more" href="#" onClick={(e) => { e.preventDefault(); toast(`Opening: ${f.title}`); }}>
                  Learn more <span className="arr">→</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
