import type { MetadataRoute } from "next";
import { absoluteUrl, featuredProjects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...featuredProjects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}/`),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
