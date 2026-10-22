import type { Project } from "@/data/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col justify-between p-8">
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-xs tracking-[0.3em] text-mute">
            {project.index}
          </span>
          <span className="font-display text-xs tracking-[0.2em] text-mute">
            {project.year}
          </span>
        </div>

        <p className="mt-12 font-display text-[0.68rem] uppercase tracking-[0.32em] text-mute">
          {project.category}
        </p>

        <h3 className="mt-4 font-display text-3xl font-medium leading-[1.05] tracking-[-0.025em] text-paper">
          {project.title}
        </h3>

        <p className="mt-5 text-sm leading-relaxed text-paper/60">
          {project.summary}
        </p>
      </div>

      <div className="mt-14">
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-paper/70"
            >
              {item}
            </li>
          ))}
        </ul>

        <a
          href={project.href}
          className="mt-8 inline-flex items-center gap-2 text-sm text-paper transition-colors duration-300 hover:text-mute"
        >
          View case study
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </div>
    </article>
  );
}
