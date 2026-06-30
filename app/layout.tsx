import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CANDIDATE, CONTACT_INFO, SITE_URL } from "@/constants";
import { RecruiterModeProvider } from "@/components/common/RecruiterToggle";
import { InteractiveGrid } from "@/components/common/InteractiveGrid";
import { CustomCursor } from "@/components/common/CustomCursor";
import { CommandPalette } from "@/components/common/CommandPalette";
import { RecruiterToggleFloat } from "@/components/common/RecruiterToggleFloat";



export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CANDIDATE.name} — DevOps & Cloud Infrastructure Engineer`,
    template: `%s | ${CANDIDATE.name}`,
  },
  description:
    "Senior DevOps and Cloud Infrastructure Engineer based in Osnabrück, Germany. CKA-certified Kubernetes Administrator and AWS Certified Solutions Architect with 6+ years of enterprise experience.",
  keywords: [
    "DevOps Engineer",
    "Cloud Infrastructure Engineer",
    "Kubernetes Administrator",
    "AWS Solutions Architect",
    "Terraform",
    "CKA",
    "Platform Engineer",
    "Germany",
    "Osnabrück",
  ],
  authors: [{ name: CANDIDATE.name }],
  creator: CANDIDATE.name,
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${CANDIDATE.name} – Portfolio`,
    title: `${CANDIDATE.name} — DevOps & Cloud Infrastructure Engineer`,
    description:
      "Senior DevOps and Cloud Infrastructure Engineer based in Osnabrück, Germany. CKA-certified Kubernetes Administrator and AWS Certified Solutions Architect with 6+ years of enterprise experience.",
    firstName: "Kesab",
    lastName: "Nayak",
  },
  twitter: {
    card: "summary_large_image",
    title: `${CANDIDATE.name} — DevOps & Cloud Infrastructure Engineer`,
    description:
      "Senior DevOps and Cloud Infrastructure Engineer. CKA-certified. AWS Solutions Architect. Based in Germany.",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: `${CANDIDATE.name} – Portfolio`,
  url: SITE_URL,
  mainEntity: {
    "@type": "Person",
    name: CANDIDATE.name,
    jobTitle: CANDIDATE.title,
    description: CANDIDATE.summary,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Osnabrück",
      addressCountry: "DE",
    },
    sameAs: [CONTACT_INFO.linkedin, CONTACT_INFO.github],
    knowsAbout: [
      "Amazon Web Services",
      "Kubernetes",
      "Terraform",
      "Docker",
      "DevOps",
      "Cloud Infrastructure",
      "CI/CD",
      "Linux",
      "Python",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Certified Kubernetes Administrator",
        recognizedBy: { "@type": "Organization", name: "Cloud Native Computing Foundation" },
        dateCreated: "2026-01",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "AWS Certified Solutions Architect – Associate",
        recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
        dateCreated: "2024-06",
      },
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Technische Hochschule Deggendorf",
        address: { "@type": "PostalAddress", addressLocality: "Deggendorf", addressCountry: "DE" },
      },
      {
        "@type": "EducationalOrganization",
        name: "International Institute of Information Technology",
        address: { "@type": "PostalAddress", addressLocality: "Bhubaneswar", addressCountry: "IN" },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="font-sans"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#f8fafc] text-slate-900 antialiased">
        <RecruiterModeProvider>
          {/* Skip to main content */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <InteractiveGrid />
          <CustomCursor />
          <CommandPalette />
          <RecruiterToggleFloat />

          <ScrollProgress />
          <Navbar />

          <main id="main-content" tabIndex={-1}>
            {children}
          </main>

          <Footer />
        </RecruiterModeProvider>
      </body>
    </html>
  );
}
