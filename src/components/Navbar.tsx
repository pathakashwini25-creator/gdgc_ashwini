"use client";

import { useEffect, useState } from "react";

import { navLinks, profile } from "@/data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const section of sections) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 px-3 py-2 shadow-[0_8px_30px_rgb(255,255,255,0.04)] backdrop-blur-xl transition-colors duration-500 sm:px-4 ${
          scrolled ? "bg-black/70" : "bg-black/30"
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-full pl-1 pr-2 transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] font-display text-sm font-medium text-paper transition-colors group-hover:border-white/30">
            {profile.name.charAt(0)}
          </span>
          <span className="font-display text-[0.8rem] font-medium uppercase tracking-[0.28em] text-paper">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    isActive
                      ? "text-paper"
                      : "text-paper/55 hover:text-paper"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5 sm:px-5"
        >
          <span className="hidden sm:inline">Let&apos;s talk</span>
          <span className="sm:hidden">Talk</span>
          <span aria-hidden="true">→</span>
        </a>
      </nav>
    </header>
  );
}
