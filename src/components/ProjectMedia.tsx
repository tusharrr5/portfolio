import Image from "next/image";
import type { Project } from "@/content/site";

type Props = { project: Project; priority?: boolean; sizes?: string };

/** 16:10 screenshot frame. Shows a clearly marked placeholder until a screenshot is added. */
export function ProjectMedia({ project, priority, sizes = "(min-width: 768px) 58vw, 100vw" }: Props) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] border border-line bg-paper-2">
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
      ) : project.highlights?.length ? (
        // No screenshot (e.g. runs locally only): a typeset spec panel instead.
        <div className="absolute inset-0 flex flex-col justify-between bg-ink p-4 text-paper md:p-7">
          <span className="font-mono text-[0.75rem] uppercase tracking-[0.06em] text-[#a9a397]">
            {project.kind}
          </span>
          <span className="font-serif text-[2.75rem] leading-none md:text-[4.5rem]">
            {project.name}
            <span className="text-[#e8714f]">.</span>
          </span>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 border-t border-[#3a3833] pt-3 font-mono text-[0.75rem] text-[#a9a397] md:text-[0.8125rem]">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6" role="img" aria-label={`Screenshot of ${project.name} coming soon`}>
          <span className="label">[ADD SCREENSHOT]</span>
          <span className="font-serif text-[2rem] leading-none text-muted md:text-[3rem]">
            {project.name}
          </span>
          <span className="label break-all normal-case tracking-normal">
            images-src/work/{project.slug}.png
          </span>
        </div>
      )}
    </div>
  );
}
