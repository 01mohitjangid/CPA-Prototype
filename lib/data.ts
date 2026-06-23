// =========================================================================
// Content model for the CPA Canada redesign prototype.
// Mirrors the real site's top-level IA (Become a CPA, Membership, Tax 360,
// CPD and resources, Thought leadership) but restructured around audiences.
// =========================================================================

export type PersonaId = "student" | "member" | "employer" | "public";

export interface Persona {
  id: PersonaId;
  label: string;
  // Hero copy is swapped per audience to demonstrate personalization.
  hero: { eyebrow: string; title: string; titleEm: string; lede: string; cta: string };
  // The personalized "spotlight" card on the hero.
  spotlight: { badge: string; title: string; body: string; links: { label: string; tag: string }[] };
  // Quick-action tiles re-ordered/relabelled per audience.
  quickActions: { icon: string; title: string; desc: string }[];
}

export const PERSONAS: Persona[] = [
  {
    id: "student",
    label: "Future CPA / Student",
    hero: {
      eyebrow: "Start your journey",
      title: "Become a CPA and",
      titleEm: "build a career without limits",
      lede: "Clear pathways, certification support, and the community you need to earn Canada's most trusted accounting designation.",
      cta: "Explore pathways",
    },
    spotlight: {
      badge: "Most popular",
      title: "Pathways to becoming a CPA",
      body: "Find the route that fits your background — university, transfer credit, or international.",
      links: [
        { label: "CPA certification program", tag: "Program" },
        { label: "Check your prerequisites", tag: "2 min" },
        { label: "Talk to an advisor", tag: "Live" },
      ],
    },
    quickActions: [
      { icon: "🎓", title: "Pathways to CPA", desc: "Map your route to the designation" },
      { icon: "📝", title: "Prerequisite checker", desc: "See what courses you need" },
      { icon: "💬", title: "Ask an advisor", desc: "Get personalized guidance" },
      { icon: "🗓️", title: "Upcoming info sessions", desc: "Free virtual events near you" },
    ],
  },
  {
    id: "member",
    label: "CPA Member",
    hero: {
      eyebrow: "Welcome back",
      title: "Everything you need to",
      titleEm: "stay ahead, in one place",
      lede: "Complimentary CPD, the CPA Canada Handbook, Tax 360™ insights, and member benefits — personalized to your practice.",
      cta: "Go to My CPA",
    },
    spotlight: {
      badge: "For members",
      title: "Your complimentary CPD",
      body: "World-class, on-demand professional development — included with your membership.",
      links: [
        { label: "Browse the CPD catalogue", tag: "Free" },
        { label: "CPA Canada Handbook", tag: "Access" },
        { label: "Pay an invoice", tag: "Billing" },
      ],
    },
    quickActions: [
      { icon: "📚", title: "Complimentary CPD", desc: "Free on-demand learning" },
      { icon: "📖", title: "CPA Canada Handbook", desc: "Standards & guidance" },
      { icon: "🧾", title: "CPA Canada Tax 360™", desc: "Timely tax guidance" },
      { icon: "🎁", title: "Member benefits", desc: "Premier perks & savings" },
    ],
  },
  {
    id: "employer",
    label: "Employer",
    hero: {
      eyebrow: "Build your team",
      title: "Hire and develop",
      titleEm: "the talent that powers business",
      lede: "Train your people with CPA-grade programs, recruit certified professionals, and keep your team current on standards.",
      cta: "Explore for business",
    },
    spotlight: {
      badge: "For organizations",
      title: "Corporate training & recruitment",
      body: "Group access to CPD, the In-Depth Tax Program, and a pipeline of certified talent.",
      links: [
        { label: "Group CPD & training", tag: "Teams" },
        { label: "Post a job / recruit CPAs", tag: "Hire" },
        { label: "In-Depth Tax Program", tag: "2026" },
      ],
    },
    quickActions: [
      { icon: "👥", title: "Team training", desc: "Group CPD & enrollment" },
      { icon: "🔎", title: "Recruit CPAs", desc: "Reach certified talent" },
      { icon: "🧾", title: "In-Depth Tax Program", desc: "Upskill your tax team" },
      { icon: "📈", title: "Standards updates", desc: "Keep teams compliant" },
    ],
  },
  {
    id: "public",
    label: "Public / Business",
    hero: {
      eyebrow: "Trusted expertise",
      title: "Why a CPA is the",
      titleEm: "smartest partner for your money",
      lede: "Find a CPA, learn financial literacy essentials, and see how the profession protects the public interest.",
      cta: "Find a CPA",
    },
    spotlight: {
      badge: "For the public",
      title: "Financial literacy & guidance",
      body: "Free resources to help Canadians and small businesses make confident financial decisions.",
      links: [
        { label: "Find a CPA near you", tag: "Directory" },
        { label: "Financial literacy resources", tag: "Free" },
        { label: "Small business toolkit", tag: "Guide" },
      ],
    },
    quickActions: [
      { icon: "🔍", title: "Find a CPA", desc: "Verified professionals near you" },
      { icon: "💡", title: "Financial literacy", desc: "Free guides & tools" },
      { icon: "🏢", title: "Small business", desc: "Start & grow with confidence" },
      { icon: "🛡️", title: "Public interest", desc: "How the profession protects you" },
    ],
  },
];

// ----- Top navigation (mega menus) -----
export interface NavGroup {
  label: string;
  items: { label: string; desc: string }[];
}

export const NAV: NavGroup[] = [
  {
    label: "Become a CPA",
    items: [
      { label: "Pathways to becoming a CPA", desc: "Routes for every background" },
      { label: "CPA certification program", desc: "The path to the designation" },
      { label: "Provincial & regional bodies", desc: "Your local CPA body" },
      { label: "International recognition", desc: "Bring your credentials to Canada" },
    ],
  },
  {
    label: "Membership",
    items: [
      { label: "Join CPA Canada", desc: "Member, affiliate & more" },
      { label: "Complimentary CPD", desc: "Free professional development" },
      { label: "Premier benefits", desc: "Savings & exclusive perks" },
      { label: "CPA Canada Handbook", desc: "Standards & guidance" },
    ],
  },
  {
    label: "Tax 360™",
    items: [
      { label: "Tax 360 Advantage", desc: "Exclusive tax intelligence" },
      { label: "In-Depth Tax Program", desc: "Canada's premier tax training" },
      { label: "AI & tax efficiency", desc: "Guidance and best practices" },
      { label: "Tax news & alerts", desc: "Timely updates" },
    ],
  },
  {
    label: "CPD & resources",
    items: [
      { label: "CPD catalogue", desc: "On-demand & live learning" },
      { label: "Financial reporting & assurance", desc: "Standards expertise" },
      { label: "Sustainability", desc: "Reporting & assurance trends" },
      { label: "Research & guides", desc: "Tools and publications" },
    ],
  },
  {
    label: "Thought leadership",
    items: [
      { label: "Pivot magazine", desc: "The new all-digital edition" },
      { label: "In the news", desc: "Latest from CPA Canada" },
      { label: "Data & technology", desc: "AI and the future of the profession" },
      { label: "Ethics & governance", desc: "Leading with integrity" },
    ],
  },
];

// ----- Focus areas -----
export const FOCUS = [
  { icon: "🤖", title: "Data & technology", accent: "var(--blue-500)", desc: "Stay ahead as AI and data reshape the profession and your clients' needs." },
  { icon: "⚖️", title: "Ethics & governance", accent: "var(--teal-500)", desc: "Champion transparency, accountability and integrity in everything you do." },
  { icon: "📊", title: "Financial reporting & assurance", accent: "var(--blue-600)", desc: "Maintain compliance and leverage the latest standards and trends." },
  { icon: "🛡️", title: "Public interest", accent: "var(--navy-700)", desc: "Foster public confidence through programs and sound public policy." },
  { icon: "🌱", title: "Sustainability", accent: "#2f9e44", desc: "Keep current on sustainability reporting, assurance and finance." },
  { icon: "🧾", title: "Tax", accent: "var(--amber-500)", desc: "Timely guidance and advocacy for an equitable, effective tax system." },
];

// ----- News ----- (thumbnails are real Unsplash photos)
const UNSPLASH = (id: string) => `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;
export const NEWS = [
  { cat: "Pivot Magazine", title: "The pressures shaking Canada's natural resource sector", desc: "Explore the fully interactive summer issue of the all-new digital Pivot.", meta: "Feature · Member access", feature: true, img: UNSPLASH("photo-1501594907352-04cda38ebc29") },
  { cat: "Leadership", title: "Why early board experience is crucial", desc: "Forward-thinkers use board service as a career accelerator.", meta: "5 min read", feature: false, img: UNSPLASH("photo-1497366216548-37526070297c") },
  { cat: "Global", title: "CPA Canada CEO joins global leaders at B7", desc: "On trust and interoperability for global financial stability.", meta: "News", feature: false, img: UNSPLASH("photo-1451187580459-43490279c0fa") },
  { cat: "Research", title: "Intergenerational wealth is reshaping homeownership", desc: "New study on how family money grants the privilege of homeownership.", meta: "Study", feature: false, img: UNSPLASH("photo-1568605114967-8130f3a36994") },
];

// ----- Search index (what the live search filters over) -----
export interface SearchDoc { title: string; tag: string; desc: string; keywords: string }
export const SEARCH_INDEX: SearchDoc[] = [
  { title: "Pathways to becoming a CPA", tag: "Become a CPA", desc: "Routes for university, transfer & international", keywords: "become cpa pathway path student designation certification how" },
  { title: "CPA certification program", tag: "Become a CPA", desc: "The program that leads to the CPA designation", keywords: "certification program pep cfe exam modules" },
  { title: "Complimentary CPD", tag: "Membership", desc: "Free, world-class professional development", keywords: "cpd professional development free learning courses hours" },
  { title: "CPA Canada Handbook", tag: "Standards", desc: "Complimentary access for all Canadian CPAs", keywords: "handbook standards assurance reporting frascanada guidance" },
  { title: "CPA Canada Tax 360™", tag: "Tax", desc: "Timely guidance and tax intelligence", keywords: "tax 360 advantage guidance gst hst returns" },
  { title: "In-Depth Tax Program 2026", tag: "Tax", desc: "Canada's most reputed tax training program", keywords: "in-depth tax program 2026 training register experts" },
  { title: "Join CPA Canada", tag: "Membership", desc: "Become a member and unlock benefits", keywords: "join membership member affiliate sign up benefits" },
  { title: "Find a CPA", tag: "Public", desc: "Search verified professionals near you", keywords: "find cpa directory accountant near me public hire" },
  { title: "Pivot magazine", tag: "Thought leadership", desc: "The new all-digital edition", keywords: "pivot magazine articles thought leadership digital" },
  { title: "Sustainability reporting", tag: "CPD & resources", desc: "Reporting, assurance and sustainable finance", keywords: "sustainability esg reporting assurance climate finance" },
  { title: "Pay an invoice", tag: "Membership", desc: "Manage dues and billing", keywords: "pay invoice billing dues fees account" },
  { title: "Premier benefits", tag: "Membership", desc: "Exclusive member savings & perks", keywords: "benefits perks savings discounts premier rewards" },
];

// ----- AI assistant knowledge base -----
// Intent matching is keyword-based for the prototype. In production this is
// backed by Claude with retrieval over CPA Canada's real content (see README).
export interface AiIntent { keys: string[]; reply: string }
export const AI_INTENTS: AiIntent[] = [
  {
    keys: ["become", "pathway", "path", "how do i become", "student", "start", "qualify"],
    reply:
      "Becoming a CPA in Canada usually looks like this:<ul><li><strong>1. Prerequisites</strong> — an undergraduate degree with specific subject coverage (we can check yours).</li><li><strong>2. CPA PEP</strong> — the graduate-level professional education program.</li><li><strong>3. CFE</strong> — the Common Final Examination.</li><li><strong>4. Practical experience</strong> — 30 months of relevant work.</li></ul>Want me to open the <a href='#'>Pathways</a> page or run the <a href='#'>prerequisite checker</a>?",
  },
  {
    keys: ["cpd", "professional development", "courses", "learning", "hours"],
    reply:
      "As a member you get <strong>complimentary CPD</strong> — a full catalogue of world-class, on-demand sessions included with your membership. You can filter by topic (tax, assurance, tech, ethics), track your hours automatically, and resume anytime. Want me to recommend courses based on your role?",
  },
  {
    keys: ["handbook", "standards", "assurance", "reporting standard"],
    reply:
      "The <strong>CPA Canada Handbook</strong> is your source for financial reporting and assurance standards, and it's <strong>complimentary for all Canadian CPAs</strong>. I can take you straight to the <a href='#'>Handbook access page</a>, or search a specific standard for you — which one?",
  },
  {
    keys: ["tax", "in-depth", "in depth", "tax 360", "gst", "hst"],
    reply:
      "On tax we have two big things:<ul><li><strong>CPA Canada Tax 360™</strong> — timely guidance, alerts and an AI & tax-efficiency series.</li><li><strong>In-Depth Tax Program 2026</strong> — Canada's most respected tax training, taught by 200+ experts.</li></ul>Are you looking to <a href='#'>learn tax</a> or get <a href='#'>guidance on a specific issue</a>?",
  },
  {
    keys: ["member", "membership", "join", "benefit", "dues", "fee", "invoice"],
    reply:
      "Membership gets you complimentary CPD, the CPA Canada Handbook, Tax 360™, re-investable credits and premier benefits. You can <a href='#'>join</a>, <a href='#'>renew</a>, or <a href='#'>pay an invoice</a> in a couple of clicks. Want a breakdown of what's included for your situation?",
  },
  {
    keys: ["find", "directory", "hire", "near me", "accountant"],
    reply:
      "I can help you <strong>find a verified CPA</strong> near you. Tell me your city and what you need help with (personal taxes, small business, audit, advisory) and I'll point you to the right professionals in the <a href='#'>directory</a>.",
  },
  {
    keys: ["pivot", "magazine", "news", "article"],
    reply:
      "The new <strong>all-digital Pivot magazine</strong> is live — the interactive summer issue digs into the pressures on Canada's natural resource sector. Want me to open the <a href='#'>latest issue</a> or the <a href='#'>In the news</a> feed?",
  },
  {
    keys: ["sustainability", "esg", "climate"],
    reply:
      "CPA Canada is active in <strong>sustainability</strong> standards and assurance, both in Canada and globally. We have research, guides and CPD on sustainability reporting and sustainable finance. Want the <a href='#'>resources hub</a> or upcoming <a href='#'>CPD sessions</a>?",
  },
];

export const AI_GREETING =
  "Hi! I'm the CPA Canada assistant. I can help you become a CPA, find CPD, navigate the Handbook, answer tax questions, or find a CPA. What brings you here today?";

export const AI_FALLBACK =
  "Great question. I can help with <strong>becoming a CPA</strong>, <strong>CPD</strong>, the <strong>Handbook</strong>, <strong>tax</strong>, <strong>membership</strong>, or <strong>finding a CPA</strong>. Could you tell me a little more about what you're looking for? (In production I'm powered by Claude with live access to CPA Canada's content.)";

export const AI_QUICK_REPLIES = [
  "How do I become a CPA?",
  "Show me free CPD",
  "Access the Handbook",
  "In-Depth Tax Program",
];
