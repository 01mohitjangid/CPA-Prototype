"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

// Fade-and-rise on scroll into view. Respects prefers-reduced-motion via CSS.
export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal${shown ? " in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
