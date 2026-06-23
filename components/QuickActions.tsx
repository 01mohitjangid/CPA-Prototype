"use client";

import { PERSONAS } from "@/lib/data";
import { useApp } from "./Providers";
import Reveal from "./Reveal";

export default function QuickActions() {
  const { persona, toast } = useApp();
  const p = PERSONAS.find((x) => x.id === persona)!;

  return (
    <section className="quick">
      <div className="wrap">
        <div className="section-head">
          <div className="kicker">Quick actions</div>
          <h2>What do you want to do today?</h2>
          <p>These shortcuts adapt to who you are — switch your audience above to see them change.</p>
        </div>
        <div className="quick-grid">
          {p.quickActions.map((a, i) => (
            <Reveal key={a.title + persona} delay={i * 60}>
              <div className="quick-card" role="button" tabIndex={0} onClick={() => toast(`Opening: ${a.title}`)}>
                <div className="ico" aria-hidden>{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
