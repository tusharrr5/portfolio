import Image from "next/image";
import { about, person, stack } from "@/content/site";
import { SectionHead } from "@/components/SectionHead";
import { StackList } from "@/components/StackList";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-page pt-20 md:pt-32">
      <SectionHead id="about" index="04" label="About" title={about.heading} />
      <div className="grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4" data-reveal>
          <div className="relative aspect-[4/5] max-w-[22rem] overflow-hidden rounded-[var(--radius-md)] border border-line bg-paper-2">
            {person.photo ? (
              <Image
                src={person.photo.src}
                alt={person.photo.alt}
                width={person.photo.width}
                height={person.photo.height}
                sizes="(min-width: 768px) 22rem, 90vw"
                priority={false}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between p-4" role="img" aria-label="Photo coming soon">
                <span className="label">[ADD PHOTO]</span>
                <span className="label normal-case tracking-normal">images-src/me.jpg · 4:5</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-8" data-reveal>
          <div className="max-w-[40rem] space-y-5 text-[1.125rem] leading-relaxed md:text-[1.1875rem]">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <dl className="mt-10 grid gap-0 border-t border-line">
            <div className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="label pt-0.5">Studying</dt>
              <dd>
                {person.education.degree}, {person.education.school}, {person.education.years}
              </dd>
            </div>
            <div className="grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="label pt-0.5">Based in</dt>
              <dd>
                {person.location} · {person.timezoneLabel} (UTC+5:30)
              </dd>
            </div>
            {Object.entries(stack).map(([group, items]) => (
              <div key={group} className="grid gap-2 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="label pt-1">{group}</dt>
                <dd>
                  <StackList items={items} label={group} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
