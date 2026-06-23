import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "CPA Canada — Redesign Prototype",
  description:
    "A working prototype of an improved CPA Canada homepage: audience personalization, an AI assistant, fast performance, and a cleaner information architecture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
