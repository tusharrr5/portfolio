import Link from "next/link";
import { footer, links, nav, person } from "@/content/site";
import { emailHref, isPlaceholder } from "@/lib/content";

export function Footer() {
  const social = [
    { label: "GitHub", href: links.github },
    { label: "LinkedIn", href: links.linkedin },
  ];
  const email = emailHref();

  return (
    <footer id="site-footer" className="border-t border-line bg-paper">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end md:py-12">
        <div>
          <p className="font-serif text-[1.75rem] leading-none">
            {person.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 text-[0.9375rem] text-muted">
            © {new Date().getFullYear()} {person.name}. {footer.note}
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="inline-flex min-h-11 items-center link-underline">
                {item.label}
              </Link>
            </li>
          ))}
          {social.map((s) =>
            isPlaceholder(s.href) ? null : (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="inline-flex min-h-11 items-center link-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ),
          )}
          {email && (
            <li>
              <a href={email} className="inline-flex min-h-11 items-center link-underline">
                Email
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
}
