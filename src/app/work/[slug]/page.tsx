import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProjects, getProject } from "@/lib/content";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectLinks } from "@/components/ProjectLinks";
import { StackList } from "@/components/StackList";
import { ArrowLeft, ArrowRight, Check } from "@/components/Icons";

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
    <section className="grid gap-3 border-t border-line py-8 md:grid-cols-[12rem_1fr] md:gap-10 md:py-10" data-reveal>
      <h2 className="eyebrow self-start pt-1">{label}</h2>
      <div className="max-w-[42rem] text-[1.0625rem] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check width={16} height={16} className="mt-1.5 shrink-0 text-accent" />
          <span className="text-fg/90">{item}</span>
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
    <article className="container-page pt-8 md:pt-14">
      <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-muted transition-colors hover:text-fg">
        <ArrowLeft width={16} height={16} /> All work
      </Link>

      <header className="mt-6 max-w-3xl md:mt-8">
        <div className="flex flex-wrap items-center gap-2">
          {project.badges.map((b) => (
            <span key={b} className="pill">
              {b}
            </span>
          ))}
          <span className="ml-1 font-mono text-[0.75rem] text-muted">
            {project.kind} · {project.year}
          </span>
        </div>
        <h1 className="mt-5 text-[2.75rem] font-bold leading-[1.05] md:text-[4rem]">
          {project.name}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-5 text-[1.125rem] leading-relaxed text-muted md:text-[1.25rem]">{project.outcome}</p>
        <div className="mt-7">
          <ProjectLinks project={project} showCaseStudy={false} />
        </div>
      </header>

      <div className="mt-10 md:mt-14">
        <ProjectMedia project={project} priority sizes="(min-width: 1152px) 1088px, 100vw" />
      </div>

      <div className="mt-12 md:mt-16">
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
        className="card hud mt-8 flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-10"
      >
        <p className="font-display text-[1.75rem] font-bold leading-tight md:text-[2.25rem]">
          Need something like this <span className="text-accent">for your business?</span>
        </p>
        <Link href="/#contact" className="btn btn-primary shrink-0">
          Start a project <ArrowRight />
        </Link>
      </aside>

      {next && next.slug !== project.slug && (
        <nav aria-label="Next project" className="py-10 md:py-14">
          <Link href={`/work/${next.slug}/`} className="group flex items-center justify-between gap-4 border-t border-line pt-8">
            <span>
              <span className="mono-label block">Next project</span>
              <span className="mt-2 block font-display text-[1.75rem] font-bold transition-colors group-hover:text-accent md:text-[2.25rem]">
                {next.name}
              </span>
            </span>
            <span className="grid h-12 w-12 shrink-0 place-items-center border border-line-strong text-accent transition-transform group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
