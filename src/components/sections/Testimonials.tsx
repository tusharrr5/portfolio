import { testimonials } from "@/content/site";
import { SectionHead } from "@/components/SectionHead";

/** Renders nothing until you add real testimonials in src/content/site.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="proof" aria-labelledby="proof-title" className="container-page pt-20 md:pt-28">
      <SectionHead id="proof" index="06" label="Kind words" title="What clients said." />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="card p-6 md:p-8" data-reveal>
            <blockquote className="text-[1.125rem] leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-5 text-[0.9375rem]">
              {t.link ? (
                <a href={t.link} className="font-semibold text-fg hover:text-accent" target="_blank" rel="noopener noreferrer">
                  {t.name}
                </a>
              ) : (
                <span className="font-semibold">{t.name}</span>
              )}
              <span className="text-muted"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
