import { about, person, settings, stack } from "@/content/site";
import { SectionHead } from "@/components/SectionHead";
import { StackList } from "@/components/StackList";

export function About() {
  const facts: [string, string][] = [
    ["name", person.name],
    ["based_in", `${person.location} (${person.timezoneLabel})`],
    ["studying", `${person.education.degree}, ${person.education.school}`],
    ["batch", person.education.years],
    ["community", "AWS Student Builder campus leader"],
    ["freelance", settings.availability.status],
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="container-page pt-20 md:pt-28">
      <SectionHead id="about" index="04" label="About" title={about.heading} />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div className="space-y-4 text-[1.0625rem] leading-relaxed text-muted" data-reveal>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <div className="card hud self-start overflow-hidden" data-reveal>
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="h-2 w-2 bg-warm" aria-hidden="true" />
            <span className="font-mono text-[0.75rem] text-muted">about.json</span>
          </div>
          <dl className="space-y-2 p-4 font-mono text-[0.8125rem] leading-relaxed md:p-5">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3">
                <dt className="text-accent">{k}</dt>
                <dd className="text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
        {Object.entries(stack).map(([group, items]) => (
          <div key={group}>
            <h3 className="mono-label !text-[0.6875rem] font-normal">{group}</h3>
            <div className="mt-3">
              <StackList items={items} label={group} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
