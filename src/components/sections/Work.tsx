import Link from "next/link";
import type { Project } from "@/content/site";
import { featuredProjects } from "@/lib/content";
import { SectionHead } from "@/components/SectionHead";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectLinks } from "@/components/ProjectLinks";
import { StackList } from "@/components/StackList";

function Meta({ p, i }: { p: Project; i: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[0.75rem] text-accent">[{String(i + 1).padStart(2, "0")}]</span>
      {p.badges.map((b) => (
        <span key={b} className="pill">
          {b}
        </span>
      ))}
    </div>
  );
}

function MediaLink({ p, sizes }: { p: Project; sizes?: string }) {
  return (
    <Link href={`/work/${p.slug}/`} tabIndex={-1} aria-hidden="true" className="block">
      <ProjectMedia project={p} sizes={sizes} />
    </Link>
  );
}

export function Work() {
  const [first, ...rest] = featuredProjects;
  return (
    <section id="work" aria-labelledby="work-title" className="container-page pt-20 md:pt-28">
      <SectionHead
        id="work"
        index="01"
        label="Selected work"
        title="Real projects, and exactly which part was mine."
        emphasis="which part was mine."
        intro="All the code is public. Each project has a short case study, and a live link where there is one."
      />

      {first && (
        <article
          aria-labelledby={`project-${first.slug}`}
          className="card hud grid grid-cols-[minmax(0,1fr)] gap-8 p-5 md:p-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12 lg:p-10"
          data-reveal
        >
          <div>
            <Meta p={first} i={0} />
            <h3 id={`project-${first.slug}`} className="mt-4 text-[2rem] font-bold leading-tight md:text-[2.5rem]">
              {first.name}
            </h3>
            <p className="mt-3 text-[1.0625rem] leading-relaxed">{first.outcome}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{first.built}</p>
            <div className="mt-5">
              <StackList items={first.stack} />
            </div>
            <div className="mt-6">
              <ProjectLinks project={first} />
            </div>
          </div>
          <MediaLink p={first} />
        </article>
      )}

      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-5 md:mt-6 md:gap-6 lg:grid-cols-2">
        {rest.map((p, j) => (
          <article
            key={p.slug}
            aria-labelledby={`project-${p.slug}`}
            className="card flex flex-col p-5 md:p-7"
            data-reveal
          >
            <MediaLink p={p} sizes="(min-width: 1024px) 34rem, 100vw" />
            <div className="mt-6 flex flex-1 flex-col">
              <Meta p={p} i={j + 1} />
              <h3 id={`project-${p.slug}`} className="mt-4 text-[1.75rem] font-bold leading-tight md:text-[2rem]">
                {p.name}
              </h3>
              <p className="mt-3 text-[1.0625rem] leading-relaxed">{p.outcome}</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{p.built}</p>
              <div className="mt-5">
                <StackList items={p.stack} />
              </div>
              <div className="mt-6 lg:mt-auto lg:pt-6">
                <ProjectLinks project={p} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
