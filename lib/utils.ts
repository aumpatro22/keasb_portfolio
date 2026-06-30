import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return date;
}

export function generateMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kesab-nayak.dev";
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Kesab Kumar Nayak – Portfolio",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
