"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/content";

/** Slim sticky action bar for phones. Hides while the contact section is on screen. */
export function MobileBar() {
  const [hidden, setHidden] = useState(false);
  const wa = whatsappHref();
  const pathname = usePathname();

  useEffect(() => {
    const targets = ["contact", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-transform duration-200 motion-reduce:transition-none md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      } in-data-[menu=open]:hidden`}
      aria-hidden={hidden}
      inert={hidden}
    >
      <div className="flex gap-2">
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm flex-1"
          >
            WhatsApp
          </a>
        ) : (
          <span className="placeholder-chip flex-1 justify-center">[WHATSAPP NUMBER]</span>
        )}
        <Link href="/#contact" className="btn btn-primary btn-sm flex-1">
          Start a project
        </Link>
      </div>
    </div>
  );
}
