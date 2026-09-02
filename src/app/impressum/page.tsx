import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum", alternates: { canonical: "/impressum" }, robots: { index: false, follow: true } };

export default function ImprintPage() {
  return <main className="legal-page shell"><p className="eyebrow">Rechtliche Angaben</p><h1>Impressum</h1><h2>Angaben gemäß § 5 DDG</h2><p><strong>Pascal Weyers</strong><br />Birkenwaldstr. 46<br />63179 Obertshausen<br />Deutschland</p><h2>Kontakt</h2><p>E-Mail: <a href="mailto:pascal@funkeymedia.de">pascal@funkeymedia.de</a></p><h2>Umsatzsteuer-Identifikationsnummer</h2><p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE299749508</p></main>;
}
