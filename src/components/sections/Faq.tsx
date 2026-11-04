import { faq } from "@/content/site";
import { SectionHead } from "@/components/SectionHead";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-page pt-20 md:pt-32">
      <SectionHead id="faq" index="06" label="FAQ" title="Questions people ask before we start." />
      <div className="grid md:grid-cols-12">
        <div className="border-t border-line md:col-span-8 md:col-start-5">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-4 text-[1.0625rem] font-medium transition-colors hover:text-accent md:text-[1.1875rem]">
                {item.q}
                <span
                  aria-hidden="true"
                  className="faq-icon font-mono text-[1.25rem] leading-none text-accent transition-transform duration-200 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[38rem] pb-6 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
