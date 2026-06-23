// =========================================================================
// Lightweight retrieval over the CPA Canada content model.
//
// The assistant backend (app/api/chat/route.ts) calls retrieve() to pull the
// most relevant chunks for a question and feeds them to Claude as context.
// This is a self-contained TF-IDF cosine ranker — no external vector store —
// which keeps the prototype dependency-free while behaving like real RAG.
// =========================================================================

import { PERSONAS, NAV, FOCUS, SEARCH_INDEX, AI_INTENTS } from "./data";

export interface Chunk {
  id: string;
  title: string;
  text: string; // searchable body (may include keyword terms) — also used as Claude context
  summary: string; // clean, human-readable one-liner for display
}

// ----- 1. Build a flat corpus from the structured content model -----
function buildCorpus(): Chunk[] {
  const chunks: Chunk[] = [];

  for (const p of PERSONAS) {
    chunks.push({
      id: `persona:${p.id}`,
      title: `${p.label} — ${p.spotlight.title}`,
      text: `${p.hero.title} ${p.hero.titleEm}. ${p.hero.lede} ${p.spotlight.body} ${p.spotlight.links.map((l) => l.label).join(". ")} ${p.quickActions.map((q) => `${q.title}: ${q.desc}`).join(". ")}`,
      summary: p.spotlight.body,
    });
  }

  for (const g of NAV) {
    chunks.push({
      id: `nav:${g.label}`,
      title: g.label,
      text: `${g.label}. ${g.items.map((i) => `${i.label}: ${i.desc}`).join(". ")}`,
      summary: g.items.map((i) => i.label).join(", ") + ".",
    });
  }

  for (const f of FOCUS) {
    chunks.push({ id: `focus:${f.title}`, title: f.title, text: `${f.title}. ${f.desc}`, summary: f.desc });
  }

  for (const d of SEARCH_INDEX) {
    chunks.push({ id: `search:${d.title}`, title: d.title, text: `${d.title}. ${d.desc}. ${d.keywords}`, summary: d.desc });
  }

  // The hand-written intent answers double as high-signal knowledge snippets.
  AI_INTENTS.forEach((intent, i) => {
    const plain = intent.reply.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    chunks.push({ id: `intent:${i}`, title: intent.keys[0], text: `${intent.keys.join(" ")} ${plain}`, summary: plain });
  });

  return chunks;
}

// ----- 2. Tokenize + TF-IDF index -----
const STOP = new Set(["the", "a", "an", "and", "or", "to", "of", "for", "in", "on", "is", "are", "i", "me", "my", "you", "do", "how", "what", "can", "with", "about", "it", "this", "that"]);

function tokenize(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t) => t.length > 1 && !STOP.has(t));
}

const CORPUS = buildCorpus();
const DOC_TOKENS = CORPUS.map((c) => tokenize(`${c.title} ${c.text}`));
const N = CORPUS.length;

// Inverse document frequency per term.
const IDF: Record<string, number> = (() => {
  const df: Record<string, number> = {};
  DOC_TOKENS.forEach((toks) => {
    for (const t of new Set(toks)) df[t] = (df[t] || 0) + 1;
  });
  const idf: Record<string, number> = {};
  for (const t in df) idf[t] = Math.log(1 + N / df[t]);
  return idf;
})();

function tfidfVec(tokens: string[]): Map<string, number> {
  const tf: Record<string, number> = {};
  for (const t of tokens) tf[t] = (tf[t] || 0) + 1;
  const vec = new Map<string, number>();
  for (const t in tf) vec.set(t, (tf[t] / tokens.length) * (IDF[t] || Math.log(1 + N)));
  return vec;
}

const DOC_VECS = DOC_TOKENS.map(tfidfVec);

function cosine(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  for (const [t, w] of a) { const bw = b.get(t); if (bw) dot += w * bw; }
  let na = 0, nb = 0;
  for (const w of a.values()) na += w * w;
  for (const w of b.values()) nb += w * w;
  return na && nb ? dot / (Math.sqrt(na) * Math.sqrt(nb)) : 0;
}

// ----- 3. Public API -----
export function retrieve(query: string, k = 4): Chunk[] {
  const qv = tfidfVec(tokenize(query));
  if (qv.size === 0) return [];
  return CORPUS
    .map((c, i) => ({ c, score: cosine(qv, DOC_VECS[i]) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((r) => r.c);
}
