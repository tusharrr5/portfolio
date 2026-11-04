import { hero, person, settings } from "@/content/site";
import { LocalTime } from "@/components/LocalTime";

function Headline() {
  const { headline, emphasis } = hero;
  const i = emphasis ? headline.indexOf(emphasis) : -1;
  if (i < 0) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, i)}
      <em className="text-accent">{emphasis}</em>
      {headline.slice(i + emphasis.length)}
    </>
  );
}

export function Hero() {
  const { status, replyTime } = settings.availability;
  return (
    <section aria-labelledby="hero-title" className="container-page">
      <div className="grid min-h-[calc(100dvh-var(--header-h)-64px)] content-center gap-12 pt-8 pb-10 md:min-h-0 md:pt-24 md:pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-28">
        <div className="lg:col-span-8">
          <p className="label">
            {person.role} · {person.location}
          </p>

          <h1
            id="hero-title"
            className="mt-5 max-w-[15ch] font-serif text-[2.875rem] leading-[0.98] tracking-[-0.015em] sm:text-[3.5rem] md:mt-6 md:text-[5rem] lg:text-[5.25rem] xl:text-[6.25rem]"
          >
            <Headline />
          </h1>

          <p className="mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-muted md:mt-8 md:text-[1.25rem]">
            {hero.supporting}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-ghost">
              {hero.secondaryCta.label}
            </a>
          </div>

          <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.75rem] leading-relaxed text-muted md:text-[0.8125rem]">
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-ink">
              <span className="h-2 w-2 shrink-0 rounded-full bg-ok" aria-hidden="true" />
              {status}
            </span>
            <span className="whitespace-nowrap">
              <span aria-hidden="true" className="hidden sm:inline">· </span>
              {replyTime} · <LocalTime />
            </span>
          </p>
        </div>

        <aside aria-label="Quick facts" className="hidden lg:col-span-4 lg:block lg:self-end">
          <dl className="border-t border-ink">
            {hero.facts.map((f) => (
              <div key={f.label} className="border-b border-line py-4">
                <dt className="label">{f.label}</dt>
                <dd className="mt-1">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <dl className="grid border-t border-line sm:grid-cols-3 lg:hidden" data-reveal>
        {hero.facts.map((f) => (
          <div
            key={f.label}
            className="flex items-baseline justify-between gap-4 border-b border-line py-3 sm:block sm:border-b-0 sm:border-l sm:py-5 sm:pl-5 sm:first:border-l-0 sm:first:pl-0"
          >
            <dt className="label">{f.label}</dt>
            <dd className="text-right text-[0.9375rem] sm:mt-1 sm:text-left">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
