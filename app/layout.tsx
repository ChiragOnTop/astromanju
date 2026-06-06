import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astro Manju | Astrologer Manju Gambhir & Resonate Healers",
  description:
    "Expert astrology, numerology, marriage matchmaking & tarot readings by Manju Gambhir. Discover your destiny with Resonate Healers - premium celestial guidance for career, relationships & life decisions.",
  keywords: [
    "Astrologer Manju Gambhir",
    "Resonate Healers",
    "astrology consultation",
    "numerology reading",
    "marriage matchmaking",
    "tarot reading",
    "vedic astrology",
    "kundli matching",
    "personal astrology",
    "celestial guidance",
  ],
  authors: [{ name: "Manju Gambhir", url: "https://astromanju.com" }],
  openGraph: {
    title: "Astro Manju | Astrologer Manju Gambhir & Resonate Healers",
    description: "Premium celestial guidance & astrology consultations by Manju Gambhir",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astro Manju | Astrologer Manju Gambhir",
    description: "Expert astrology, numerology & tarot by Manju Gambhir",
  },
  verification: {
    google: "pgLSokV7uKA1OkcErtxrbB60jHrEEN1bMATyWZSRz84",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
