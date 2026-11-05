/**
 * npm run screenshots   (run `npm run build` first)
 * Saves full-page and per-section screenshots at each width to /screenshots,
 * and reports any horizontal overflow.
 */
import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "screenshots");
const port = 4173;
const base = `http://localhost:${port}`;
const widths = (process.env.WIDTHS || "360,390,430,768,1024,1440").split(",").map(Number);
const pages = ["/", "/work/bound/", "/work/course-management-system/"];
const sections = ["hero", "work", "services", "process", "about", "faq", "contact", "site-footer"];

// Serves the production build (`npm run build` first).
const server = spawn(path.join(root, "node_modules/.bin/next"), ["start", "-p", String(port)], { cwd: root });
for (let i = 0; i < 50; i++) {
  const up = await fetch(base).then(() => true, () => false);
  if (up) break;
  await new Promise((r) => setTimeout(r, 200));
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const problems = [];
try {
  for (const w of widths) {
    const h = w <= 430 ? 844 : w <= 1024 ? 1024 : 900;
    const ctx = await browser.newContext({
      viewport: { width: w, height: h },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      isMobile: w < 768,
      hasTouch: w < 768,
    });
    const page = await ctx.newPage();
    for (const p of pages) {
      await page.goto(base + p, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const name = p === "/" ? "home" : p.replaceAll("/", "_").replace(/^_|_$/g, "");

      const overflow = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const offenders = [];
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width && (r.right > vw + 1 || r.left < -1)) {
            const style = getComputedStyle(el);
            if (style.position === "fixed" || el.closest("[aria-hidden='true'].absolute")) continue;
            offenders.push(`${el.tagName.toLowerCase()}.${(el.className?.toString?.() || "").slice(0, 60)} → ${Math.round(r.right)}px`);
          }
        }
        return { scrollW: document.documentElement.scrollWidth, vw, offenders: offenders.slice(0, 8) };
      });
      if (overflow.scrollW > overflow.vw || overflow.offenders.length) problems.push({ w, p, ...overflow });

      // Above-the-fold check on the home page
      if (p === "/") {
        await page.screenshot({ path: path.join(outDir, `${name}-${w}-fold.png`) });
        const fold = await page.evaluate(() => {
          const q = (s) => document.querySelector(s)?.getBoundingClientRect();
          const bar = document.querySelector("body > div.fixed.bottom-0");
          const barTop = bar && getComputedStyle(bar).display !== "none" ? bar.getBoundingClientRect().top : innerHeight;
          return { h1: q("h1")?.bottom, cta: q("#hero-title ~ div a")?.bottom, barTop, vh: innerHeight };
        });
        if (fold.cta > fold.barTop) problems.push({ w, p, fold: `primary button bottom ${fold.cta}px is below visible area ${fold.barTop}px` });
      }

      await page.screenshot({ path: path.join(outDir, `${name}-${w}-full.png`), fullPage: true });
      if (p === "/") {
        // Hide sticky/fixed chrome so it doesn't overlap element captures.
        const chrome = await page.addStyleTag({ content: "header.sticky, body > div.fixed { visibility: hidden !important; }" });
        for (const id of sections) {
          const loc = id === "hero" ? page.locator("section").first() : page.locator(`#${id}`);
          if (await loc.count()) await loc.screenshot({ path: path.join(outDir, `section-${id}-${w}.png`) });
        }
        await chrome.evaluate((el) => el.remove());
      }
    }
    if (w < 768) {
      await page.goto(base + "/", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Menu" }).click();
      await page.screenshot({ path: path.join(outDir, `menu-${w}.png`) });
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  server.kill();
}

if (problems.length) {
  console.log("PROBLEMS:\n" + JSON.stringify(problems, null, 2));
  process.exitCode = 1;
} else {
  console.log(`No overflow or fold problems at ${widths.join(", ")}px. Screenshots in /screenshots.`);
}
