import { links, person, seo, services, settings } from "@/content/site";
import { isPlaceholder } from "@/lib/content";

export function JsonLd() {
  const sameAs = [links.github, links.linkedin].filter((l) => !isPlaceholder(l));
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${settings.siteUrl}/#person`,
        name: person.name,
        jobTitle: person.role,
        url: settings.siteUrl,
        ...(isPlaceholder(links.email) ? {} : { email: `mailto:${links.email}` }),
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        alumniOf: { "@type": "CollegeOrUniversity", name: person.education.school },
        knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Python", "FastAPI"],
        sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${settings.siteUrl}/#service`,
        name: `${person.name}, web development`,
        description: seo.description,
        url: settings.siteUrl,
        founder: { "@id": `${settings.siteUrl}/#person` },
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.goodFor },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
