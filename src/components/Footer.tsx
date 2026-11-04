import { links, person } from "@/content/site";
import { emailHref, isPlaceholder, whatsappHref } from "@/lib/content";
import { Chat, Github, Linkedin, Mail } from "@/components/Icons";

export function Footer() {
  const email = emailHref();
  const wa = whatsappHref();
  const items = [
    !isPlaceholder(links.github) && { label: "GitHub", href: links.github, Icon: Github, external: true },
    !isPlaceholder(links.linkedin) && { label: "LinkedIn", href: links.linkedin, Icon: Linkedin, external: true },
    wa && { label: "WhatsApp", href: wa, Icon: Chat, external: true },
    email && { label: "Email", href: email, Icon: Mail, external: false },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof Github; external: boolean }[];

  return (
    <footer id="site-footer" className="border-t border-line">
      <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.75rem] text-muted">
          © {new Date().getFullYear()} {person.name} <span className="text-accent">{"//"}</span> {person.location}
        </p>
        <ul className="-ml-3 flex gap-1 sm:ml-0 sm:-mr-3">
          {items.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:bg-surface-2 hover:text-accent"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
