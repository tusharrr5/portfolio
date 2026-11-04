import { faq } from "@/content/site";
import { SectionHead } from "@/components/SectionHead";
import { Plus } from "@/components/Icons";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-page pt-20 md:pt-28">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <SectionHead id="faq" index="05" label="FAQ" title="Questions people ask before we start." className="lg:mb-0 [&>div]:md:grid-cols-1" />
        <div className="space-y-3" data-reveal>
          {faq.map((item) => (
            <details key={item.q} className="card group px-5 transition-colors open:border-accent/40 md:px-6">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-4 text-[1rem] font-semibold transition-colors hover:text-accent md:text-[1.0625rem]">
                {item.q}
                <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center border border-line-strong text-accent transition-transform duration-200 motion-reduce:transition-none">
                  <Plus width={16} height={16} />
                </span>
              </summary>
              <p className="pb-5 text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
