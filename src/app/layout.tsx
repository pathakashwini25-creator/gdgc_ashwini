import type { Metadata, Viewport } from "next";
import { Albert_Sans, Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-albert",
});

export const metadata: Metadata = {
  title: {
    default: "Alex — Frontend Engineer",
    template: "%s — Alex",
  },
  description:
    "Frontend engineer crafting fast, calm interfaces for ambitious product teams.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${albertSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink font-sans text-paper">{children}</body>
    </html>
  );
}
