import { Highlight } from "@/lib/highlight";

type Props = {
  id: string;
  index?: string;
  label: string;
  title: string;
  emphasis?: string;
  intro?: string;
  className?: string;
};

export function SectionHead({ id, index, label, title, emphasis, intro, className = "" }: Props) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`} data-reveal>
      <p className="eyebrow">
        <span aria-hidden="true">{"//"}</span>
        {index && <span aria-hidden="true">{index}</span>}
        {label}
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-10">
        <h2
          id={`${id}-title`}
          className="text-[2.125rem] font-bold leading-[1.08] tracking-[-0.01em] md:text-[2.875rem]"
        >
          <Highlight text={title} emphasis={emphasis} />
        </h2>
        {intro && <p className="max-w-md text-muted md:justify-self-end">{intro}</p>}
      </div>
    </div>
  );
}
