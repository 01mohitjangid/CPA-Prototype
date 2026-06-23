"use client";

import { PERSONAS } from "@/lib/data";
import { useApp } from "./Providers";
import { SparkIcon } from "./Icons";

export default function PersonaBar() {
  const { persona, setPersona, toast } = useApp();
  return (
    <div className="persona-bar">
      <div className="wrap">
        <span className="label"><SparkIcon size={16} /> Personalize this page — I am a:</span>
        <div className="persona-chips" role="group" aria-label="Choose your audience">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              className={`chip${persona === p.id ? " active" : ""}`}
              aria-pressed={persona === p.id}
              onClick={() => { setPersona(p.id); toast(`Personalized for: ${p.label}`); }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
