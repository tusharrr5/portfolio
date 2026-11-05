/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT
 *  The words, links, projects and prices live in /content/*.json.
 *  Edit them in the admin panel at /admin, or by hand.
 *
 *  This file only loads those JSON files, fills in safe defaults
 *  for anything left empty, and gives the components typed data.
 * ─────────────────────────────────────────────────────────────
 */
import profileJson from "../../content/profile.json";
import heroJson from "../../content/hero.json";
import projectsJson from "../../content/projects.json";
import servicesJson from "../../content/services.json";
import processJson from "../../content/process.json";
import aboutJson from "../../content/about.json";
import faqJson from "../../content/faq.json";
import testimonialsJson from "../../content/testimonials.json";
import contactJson from "../../content/contact.json";

/** The admin panel can save empty fields as "" or leave them out. Treat both as "not set". */
const text = (v: unknown): string => (typeof v === "string" ? v.trim() : "");
const list = <T = string>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]).filter((x) => x !== "" && x != null) : []);

// ── You ──────────────────────────────────────────────────────

const p = profileJson.person;
const photoSrc = text(p.photo?.src);

export const person = {
  name: p.name,
  role: p.role,
  location: p.location,
  timezone: text(p.timezone) || "Asia/Kolkata", // used for the live clock
  timezoneLabel: text(p.timezoneLabel) || "IST",
  education: p.education,
  /** Square-ish image works best. The frame crops to a square around the centre. */
  photo: (photoSrc ? { src: photoSrc, alt: text(p.photo.alt) || p.name, width: 640, height: 640 } : null) as
    | null
    | { src: string; alt: string; width: number; height: number },
};

// ── Links ────────────────────────────────────────────────────

export const links = {
  email: text(profileJson.links.email),
  /** Digits only with country code, no + or spaces. */
  whatsapp: text(profileJson.links.whatsapp).replace(/\D/g, ""),
  whatsappMessage: profileJson.links.whatsappMessage,
  github: text(profileJson.links.github),
  linkedin: text(profileJson.links.linkedin),
  /** Optional. Empty hides the "book a call" link. */
  calendly: text(profileJson.links.calendly),
};

// ── Site settings ────────────────────────────────────────────

export const settings = {
  /** Set NEXT_PUBLIC_SITE_URL in Vercel. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://tusharbhojwani.vercel.app",
  /** Turn prices on or off everywhere with this one flag. */
  showPrices: Boolean(profileJson.settings.showPrices),
  currency: text(profileJson.settings.currency) || "₹",
  availability: profileJson.settings.availability,
};

export const seo = profileJson.seo;

// ── Navigation (tied to section ids, so it stays in code) ───

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];

// ── Hero ─────────────────────────────────────────────────────

export const hero = {
  ...heroJson,
  emphasis: text(heroJson.emphasis),
  stats: list<{ value: string; label: string }>(heroJson.stats),
};

// ── Stack (only what you actually use) ───────────────────────

export const stack: Record<string, string[]> = Object.fromEntries(
  list<{ group: string; items: string[] }>(aboutJson.stack).map((g) => [g.group, list(g.items)]),
);

// ── Projects ─────────────────────────────────────────────────

export type Project = {
  slug: string;
  name: string;
  /** Shown on the home page (and gets a case study page) only if true. */
  featured: boolean;
  kind: string;
  year: string;
  outcome: string;
  built: string;
  stack: string[];
  /** null = no live site (the button is hidden). */
  live: string | null;
  code: string;
  codeLabel?: string;
  badges: string[];
  image: null | { src: string; alt: string };
  /** Three short facts, shown on the panel when there's no screenshot. */
  highlights?: string[];
  caseStudy: {
    problem: string;
    whatIBuilt: string[];
    how: string[];
    result: string;
    learned: string;
  };
};

type RawProject = Omit<Project, "live" | "image" | "codeLabel"> & {
  live?: string | null;
  codeLabel?: string | null;
  image?: { src?: string; alt?: string } | null;
};

export const projects: Project[] = (projectsJson.projects as RawProject[]).map((r) => {
  const imageSrc = text(r.image?.src);
  return {
    ...r,
    slug: text(r.slug),
    featured: Boolean(r.featured),
    stack: list(r.stack),
    badges: list(r.badges),
    highlights: list(r.highlights),
    live: text(r.live) || null,
    codeLabel: text(r.codeLabel) || undefined,
    image: imageSrc ? { src: imageSrc, alt: text(r.image?.alt) || r.name } : null,
    caseStudy: { ...r.caseStudy, whatIBuilt: list(r.caseStudy.whatIBuilt), how: list(r.caseStudy.how) },
  };
});

// ── Services ─────────────────────────────────────────────────

export type Service = {
  name: string;
  goodFor: string;
  includes: string[];
  timeline: string;
  /** Number in rupees, e.g. 15000. null shows a placeholder. */
  priceFrom: number | null;
  /** Which "project type" the contact form preselects when someone clicks "Ask about this". */
  projectType: string;
};

export const services: Service[] = servicesJson.services.map((s) => {
  const price = Number(s.priceFrom);
  return {
    ...s,
    includes: list(s.includes),
    priceFrom: s.priceFrom != null && String(s.priceFrom) !== "" && Number.isFinite(price) ? price : null,
  };
});

// ── Process ──────────────────────────────────────────────────

export const processSteps = list<{ name: string; body: string }>(processJson.steps);

// ── About ────────────────────────────────────────────────────

export const about = {
  heading: aboutJson.heading,
  paragraphs: list(aboutJson.paragraphs),
};

// ── Testimonials ─────────────────────────────────────────────
// The section stays hidden until this list has at least one entry.
// Only add real quotes from real people, with their permission.

export type Testimonial = { quote: string; name: string; role: string; link?: string };
export const testimonials: Testimonial[] = list<Testimonial>(testimonialsJson.testimonials).filter((t) => text(t.quote));

// ── FAQ ──────────────────────────────────────────────────────

export const faq = list<{ q: string; a: string }>(faqJson.faq);

// ── Contact ──────────────────────────────────────────────────

export const contact = {
  ...contactJson,
  emphasis: text(contactJson.emphasis),
  projectTypes: list(contactJson.projectTypes),
};

export const footer = profileJson.footer;
