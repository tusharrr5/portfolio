import { services } from "@/content/site";
import { formatPrice } from "@/lib/content";
import { SectionHead } from "@/components/SectionHead";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="container-page pt-20 md:pt-32">
      <SectionHead
        id="services"
        index="02"
        label="Services"
        title="What I can build for you."
        intro="Three starting points. Every project gets a written scope, so you know the price and the date before anything starts."
      />
      <div className="grid md:grid-cols-3">
        {services.map((s, i) => {
          const price = formatPrice(s);
          return (
            <article
              key={s.name}
              aria-labelledby={`service-${i}`}
              className="flex flex-col border-t border-line py-8 md:border-t-0 md:border-l md:px-6 md:py-2 md:first:border-l-0 md:first:pl-0 lg:px-8 md:last:pr-0"
              data-reveal
            >
              <p className="label">{String(i + 1).padStart(2, "0")}</p>
              <h3 id={`service-${i}`} className="mt-3 font-serif text-[2rem] leading-[1.05]">
                {s.name}
              </h3>
              <p className="mt-4">
                <span className="label mr-2 !text-accent">Good for</span>
                <span className="text-muted">{s.goodFor}</span>
              </p>
              <ul className="mt-6 space-y-2.5 text-[0.9875rem]">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 md:mt-auto md:pt-8">
                <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4">
                  <div>
                    <dt className="label">Typical timeline</dt>
                    <dd className="mt-1 text-[0.9375rem]">{s.timeline}</dd>
                  </div>
                  {price && (
                    <div>
                      <dt className="label">Price</dt>
                      <dd className="mt-1 text-[0.9375rem]">{price}</dd>
                    </div>
                  )}
                </dl>
                <a
                  href="#contact"
                  data-service={s.projectType}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium text-accent link-underline"
                >
                  Ask about this <span aria-hidden="true">→</span>
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
