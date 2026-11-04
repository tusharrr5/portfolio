import { contact, links, settings } from "@/content/site";
import { emailHref, isPlaceholder, whatsappHref } from "@/lib/content";
import { ContactForm } from "@/components/ContactForm";
import { LocalTime } from "@/components/LocalTime";

export function Contact() {
  const email = emailHref();
  const wa = whatsappHref();

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-page pt-20 pb-20 md:pt-32 md:pb-32">
      <div className="flex items-baseline justify-between border-t border-ink pt-3">
        <span className="label !text-ink">Contact</span>
        <span className="label">07</span>
      </div>

      <div className="mt-6 grid gap-12 md:grid-cols-12 md:gap-x-10 md:gap-y-0">
        <div className="md:col-span-5 md:col-start-1 md:row-start-1" data-reveal>
          <h2
            id="contact-title"
            className="font-serif text-[2.5rem] leading-[1.02] tracking-[-0.01em] md:text-[3.5rem] lg:text-[4.25rem]"
          >
            {contact.heading}
          </h2>
          <p className="mt-5 max-w-md text-muted">{contact.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Chat on WhatsApp<span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="placeholder-chip justify-center">WhatsApp: [NUMBER]</span>
            )}
            {links.calendly && !isPlaceholder(links.calendly) && (
              <a href={links.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Book a 20-min call<span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:pl-4 lg:pl-10" data-reveal>
          <ContactForm />
        </div>

        <div className="md:col-span-5 md:col-start-1 md:row-start-2">
          <dl className="border-t border-line text-[0.9375rem] md:mt-10">
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <dt className="label">Email</dt>
              <dd className="min-w-0 truncate">
                {email ? (
                  <a href={email} className="link-underline">
                    {links.email}
                  </a>
                ) : (
                  <span className="font-mono text-[0.8125rem] text-muted">[EMAIL]</span>
                )}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <dt className="label">Status</dt>
              <dd className="text-right">{settings.availability.status}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <dt className="label">Reply time</dt>
              <dd>Within 24 hours</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <dt className="label">Right now</dt>
              <dd>
                <LocalTime />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
