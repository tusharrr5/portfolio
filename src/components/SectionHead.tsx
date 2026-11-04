type Props = {
  id: string;
  index: string;
  label: string;
  title: string;
  intro?: string;
};

/** Editorial section header: numbered mono label over a hairline, big serif title. */
export function SectionHead({ id, index, label, title, intro }: Props) {
  return (
    <div className="mb-10 md:mb-14" data-reveal>
      <div className="flex items-baseline justify-between border-t border-ink pt-3">
        <span className="label !text-ink">{label}</span>
        <span className="label">{index}</span>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-12 md:gap-8">
        <h2
          id={`${id}-title`}
          className="font-serif text-[2.5rem] leading-[1.02] tracking-[-0.01em] md:col-span-7 md:text-[3.5rem] lg:text-[4.25rem]"
        >
          {title}
        </h2>
        {intro && (
          <p className="max-w-md text-muted md:col-span-5 md:self-end md:justify-self-end">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
