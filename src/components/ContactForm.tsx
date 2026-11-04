"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, links, person } from "@/content/site";
import { emailHref } from "@/lib/content";

type Status = "idle" | "sending" | "success" | "error";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

async function send(data: Record<string, string>) {
  if (FORMSPREE_ID) {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, _subject: `New project enquiry from ${data.name}` }),
    });
    if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
    return;
  }
  if (WEB3FORMS_KEY) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...data,
        access_key: WEB3FORMS_KEY,
        subject: `New project enquiry from ${data.name}`,
        from_name: `${person.name} portfolio`,
      }),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (!res.ok || !json.success) throw new Error("Web3Forms rejected the submission");
    return;
  }
  throw new Error(
    "No form key set. Add NEXT_PUBLIC_WEB3FORMS_KEY (or NEXT_PUBLIC_FORMSPREE_ID) to your environment.",
  );
}

const inputClass =
  "field block w-full rounded-[var(--radius-md)] border border-line-strong bg-paper px-3.5 py-3 text-base text-ink placeholder:text-muted/80 transition-colors focus:border-ink focus:outline-2 focus:outline-offset-0 focus:outline-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
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
    if (status === "success" || status === "error") statusRef.current?.focus();
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    // Honeypot: real people never see or fill this field.
    if (fd.get("botcheck")) {
      setStatus("success");
      return;
    }
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      project_type: String(fd.get("project_type") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
    };
    setStatus("sending");
    try {
      await send(data);
      form.reset();
      setType("");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-[var(--radius-md)] border border-ok/40 bg-paper-2 p-6 md:p-8"
      >
        <p className="label !text-ok">Message sent</p>
        <p className="mt-3 font-serif text-[2rem] leading-tight">Thank you.</p>
        <p className="mt-2 text-muted">{contact.success}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex min-h-11 items-center font-medium link-underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" aria-describedby="form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-[0.9375rem] font-medium">
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            className={inputClass}
          />
          <p className="field-error mt-1.5 hidden text-[0.875rem] text-accent">Please add your name.</p>
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-[0.9375rem] font-medium">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={200}
            className={inputClass}
          />
          <p className="field-error mt-1.5 hidden text-[0.875rem] text-accent">
            Please add an email I can reply to.
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="cf-type" className="mb-1.5 block text-[0.9375rem] font-medium">
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
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center font-mono text-muted"
          >
            ↓
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-[0.9375rem] font-medium">
          Tell me about the project
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="What does your business do, what do you need built, and by when?"
          className={`${inputClass} min-h-36 resize-y`}
        />
        <p className="field-error mt-1.5 hidden text-[0.875rem] text-accent">
          A line or two is enough.
        </p>
      </div>

      {/* Honeypot, hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="cf-botcheck">Leave this empty</label>
        <input id="cf-botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-[var(--radius-md)] border border-accent/50 bg-paper-2 p-4 text-[0.9375rem]"
        >
          <p className="font-medium text-accent">{contact.error}</p>
          {email && (
            <p className="mt-1 text-muted">
              <a href={email} className="link-underline text-ink">
                {links.email}
              </a>
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p id="form-note" className="text-[0.875rem] text-muted">
          Replies within 24 hours. No newsletters, ever.
        </p>
      </div>
    </form>
  );
}
