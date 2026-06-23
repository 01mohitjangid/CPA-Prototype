// Minimal inline SVG icon set (stroke-based, inherits currentColor).
import type { ReactNode } from "react";
type P = { size?: number };

export const SearchIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);

export const SunIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const MenuIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const CloseIcon = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const SendIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
  </svg>
);

export const SparkIcon = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l1.8 5.5L19 9l-5.2 1.5L12 16l-1.8-5.5L5 9l5.2-1.5L12 2Z" /><circle cx="19" cy="17" r="1.6" /><circle cx="5.5" cy="16.5" r="1.2" />
  </svg>
);

const stroke = (size: number, children: ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);

export const CompassIcon = ({ size = 20 }: P) => stroke(size, <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>);
export const PencilIcon = ({ size = 20 }: P) => stroke(size, <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" /></>);
export const TargetIcon = ({ size = 20 }: P) => stroke(size, <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></>);
export const NewChatIcon = ({ size = 20 }: P) => stroke(size, <><path d="M21 11.5a8 8 0 0 1-11.6 7.1L4 20l1.4-5.4A8 8 0 1 1 21 11.5Z" /><path d="M12 8v6M9 11h6" /></>);
export const MinimizeIcon = ({ size = 20 }: P) => stroke(size, <path d="M5 12h14" />);
export const ArrowUpIcon = ({ size = 20 }: P) => stroke(size, <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>);
export const ChevronDownIcon = ({ size = 16 }: P) => stroke(size, <path d="m6 9 6 6 6-6" />);
