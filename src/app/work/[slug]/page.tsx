import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProjects, getProject } from "@/lib/content";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectLinks } from "@/components/ProjectLinks";
import { StackList } from "@/components/StackList";

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = `${project.kind}. ${project.outcome}`;
  return {
    title: `${project.name} case study`,
    description,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: { title: `${project.name} case study`, description, url: `/work/${project.slug}/` },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10" data-reveal>
      <h2 className="label pt-1 !text-ink md:col-span-3">{label}</h2>
      <div className="max-w-[40rem] text-[1.0625rem] leading-relaxed md:col-span-9 md:text-[1.125rem]">
        {children}
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = featuredProjects.findIndex((p) => p.slug === project.slug);
  const next = featuredProjects[(index + 1) % featuredProjects.length];
  const cs = project.caseStudy;

  return (
    <article className="container-page pt-8 md:pt-16">
      <Link href="/#work" className="label inline-flex min-h-11 items-center gap-2 hover:!text-ink">
        <span aria-hidden="true">←</span> All work
      </Link>

      <header className="mt-6 md:mt-10">
        <p className="label">
          Case study · {project.kind} · {project.year}
        </p>
        <h1 className="mt-4 max-w-[16ch] font-serif text-[3rem] leading-[0.98] tracking-[-0.015em] md:text-[5rem] lg:text-[6rem]">
          {project.name}
        </h1>
        <p className="mt-6 max-w-[38rem] text-[1.125rem] leading-relaxed text-muted md:text-[1.25rem]">
          {project.outcome}
        </p>
        <div className="mt-8">
          <ProjectLinks project={project} showCaseStudy={false} />
        </div>
      </header>

      <div className="mt-10 md:mt-14">
        <ProjectMedia project={project} priority sizes="(min-width: 1216px) 1136px, 100vw" />
      </div>

      <div className="mt-12 md:mt-20">
        <Block label="The problem">
          <p>{cs.problem}</p>
        </Block>
        <Block label="What I built">
          <List items={cs.whatIBuilt} />
        </Block>
        <Block label="How">
          <List items={cs.how} />
        </Block>
        <Block label="Result">
          <p>{cs.result}</p>
        </Block>
        <Block label="What I learned">
          <p>{cs.learned}</p>
        </Block>
        <Block label="Stack">
          <StackList items={project.stack} />
        </Block>
      </div>

      <aside
        aria-label="Start a project"
        className="mt-6 grid gap-6 border-t border-ink py-12 md:grid-cols-12 md:items-end md:py-16"
      >
        <p className="font-serif text-[2.25rem] leading-[1.05] md:col-span-8 md:text-[3.25rem]">
          Need something like this for your business?
        </p>
        <div className="md:col-span-4 md:justify-self-end">
          <Link href="/#contact" className="btn btn-primary">
            Start a project
          </Link>
        </div>
      </aside>

      {next && next.slug !== project.slug && (
        <nav aria-label="Next project" className="border-t border-line py-8 md:py-10">
          <Link href={`/work/${next.slug}/`} className="group flex items-baseline justify-between gap-4">
            <span>
              <span className="label block">Next project</span>
              <span className="mt-2 block font-serif text-[2rem] leading-tight transition-colors group-hover:text-accent md:text-[2.5rem]">
                {next.name}
              </span>
            </span>
            <span aria-hidden="true" className="font-mono text-[1.25rem] text-accent">→</span>
          </Link>
        </nav>
      )}
    </article>
  );
}
