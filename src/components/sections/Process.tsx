import { processSteps } from "@/content/site";
import { SectionHead } from "@/components/SectionHead";

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="container-page pt-20 md:pt-32">
      <SectionHead
        id="process"
        index="03"
        label="Process"
        title="Four steps, and you see progress from week one."
      />
      <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <li key={step.name} className="border-t border-line py-6 lg:py-8" data-reveal>
            <span className="font-serif text-[3rem] leading-none text-accent" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="mt-4 text-[1.125rem] font-semibold">
              <span className="sr-only">Step {i + 1}: </span>
              {step.name}
            </h3>
            <p className="mt-2 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
