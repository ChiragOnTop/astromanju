import CosmicLanding from "@/components/CosmicLanding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Astro Manju | Astrologer Manju Gambhir & Resonate Healers",
  description:
    "Expert astrology, numerology, marriage matchmaking & tarot readings by Manju Gambhir. Discover your destiny with Resonate Healers - premium celestial guidance for career, relationships & life decisions.",
};

function SchemaMarkup() {
  const schemas = {
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Manju Gambhir",
      url: "https://astromanju.com",
      image: "https://astromanju.com/manju-gambhir.jpg",
      jobTitle: "Professional Astrologer",
      description: "Expert in Vedic Astrology, Numerology, Tarot Reading, and Marriage Matchmaking",
      knowsAbout: ["Astrology", "Numerology", "Tarot Reading", "Kundli Matching", "Vedic Astrology"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        telephone: "+91-8860647886",
        email: "manjugambhir8341@gmail.com",
        url: "https://wa.me/918860647886",
      },
    },
    organization: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Resonate Healers",
      alternateName: "Astro Manju",
      description:
        "Premium celestial guidance and astrology consultation services specializing in personal readings, numerology, marriage matchmaking, and tarot.",
      url: "https://astromanju.com",
      logo: "https://astromanju.com/logo.png",
      image: "https://astromanju.com/resonate-healers.jpg",
      sameAs: ["https://wa.me/918860647886"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        telephone: "+91-8860647886",
        email: "manjugambhir8341@gmail.com",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      areaServed: "IN",
      serviceType: [
        "Astrology Consultation",
        "Numerology Reading",
        "Marriage Matchmaking",
        "Tarot Reading",
        "Vedic Astrology",
        "Kundli Matching",
      ],
    },
    services: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Astrology Services",
      description: "Premium astrology, numerology, tarot and matchmaking services by Manju Gambhir",
      mainEntity: [
        {
          "@type": "Service",
          name: "Astrology Consultation",
          description:
            "A private reading that maps planetary timing, karmic patterns, career cycles, and relationship signatures into a grounded action plan.",
          provider: {
            "@type": "LocalBusiness",
            name: "Resonate Healers",
          },
        },
        {
          "@type": "Service",
          name: "Numerology Consultation",
          description:
            "Decode your birth number, destiny number, name resonance, and yearly vibration with refined remedies for alignment and prosperity.",
          provider: {
            "@type": "LocalBusiness",
            name: "Resonate Healers",
          },
        },
        {
          "@type": "Service",
          name: "Marriage Matchmaking",
          description:
            "A sensitive compatibility analysis blending kundli matching, emotional temperament, longevity markers, and family harmony indicators.",
          provider: {
            "@type": "LocalBusiness",
            name: "Resonate Healers",
          },
        },
        {
          "@type": "Service",
          name: "Tarot Reading",
          description:
            "A cinematic tarot experience for urgent decisions, hidden influences, and intuitive next steps revealed through archetypal light.",
          provider: {
            "@type": "LocalBusiness",
            name: "Resonate Healers",
          },
        },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.services) }} />
    </>
  );
}

export default function Home() {
  return (
    <>
      <SchemaMarkup />
      <CosmicLanding />
    </>
  );
}
