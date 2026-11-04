import { links, projects, settings, type Service } from "@/content/site";

/** True for values still holding a "[LIKE THIS]" placeholder, or empty. */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  return /\[[^\]]+\]/.test(value);
}

export function whatsappHref(): string | null {
  const digits = links.whatsapp.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(links.whatsappMessage)}`;
}

export function emailHref(): string | null {
  return isPlaceholder(links.email) ? null : `mailto:${links.email}`;
}

export function formatPrice(service: Service): string | null {
  if (!settings.showPrices) return null;
  if (service.priceFrom == null) return `From ${settings.currency}[X]`;
  return `From ${settings.currency}${service.priceFrom.toLocaleString("en-IN")}`;
}

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return featuredProjects.find((p) => p.slug === slug);
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, settings.siteUrl).toString();
}
