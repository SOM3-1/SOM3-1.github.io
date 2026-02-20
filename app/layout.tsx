import type { Metadata } from "next";
import "./globals.css";
import { GlobalStarfieldShell } from "@/components/global-starfield-shell";
import { LightSkyBackground } from "@/components/light-sky-background";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { siteData } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://som3-1.github.io"),
  title: siteData.meta.title,
  description: siteData.meta.description,
  openGraph: {
    title: siteData.meta.title,
    description: siteData.meta.description,
    type: "website",
    url: "https://som3-1.github.io",
    siteName: siteData.meta.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.meta.title,
    description: siteData.meta.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteData.identity.name,
    jobTitle: "Software Engineer",
    sameAs: [siteData.contact.github, siteData.contact.linkedin],
    email: siteData.contact.email,
    url: "https://som3-1.github.io",
  };

  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <GlobalStarfieldShell />
        <LightSkyBackground />
        <ScrollProgress />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
