export function StackList({ items, label = "Stack" }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-[2px] border border-line bg-surface-2 px-2 py-1 font-mono text-[0.75rem] leading-tight text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
