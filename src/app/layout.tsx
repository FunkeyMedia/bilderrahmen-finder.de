import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bilderrahmen-Finder – der passende Rahmen für dein Bild",
    template: "%s | bilderrahmen-finder.de",
  },
  description:
    "Finde mit wenigen verständlichen Fragen den Bilderrahmen, der zu Motiv, Format, Stil und Budget passt.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "bilderrahmen-finder.de",
    title: "Dein Bild. Der passende Rahmen.",
    description: "Ein verständlicher Produktfinder für Bilderrahmen – transparent, spielerisch und ohne Verkaufsdruck.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dein Bild. Der passende Rahmen." }],
  },
  twitter: { card: "summary_large_image", title: "Dein Bild. Der passende Rahmen.", description: "Der transparente Bilderrahmen-Finder.", images: ["/og.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: "bilderrahmen-finder.de", url: SITE_URL, inLanguage: "de-DE", description: "Transparenter Produktfinder und Kaufberatung für Bilderrahmen." };
  return (
    <html lang="de" data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }} />
        <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
        <header className="site-header">
          <div className="shell header-inner">
            <Link className="brand" href="/" aria-label="bilderrahmen-finder.de Startseite">
              <span className="brand-mark" aria-hidden="true"><i /></span>
              <span>bilderrahmen-<strong>finder</strong>.de</span>
            </Link>
            <nav aria-label="Hauptnavigation">
              <Link href="/finder">Finder</Link>
              <Link href="/vergleich">Vergleich</Link>
              <Link href="/ratgeber">Ratgeber</Link>
              <Link className="nav-cta" href="/finder">Jetzt finden</Link>
            </nav>
            <details className="mobile-menu">
              <summary>Menü</summary>
              <div><Link href="/finder">Finder</Link><Link href="/vergleich">Vergleich</Link><Link href="/ratgeber">Ratgeber</Link><Link href="/so-funktionierts">Methodik</Link></div>
            </details>
          </div>
        </header>
        <div id="main-content">{children}</div>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <div><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><i /></span><span>bilderrahmen-<strong>finder</strong>.de</span></Link><p>Orientierung für Bilder, die bleiben.</p></div>
            <div className="footer-links"><strong>Entdecken</strong><Link href="/finder">Finder</Link><Link href="/vergleich">Vergleich</Link><Link href="/ratgeber">Ratgeber</Link><Link href="/so-funktionierts">Empfehlungslogik</Link></div>
            <div className="footer-links"><strong>Vertrauen</strong><Link href="/ueber-uns">Über uns</Link><Link href="/affiliate-transparenz">Affiliate-Transparenz</Link><Link href="/kontakt">Kontakt</Link></div>
            <div className="footer-links"><strong>Rechtliches</strong><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></div>
          </div>
          <div className="shell footer-bottom"><p>© 2026 bilderrahmen-finder.de</p><p>Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.</p></div>
        </footer>
      </body>
    </html>
  );
}
