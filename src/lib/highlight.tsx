/** Renders `text` with the `emphasis` part in the accent colour. */
export function Highlight({ text, emphasis }: { text: string; emphasis?: string }) {
  const i = emphasis ? text.indexOf(emphasis) : -1;
  if (!emphasis || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-accent">{emphasis}</span>
      {text.slice(i + emphasis.length)}
    </>
  );
}
