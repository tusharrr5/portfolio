import { services } from "@/content/site";
import { formatPrice } from "@/lib/content";
import { SectionHead } from "@/components/SectionHead";
import { ArrowRight, Check } from "@/components/Icons";

/** Index of the plan to highlight. Set to -1 for none. */
const HIGHLIGHT = 1;

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="container-page pt-20 md:pt-28">
      <SectionHead
        id="services"
        index="02"
        label="Services"
        title="Pick a starting point for your business."
        emphasis="your business."
        intro="Every project gets a written scope, so you know the price and the date before anything starts."
      />
      <div className="grid gap-5 md:grid-cols-3 md:items-stretch">
        {services.map((s, i) => {
          const price = formatPrice(s);
          const hot = i === HIGHLIGHT;
          return (
            <article
              key={s.name}
              aria-labelledby={`service-${i}`}
              className={`card flex flex-col p-6 md:p-7 ${hot ? "hud border-accent/50 bg-surface-2" : ""}`}
              data-reveal
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[0.75rem] text-accent">[{String(i + 1).padStart(2, "0")}]</p>
                {hot && <span className="pill">Recommended</span>}
              </div>
              <h3 id={`service-${i}`} className="mt-4 text-[1.5rem] font-bold leading-tight">
                {s.name}
              </h3>
              {price && (
                <p className="mt-3 font-display text-[1.75rem] font-bold leading-none text-accent">
                  {price}
                </p>
              )}
              <p className="mt-2 font-mono text-[0.75rem] text-muted">Typical timeline: {s.timeline}</p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{s.goodFor}</p>

              <ul className="mt-6 space-y-3 border-t border-line pt-6 text-[0.9375rem]">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check width={16} height={16} className="mt-1 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 md:mt-auto md:pt-8">
                <a
                  href="#contact"
                  data-service={s.projectType}
                  className={`btn btn-sm w-full ${hot ? "btn-primary" : "btn-ghost"}`}
                >
                  Ask about this <ArrowRight width={15} height={15} />
                  <span className="sr-only">: {s.name}</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
