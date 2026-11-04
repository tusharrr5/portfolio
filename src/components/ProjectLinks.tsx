import Link from "next/link";
import type { Project } from "@/content/site";
import { isPlaceholder } from "@/lib/content";

type Props = { project: Project; showCaseStudy?: boolean };

export function ProjectLinks({ project, showCaseStudy = true }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {showCaseStudy && (
        <Link href={`/work/${project.slug}/`} className="btn btn-primary btn-sm">
          Case study
          <span className="sr-only">: {project.name}</span>
        </Link>
      )}
      {project.live === null ? null : isPlaceholder(project.live) ? (
        <span className="placeholder-chip">{project.live || "[ADD LIVE URL]"}</span>
      ) : (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          Live site<span aria-hidden="true">↗</span>
          <span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
      )}
      {isPlaceholder(project.code) ? (
        <span className="placeholder-chip">{project.code || "[ADD REPO URL]"}</span>
      ) : (
        <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
          {project.codeLabel ?? "Code"}
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
