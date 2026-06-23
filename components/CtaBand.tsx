"use client";

import { useApp } from "./Providers";

export default function CtaBand() {
  const { toast } = useApp();
  return (
    <section className="cta-band">
      <div className="wrap">
        <div>
          <h2>Join the 217,000+ professionals who trust CPA Canada</h2>
          <p>Complimentary CPD, the CPA Canada Handbook, Tax 360™ and re-investable credits — all in one membership.</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button className="btn btn-white" onClick={() => toast("Opening: Become a member")}>Become a member</button>
          <button className="btn btn-light" onClick={() => toast("Opening: Compare options")}>Compare options</button>
        </div>
      </div>
    </section>
  );
}
