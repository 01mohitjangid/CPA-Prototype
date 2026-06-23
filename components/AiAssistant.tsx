"use client";

import { useEffect, useRef, useState } from "react";
import { AI_INTENTS, AI_FALLBACK, PERSONAS } from "@/lib/data";
import { useApp } from "./Providers";
import {
  SparkIcon, ArrowUpIcon, ChevronDownIcon, NewChatIcon, MinimizeIcon,
  CompassIcon, TargetIcon, PencilIcon,
} from "./Icons";

interface Message { role: "bot" | "user"; html: string }

// Suggestion rows shown in the empty state (icons mirror the reference design).
const SUGGESTIONS = [
  { icon: <CompassIcon size={20} />, label: "How do I become a CPA?" },
  { icon: <SparkIcon size={20} />, label: "What can I do on this page?" },
  { icon: <PencilIcon size={20} />, label: "Recommend free CPD for me" },
  { icon: <TargetIcon size={20} />, label: "Help me with a tax question" },
];

function answer(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("this page") || q.includes("what can i do")) {
    return "On this page you can:<ul><li><strong>Personalize</strong> it — pick your audience in the “I am a…” bar.</li><li><strong>Become a CPA</strong>, browse <strong>membership</strong> & free <strong>CPD</strong>, or explore <strong>Tax 360™</strong>.</li><li><strong>Search</strong> anything from the header, or ask me right here.</li></ul>What would you like to start with?";
  }
  let best: { score: number; reply: string } | null = null;
  for (const intent of AI_INTENTS) {
    const score = intent.keys.reduce((s, k) => (q.includes(k) ? s + k.length : s), 0);
    if (score > 0 && (!best || score > best.score)) best = { score, reply: intent.reply };
  }
  return best ? best.reply : AI_FALLBACK;
}

export default function AiAssistant() {
  const { persona } = useApp();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [value, setValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 200); }, [open]);

  // Render the streamed plain-text/markdown from the API into safe HTML.
  const renderMd = (s: string) =>
    s
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/^[•\-]\s+(.*)$/gm, "<li>$1</li>")
      .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
      .replace(/\n{2,}/g, "<br/><br/>").replace(/\n/g, "<br/>");

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { role: "user", html: clean }]);
    setValue("");
    setTyping(true);
    streamFromApi(clean);
  };

  // Stream the answer from the backend (retrieval + Claude). Falls back to the
  // local intent matcher if the request fails.
  const streamFromApi = async (text: string) => {
    const history = messages.map((m) => ({
      role: m.role,
      text: m.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    }));
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, persona, history }),
      });
      if (!res.ok || !res.body) throw new Error("bad response");
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", html: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const html = renderMd(acc);
        setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "bot", html }; return c; });
      }
    } catch {
      setTyping(false);
      streamIn(answer(text));
    }
  };

  const streamIn = (full: string) => {
    setMessages((m) => [...m, { role: "bot", html: "" }]);
    const tokens = full.split(/(\s+)/);
    let i = 0;
    const tick = () => {
      i++;
      const partial = tokens.slice(0, i).join("");
      setMessages((m) => { const c = [...m]; c[c.length - 1] = { role: "bot", html: partial }; return c; });
      if (i < tokens.length) window.setTimeout(tick, 18);
    };
    tick();
  };

  const newChat = () => { setMessages([]); setTyping(false); setValue(""); inputRef.current?.focus(); };
  const personaLabel = PERSONAS.find((p) => p.id === persona)?.label ?? "";
  const empty = messages.length === 0 && !typing;

  return (
    <>
      <button className={`ai-fab${open ? " hidden" : ""}`} onClick={() => setOpen(true)}
              aria-label="Ask CPA — open the AI assistant" title="Ask CPA">
        <span className="ai-fab-orb" aria-hidden />
      </button>

      <div className={`ai-panel${open ? " open" : ""}`} role="dialog" aria-label="CPA Canada AI assistant" aria-modal="false">
        {/* Header */}
        <div className="ai-head">
          
          <div className="ai-head-actions">
            <button className="ai-iconbtn" aria-label="New chat" onClick={newChat}><NewChatIcon size={19} /></button>
            <button className="ai-iconbtn" aria-label="Minimize" onClick={() => setOpen(false)}><MinimizeIcon size={19} /></button>
          </div>
        </div>

        {/* Body */}
        <div className="ai-body" ref={bodyRef}>
          {empty ? (
            <div className="ai-empty">
              <h3>Ask <span>CPA</span> anything</h3>
              <p>Become a CPA, find free CPD, or get answers — without leaving the page.</p>
              <div className="ai-suggest">
                {SUGGESTIONS.map((s) => (
                  <button key={s.label} className="ai-suggest-row" onClick={() => send(s.label)}>
                    <span className="ai-suggest-ico">{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role}`} dangerouslySetInnerHTML={{ __html: m.html }} />
              ))}
              {typing && (
                <div className="msg bot" style={{ padding: 0 }}>
                  <div className="typing"><span /><span /><span /></div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Composer */}
        <form className="ai-composer" onSubmit={(e) => { e.preventDefault(); send(value); }}>
          <textarea
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(value); } }}
            placeholder="Do anything with AI…"
            rows={1}
            aria-label="Message the assistant"
          />
          <button className="ai-send" type="submit" aria-label="Send"><ArrowUpIcon size={16} /></button>
        </form>
      </div>
    </>
  );
}
