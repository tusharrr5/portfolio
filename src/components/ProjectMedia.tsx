import Image from "next/image";
import type { Project } from "@/content/site";

type Props = { project: Project; priority?: boolean; sizes?: string };

function hostOf(p: Project) {
  const url = p.live ?? p.code;
  try {
    const u = new URL(url);
    return (u.host + u.pathname).replace(/\/$/, "");
  } catch {
    return p.slug;
  }
}

/** Screenshot (or a typeset panel) in a square window frame with a mono address bar. */
export function ProjectMedia({ project, priority, sizes = "(min-width: 1024px) 40rem, 100vw" }: Props) {
  return (
    <div className="overflow-hidden rounded-[3px] border border-line-strong bg-surface-2">
      <div className="flex h-8 items-center gap-3 border-b border-line bg-bg/40 px-3">
        <span className="h-2 w-2 bg-warm" aria-hidden="true" />
        <span className="min-w-0 truncate font-mono text-[0.6875rem] text-muted">{hostOf(project)}</span>
      </div>
      <div className="relative aspect-[16/10]">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={1920}
            height={1200}
            sizes={sizes}
            priority={priority}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,rgb(46_230_230/0.10),transparent_45%),linear-gradient(315deg,rgb(255_92_184/0.10),transparent_45%)] p-5 md:p-7">
            <div aria-hidden="true" className="dot-bg absolute inset-0 opacity-60" />
            <span className="mono-label relative">{project.kind}</span>
            <span className="relative font-display text-[2.5rem] font-bold leading-none md:text-[3.25rem]">
              {project.name}
              <span className="text-accent">_</span>
            </span>
            <ul className="relative hidden flex-wrap gap-2 sm:flex">
              {(project.highlights ?? []).map((h) => (
                <li key={h} className="border border-line-strong bg-bg/60 px-2.5 py-1 font-mono text-[0.6875rem] text-muted">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
