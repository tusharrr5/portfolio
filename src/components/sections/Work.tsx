import Link from "next/link";
import { featuredProjects } from "@/lib/content";
import { SectionHead } from "@/components/SectionHead";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectLinks } from "@/components/ProjectLinks";
import { StackList } from "@/components/StackList";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="container-page pt-20 md:pt-32">
      <SectionHead
        id="work"
        index="01"
        label="Selected work"
        title="What I built, and exactly which part was mine."
        intro="The code is public for all of them. Each has a short write-up of what I built and why, and a live link where there is one."
      />
      <div>
        {featuredProjects.map((p, i) => (
          <article
            key={p.slug}
            aria-labelledby={`project-${p.slug}`}
            className="grid gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-10 md:py-14"
            data-reveal
          >
            <Link
              href={`/work/${p.slug}/`}
              className="group block md:col-span-7"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="transition-opacity duration-200 group-hover:opacity-90">
                <ProjectMedia project={p} />
              </div>
            </Link>
            <div className="flex flex-col md:col-span-5">
              <p className="label">
                {String(i + 1).padStart(2, "0")} · {p.kind}
              </p>
              <h3 id={`project-${p.slug}`} className="mt-3 font-serif text-[2rem] leading-[1.05] md:text-[2.5rem]">
                <Link href={`/work/${p.slug}/`} className="hover:text-accent transition-colors">
                  {p.name}
                </Link>
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-snug md:text-[1.125rem]">{p.outcome}</p>
              <p className="mt-3 text-muted">{p.built}</p>
              <div className="mt-5">
                <StackList items={p.stack} />
              </div>
              <div className="mt-6 md:mt-auto md:pt-8">
                <ProjectLinks project={p} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
