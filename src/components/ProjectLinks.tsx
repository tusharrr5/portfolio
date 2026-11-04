import Link from "next/link";
import type { Project } from "@/content/site";
import { isPlaceholder } from "@/lib/content";
import { ArrowRight, ArrowUpRight, Github } from "@/components/Icons";

type Props = { project: Project; showCaseStudy?: boolean };

export function ProjectLinks({ project, showCaseStudy = true }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {showCaseStudy && (
        <Link href={`/work/${project.slug}/`} className="btn btn-primary btn-sm">
          Read case study
          <span className="sr-only">: {project.name}</span>
          <ArrowRight width={16} height={16} />
        </Link>
      )}
      {project.live && !isPlaceholder(project.live) && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-link">
          Live site <ArrowUpRight width={16} height={16} />
          <span className="sr-only"> for {project.name} (opens in a new tab)</span>
        </a>
      )}
      {!isPlaceholder(project.code) && (
        <a href={project.code} target="_blank" rel="noopener noreferrer" className="text-link">
          {project.codeLabel ?? "Code"} <Github width={16} height={16} />
          <span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
