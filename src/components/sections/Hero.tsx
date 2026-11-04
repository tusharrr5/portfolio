import Image from "next/image";
import { hero, person, settings } from "@/content/site";
import { LocalTime } from "@/components/LocalTime";
import { ArrowRight } from "@/components/Icons";
import { Highlight } from "@/lib/highlight";

export function Hero() {
  const panel = [
    { k: "status", v: settings.availability.status, tone: "text-ok" },
    { k: "based_in", v: `${person.location}`, tone: "" },
    { k: "local_time", v: <LocalTime suffix={false} />, tone: "" },
    { k: "reply_time", v: "Within 24 hours", tone: "" },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="dot-bg pointer-events-none absolute inset-0" />

      <div className="container-page relative grid gap-12 pt-10 pb-16 md:pt-20 md:pb-24 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
        <div>
          <p className="eyebrow">
            <span aria-hidden="true">{"//"}</span> {person.role} · {person.location}
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-[2.5rem] font-bold leading-[1.05] tracking-[-0.01em] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.1rem]"
          >
            <Highlight text={hero.headline} emphasis={hero.emphasis} />
          </h1>

          <p className="mt-6 max-w-[36rem] text-[1.0625rem] leading-relaxed text-muted md:text-[1.1875rem]">
            {hero.supporting}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={hero.primaryCta.href} className="btn btn-primary px-4 sm:px-6">
              {hero.primaryCta.label}
              <ArrowRight width={16} height={16} className="hidden sm:block" />
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-ghost px-4 sm:px-6">
              {hero.secondaryCta.label}
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[1.75rem] font-bold leading-none text-accent md:text-[2rem]">{s.value}</dd>
                <dd className="mt-2 text-[0.8125rem] leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {person.photo && (
          <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-none" data-reveal>
            {/* Soft orange + cyan glow, picking up the ring and icons in the portrait */}
            <div aria-hidden="true" className="portrait-glow pointer-events-none absolute -inset-6 sm:-inset-10" />
            <div className="card hud relative overflow-visible p-2.5">
              <div className="relative aspect-square overflow-hidden bg-surface-2">
                <Image
                  src={person.photo.src}
                  alt={person.photo.alt}
                  width={person.photo.width}
                  height={person.photo.height}
                  sizes="(min-width: 1024px) 26rem, 22rem"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-bg/75 px-2 py-1 font-mono text-[0.6875rem] tracking-[0.1em] text-accent">
                  ID · TB-2026
                </span>
              </div>
              <dl className="mt-2.5 divide-y divide-line border-t border-line font-mono text-[0.75rem]">
                {panel.map((row) => (
                  <div key={row.k} className="flex items-center justify-between gap-4 px-1.5 py-2">
                    <dt className="text-muted">{row.k}</dt>
                    <dd className={`text-right ${row.tone || "text-fg"}`}>{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
