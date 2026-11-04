"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, links, person } from "@/content/site";
import { emailHref } from "@/lib/content";
import { Chat } from "@/components/Icons";

/*
 * The form sends enquiries to WhatsApp: on submit it opens a chat with
 * links.whatsapp, with the visitor's details already typed in. They tap
 * send and it lands on the business number. No server or API key needed.
 *
 * Optional: set NEXT_PUBLIC_WEB3FORMS_KEY (or NEXT_PUBLIC_FORMSPREE_ID) to
 * also get an email copy of every enquiry, even if they never tap send.
 */

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Enquiry = { name: string; email: string; project_type: string; message: string };

function whatsappUrl(d: Enquiry) {
  const lines = [
    `Hi ${person.name.split(" ")[0]}, I found you through your portfolio.`,
    "",
    `*Name:* ${d.name}`,
    ...(d.email ? [`*Email:* ${d.email}`] : []),
    `*Project:* ${d.project_type}`,
    "",
    d.message,
  ];
  const digits = links.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/** Fire-and-forget email copy. Never blocks or fails the WhatsApp step. */
function sendEmailCopy(d: Enquiry) {
  const subject = `New project enquiry from ${d.name}`;
  const opts = { method: "POST", keepalive: true, headers: { "Content-Type": "application/json", Accept: "application/json" } };
  if (FORMSPREE_ID) {
    fetch(`https://formspree.io/f/${FORMSPREE_ID}`, { ...opts, body: JSON.stringify({ ...d, _subject: subject }) }).catch(
      console.error,
    );
  } else if (WEB3FORMS_KEY) {
    fetch("https://api.web3forms.com/submit", {
      ...opts,
      body: JSON.stringify({ ...d, access_key: WEB3FORMS_KEY, subject, from_name: `${person.name} portfolio` }),
    }).catch(console.error);
  }
}

const inputClass =
  "field block w-full rounded-[2px] border border-line-strong bg-bg px-4 py-3 text-base text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

const labelClass = "mb-2 block font-mono text-[0.75rem] uppercase tracking-[0.08em] text-muted";

export function ContactForm() {
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [type, setType] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const email = emailHref();

  // "Ask about this" links in Services preselect the project type.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-service]");
      if (a?.dataset.service) setType(a.dataset.service);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (sentUrl) statusRef.current?.focus();
  }, [sentUrl]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // Honeypot: real people never see or fill this field.
    if (fd.get("botcheck")) {
      setSentUrl("#contact");
      return;
    }
    const data: Enquiry = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      project_type: String(fd.get("project_type") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
    };
    const url = whatsappUrl(data);
    // Opened straight from the submit event so pop-up blockers allow it.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    sendEmailCopy(data);
    form.reset();
    setType("");
    setSentUrl(url);
  }

  if (sentUrl) {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-ok/30 bg-ok/5 p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-ok">Almost done</p>
        <p className="mt-3 font-display text-[1.75rem] font-bold">Tap send in WhatsApp.</p>
        <p className="mt-2 text-muted">{contact.success}</p>
        <p className="mt-4 text-[0.9375rem] text-muted">{contact.notOpened}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            <Chat width={16} height={16} />
            Open WhatsApp
          </a>
          {email && (
            <a href={email} className="btn btn-ghost btn-sm normal-case tracking-normal">
              {links.email}
            </a>
          )}
        </div>
        <button type="button" onClick={() => setSentUrl(null)} className="text-link mt-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Your name
          </label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required maxLength={120} className={inputClass} />
          <p className="field-error mt-1.5 hidden text-[0.875rem] text-red-400">Please add your name.</p>
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email <span className="normal-case tracking-normal text-muted/80">(optional)</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={200}
            className={inputClass}
          />
          <p className="field-error mt-1.5 hidden text-[0.875rem] text-red-400">That email doesn&apos;t look right.</p>
        </div>
      </div>

      <div>
        <label htmlFor="cf-type" className={labelClass}>
          What do you need?
        </label>
        <div className="relative">
          <select
            id="cf-type"
            name="project_type"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`${inputClass} appearance-none pr-10`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {contact.projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center font-mono text-muted">
            ↓
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Tell me about the project
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder="What does your business do, what do you need built, and by when?"
          className={`${inputClass} min-h-36 resize-y`}
        />
        <p className="field-error mt-1.5 hidden text-[0.875rem] text-red-400">A line or two is enough.</p>
      </div>

      {/* Honeypot, hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-botcheck">Leave this empty</label>
        <input id="cf-botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-3">
        <button type="submit" className="btn btn-primary w-full">
          <Chat width={18} height={18} />
          Send on WhatsApp
        </button>
        <p id="form-note" className="text-center text-[0.875rem] text-muted">
          Opens WhatsApp with your message ready to send. I reply within 24 hours.
        </p>
      </div>
    </form>
  );
}
