import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-24 md:py-40">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-[2.75rem] font-bold leading-tight md:text-[4rem]">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 text-muted">It may have moved, or the link had a typo.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to the home page
      </Link>
    </section>
  );
}
