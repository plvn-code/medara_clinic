import type { Metadata, Viewport } from "next";
import { Geologica, Onest } from "next/font/google";
import { Booking } from "@/components/Booking";
import { Intro, MobileBar, PlanUI } from "@/components/Chrome";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { concerns } from "@/lib/concerns";
import { PlanProvider } from "@/lib/plan";
import { site } from "@/lib/site";
import "./globals.css";

const display = Geologica({ subsets: ["latin", "cyrillic"], weight: ["200", "300", "400"], variable: "--font-display", display: "swap" });
const body = Onest({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "MEDARA CLINIC — дерматолог в Алматы: акне, розацеа, постакне", template: "%s — MEDARA CLINIC" },
  description: site.description,
  openGraph: { type: "website", locale: "ru_KZ", siteName: "MEDARA CLINIC", images: ["/img/hero-poster.webp"] },
  // Stays out of search until the client approves the launch.
  robots: process.env.NEXT_PUBLIC_SITE_LIVE === "1" ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#231914" };

const clinic = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "MEDARA CLINIC",
  url: site.url,
  telephone: "+77012833392",
  medicalSpecialty: "Dermatology",
  address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: site.city, addressCountry: "KZ" },
  sameAs: [site.instagram, site.threads],
};

/** Before paint: the intro runs once per session, only on the home page, never with reduced motion. */
const introScript = `try{var d=document.documentElement;if(sessionStorage.getItem('md-intro')||matchMedia('(prefers-reduced-motion: reduce)').matches||location.pathname!=='/'){d.classList.add('no-intro')}sessionStorage.setItem('md-intro','1')}catch(e){document.documentElement.classList.add('no-intro')}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const menu = concerns.map(({ slug, title, short }) => ({ slug, title, short }));
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <a href="#main" className="skip">
          К содержанию
        </a>
        <div className="sp" aria-hidden="true" />
        <PlanProvider>
          <Intro />
          <Header concerns={menu} />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
          <PlanUI />
          <Booking concerns={menu} />
        </PlanProvider>
        <Effects />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinic) }} />
      </body>
    </html>
  );
}
