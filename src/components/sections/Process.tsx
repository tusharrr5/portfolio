import { processSteps } from "@/content/site";
import { SectionHead } from "@/components/SectionHead";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="container-page pt-20 md:pt-28">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <SectionHead
            id="process"
            index="03"
            label="Process"
            title="Four steps. Progress you can see from week one."
            emphasis="from week one."
            className="lg:mb-0 [&>div]:md:grid-cols-1"
          />
        </div>
        <ol className="relative border-l border-line-strong pl-8 md:pl-10">
          {processSteps.map((step, i) => (
            <li key={step.name} className="relative pb-10 last:pb-0" data-reveal>
              <span
                aria-hidden="true"
                className="absolute top-1 -left-[calc(2rem+7px)] grid h-[14px] w-[14px] place-items-center border border-accent bg-bg md:-left-[calc(2.5rem+7px)]"
              >
                <span className="h-1.5 w-1.5 bg-accent" />
              </span>
              <p className="font-mono text-[0.75rem] text-accent">STEP 0{i + 1}</p>
              <h3 className="mt-1.5 text-[1.5rem] font-bold">{step.name}</h3>
              <p className="mt-2 max-w-lg leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
