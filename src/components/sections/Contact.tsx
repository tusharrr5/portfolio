import { contact, links } from "@/content/site";
import { emailHref, isPlaceholder, whatsappHref } from "@/lib/content";
import { ContactForm } from "@/components/ContactForm";
import { Chat, Github, Linkedin, Mail } from "@/components/Icons";
import { Highlight } from "@/lib/highlight";

export function Contact() {
  const email = emailHref();
  const wa = whatsappHref();
  const tiles = [
    { Icon: Chat, title: "WhatsApp", sub: "Fastest reply", href: wa, external: true },
    { Icon: Mail, title: "Email", sub: email ? links.email : "[EMAIL]", href: email, external: false },
    { Icon: Github, title: "GitHub", sub: "@tusharrr5", href: isPlaceholder(links.github) ? null : links.github, external: true },
    { Icon: Linkedin, title: "LinkedIn", sub: "Tushar Bhojwani", href: isPlaceholder(links.linkedin) ? null : links.linkedin, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page py-20 md:py-28">
      <div className="card hud grid grid-cols-[minmax(0,1fr)] overflow-hidden lg:grid-cols-[1fr_1.15fr]" data-reveal>
        <div className="relative border-b border-line bg-surface-2 p-6 sm:p-8 lg:border-r lg:border-b-0 lg:p-10">
          <div aria-hidden="true" className="dot-bg absolute inset-0 opacity-50" />
          <div className="relative">
            <p className="eyebrow">
              <span aria-hidden="true">{"//"}</span>
              <span aria-hidden="true">07</span>
              Contact
            </p>
            <h2
              id="contact-title"
              className="mt-4 text-[2.125rem] font-bold leading-[1.08] tracking-[-0.01em] md:text-[2.75rem]"
            >
              <Highlight text={contact.heading} emphasis={contact.emphasis} />
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">{contact.intro}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {tiles.map(({ Icon, title, sub, href, external }) => {
                const inner = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center border border-line-strong text-accent transition-colors group-hover:border-accent">
                      <Icon width={18} height={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1rem] font-semibold leading-tight">{title}</span>
                      <span className="block font-mono text-[0.75rem] leading-snug text-muted [overflow-wrap:anywhere]">{sub}</span>
                    </span>
                  </>
                );
                return (
                  <li key={title}>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex min-h-16 items-center gap-3 border border-line bg-bg/50 p-3 transition-colors hover:border-accent/60"
                      >
                        {inner}
                      </a>
                    ) : (
                      <span className="flex min-h-16 items-center gap-3 border border-dashed border-line-strong p-3 opacity-80">
                        {inner}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
