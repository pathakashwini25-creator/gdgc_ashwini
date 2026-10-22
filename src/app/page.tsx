import type { Metadata } from "next";

import HeroCanvas from "@/components/HeroCanvas";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import SpotlightCard from "@/components/SpotlightCard";
import {
  capabilities,
  profile,
  projects,
  socials,
  stats,
} from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.summary,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <Navbar />

      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>

      <footer className="px-6 pb-12 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[0.7rem] uppercase tracking-[0.28em] text-mute">
            {profile.name} — {profile.role}
          </p>
          <p className="text-xs text-mute">
            © {profile.copyrightYear} {profile.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen flex-col overflow-hidden px-6 pb-12 pt-32 lg:px-10 lg:pb-16"
    >
      {/* Mount point for the procedural 3D canvas */}
      <div
        aria-hidden="true"
        data-slot="canvas-3d"
        className="absolute inset-0 -z-10 h-screen w-full"
      >
        <HeroCanvas />
      </div>

      {/* Structural hairline grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 grid-overlay opacity-[0.06]"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between gap-16">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-b border-white/10 pb-5">
          <p className="flex items-center gap-3 font-display text-[0.68rem] uppercase tracking-[0.38em] text-mute">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-paper"
            />
            {profile.availability}
          </p>
          <p className="font-display text-[0.68rem] uppercase tracking-[0.38em] text-mute">
            {profile.location}
          </p>
        </div>

        <h1 className="font-display text-[clamp(4rem,14vw,13rem)] font-medium leading-[0.82] tracking-[-0.055em] text-paper">
          {profile.name}
          <span className="text-mute">.</span>
        </h1>

        <div className="grid gap-10 border-t border-white/10 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16">
          <div className="max-w-xl">
            <p className="font-display text-[0.72rem] uppercase tracking-[0.32em] text-mute">
              {profile.role}
            </p>
            <p className="mt-5 text-base leading-relaxed text-paper/70 md:text-lg">
              {profile.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              View work
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm text-paper/80 transition-colors duration-300 hover:border-white/40 hover:text-paper"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="work" className="scroll-mt-28 px-6 py-32 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div>
            <p className="font-display text-[0.68rem] uppercase tracking-[0.38em] text-mute">
              Selected work
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[0.9] tracking-[-0.045em] text-paper">
              Projects
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mute">
            Three builds that define how I think about interface, motion and
            performance.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <SpotlightCard
              key={project.id}
              className="border border-white/10 bg-ink-raised shadow-[0_8px_30px_rgb(255,255,255,0.04)] transition-colors duration-500 hover:border-white/25 hover:bg-ink-hover"
            >
              <ProjectCard project={project} />
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-28 px-6 py-32 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <p className="font-display text-[0.68rem] uppercase tracking-[0.38em] text-mute">
            About
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.04em] text-paper">
            Engineering calm, dependable interfaces.
          </h2>
        </div>

        <div>
          <p className="text-lg leading-relaxed text-paper/75">{profile.bio}</p>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-ink p-6">
                <dt className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-mute">
                  {stat.label}
                </dt>
                <dd className="mt-3 font-display text-3xl font-medium tracking-[-0.02em] text-paper">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-12 flex flex-wrap gap-2">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-paper/70"
              >
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 px-6 py-32 lg:px-10">
      <div className="mx-auto w-full max-w-7xl rounded-3xl border border-white/10 bg-ink-raised p-10 shadow-[0_8px_30px_rgb(255,255,255,0.04)] lg:p-20">
        <p className="font-display text-[0.68rem] uppercase tracking-[0.38em] text-mute">
          Contact
        </p>

        <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.045em] text-paper">
          Let&apos;s build something{" "}
          <span className="text-mute">durable.</span>
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-white/10 pt-10">
          <a
            href={`mailto:${profile.email}`}
            className="font-display text-lg tracking-tight text-paper transition-colors duration-300 hover:text-mute md:text-2xl"
          >
            {profile.email}
          </a>

          <ul className="flex flex-wrap gap-6">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-paper/60 transition-colors duration-300 hover:text-paper"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
