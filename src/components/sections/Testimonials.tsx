import { testimonials } from "@/content/site";
import { SectionHead } from "@/components/SectionHead";

/** Renders nothing until you add real testimonials in src/content/site.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="proof" aria-labelledby="proof-title" className="container-page pt-20 md:pt-32">
      <SectionHead id="proof" index="05" label="Kind words" title="What clients said." />
      <div className="grid gap-x-10 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="border-t border-line py-8" data-reveal>
            <blockquote className="font-serif text-[1.625rem] leading-snug md:text-[2rem]">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 text-[0.9375rem]">
              {t.link ? (
                <a href={t.link} className="font-medium link-underline" target="_blank" rel="noopener noreferrer">
                  {t.name}
                </a>
              ) : (
                <span className="font-medium">{t.name}</span>
              )}
              <span className="text-muted"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
