"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, person } from "@/content/site";
import { Close, Menu } from "@/components/Icons";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Header() {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.dataset.menu = "open";
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      delete document.documentElement.dataset.menu;
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" onClick={close} className="group flex items-center gap-3">
          <span
            aria-hidden="true"
            className="hud relative grid h-9 w-9 place-items-center border border-line-strong bg-surface font-display text-[0.9375rem] font-bold text-accent"
          >
            {initials(person.name)}
          </span>
          <span className="sr-only font-display text-[1.0625rem] font-semibold tracking-wide sm:not-sr-only">
            {person.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center gap-1.5 px-3.5 text-[0.9375rem] text-muted transition-colors hover:text-accent"
            >
              <span className="font-mono text-[0.6875rem] text-accent/70">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#contact" className="btn btn-primary btn-sm hidden md:inline-flex">
            Start a project
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close width={22} height={22} /> : <Menu width={22} height={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 flex flex-col overflow-y-auto bg-bg md:hidden"
        >
          <nav aria-label="Mobile" className="container-page flex flex-1 flex-col pt-4 pb-8">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={close}
                    className="flex min-h-16 items-center justify-between font-display text-[1.75rem] font-semibold"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <Link href="/#contact" onClick={close} className="btn btn-primary w-full">
                Start a project
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
