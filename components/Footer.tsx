"use client";

import { useApp } from "./Providers";

const COLS = [
  { h: "About CPA Canada", links: ["Governance", "Job opportunities", "Volunteer", "Media centre", "Contact us"] },
  { h: "Become a CPA", links: ["Pathways to becoming a CPA", "CPA certification program", "Provincial & regional bodies", "International recognition"] },
  { h: "Membership", links: ["Join CPA Canada", "Complimentary CPD", "Premier benefits", "CPA Canada Handbook", "Pay an invoice"] },
];

export default function Footer() {
  const { toast } = useApp();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <span className="brand-text" style={{ fontSize: "1.3rem" }}>CPA <span>Canada</span></span>
            <p style={{ marginTop: 14, fontSize: ".92rem", maxWidth: "34ch" }}>
              Chartered Professional Accountants of Canada — one of the largest national accounting bodies in the world.
            </p>
            <div className="footer-social" style={{ marginTop: 18 }}>
              {["f", "in", "X", "▶", "◎"].map((s, i) => (
                <a key={i} href="#" aria-label="social" onClick={(e) => { e.preventDefault(); toast("Opening social (demo)"); }}>{s}</a>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              {c.links.map((l) => (
                <a key={l} href="#" onClick={(e) => { e.preventDefault(); toast(`Opening: ${l}`); }}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 CPA Canada — Redesign prototype (concept, not affiliated). All rights reserved.</span>
          <span style={{ display: "flex", gap: 16 }}>
            <a href="#" onClick={(e) => { e.preventDefault(); toast("Terms (demo)"); }}>Terms of Use</a>
            <a href="#" onClick={(e) => { e.preventDefault(); toast("Privacy (demo)"); }}>Privacy Policy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
