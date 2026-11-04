"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, person } from "@/content/site";

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

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 48rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-[1.5rem] leading-none tracking-tight"
          onClick={close}
        >
          {person.name}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center px-3 text-[0.9375rem] text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn btn-primary btn-sm ml-3">
            Start a project
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="label -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center px-2 !text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 flex flex-col overflow-y-auto bg-paper md:hidden"
        >
          <nav aria-label="Mobile" className="container-page flex flex-1 flex-col pt-6 pb-8">
            <ul className="border-t border-line">
              {nav.map((item, i) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={close}
                    className="flex min-h-16 items-baseline justify-between py-3 font-serif text-[2.5rem] leading-none"
                  >
                    {item.label}
                    <span className="label">0{i + 1}</span>
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
