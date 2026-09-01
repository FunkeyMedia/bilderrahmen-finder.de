import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AmazonProductGrid } from "@/components/amazon-product-grid";
import { AmazonProductHero } from "@/components/amazon-product-hero";
import { SITE_URL } from "@/lib/config";
import { getProduct, products, relatedProducts } from "@/lib/products";

export function generateStaticParams() { return products.map((product) => ({ id: product.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Produkt nicht gefunden" };
  const description = `${product.summary} Eigenschaften, Grenzen und Affiliate-Hinweis transparent eingeordnet.`;
  return {
    title: product.name,
    description,
    alternates: { canonical: `/produkt/${product.id}` },
    openGraph: { title: product.name, description, url: `/produkt/${product.id}`, images: [{ url: product.image, alt: product.name }] },
    twitter: { card: "summary_large_image", title: product.name, description, images: [product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  const related = relatedProducts(product);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: product.name,
    image: `${SITE_URL}${product.image}`, description: product.summary, sku: product.asin,
    brand: { "@type": "Brand", name: product.brand }, url: `${SITE_URL}/produkt/${product.id}`,
  };

  return (
    <main className="product-page shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav className="breadcrumbs" aria-label="Brotkrumen"><Link href="/">Start</Link><span>›</span><Link href={product.kind === "frame" ? "/finder" : "/ratgeber#zubehoer"}>{product.kind === "frame" ? "Bilderrahmen" : "Zubehör"}</Link><span>›</span><span aria-current="page">{product.brand}</span></nav>
      <AmazonProductHero product={product} />
      <section className="product-evaluation">
        <div><p className="eyebrow">Unsere Einordnung</p><h2>Wofür dieser Rahmen interessant ist</h2><ul className="check-list">{product.pros.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className="caveat-box"><h3>Vor dem Kauf prüfen</h3><ul>{product.cons.map((item) => <li key={item}>{item}</li>)}</ul><p>Die Einordnung basiert auf erfassten Produktangaben, nicht auf einem eigenen Produkttest.</p></div>
      </section>
      <section className="data-note"><h2>So werden die Amazon-Daten angezeigt</h2><p>Originalbild, aktueller Preis, Produkttitel, Verfügbarkeit und Ziellink werden – sobald die Partner-Schnittstelle freigeschaltet ist – direkt über die offizielle Amazon Creators API abgerufen. Preise werden höchstens eine Stunde zwischengespeichert; maßgeblich bleiben immer die Angaben auf Amazon.de.</p><p>Unsere redaktionelle Einordnung zu Format, Material und Eignung bleibt davon getrennt. Sie ist kein eigener Produkttest.</p></section>
      <section className="related-section"><div className="section-heading"><div><p className="eyebrow">Ähnliche Richtung</p><h2>Drei weitere Optionen</h2></div><Link href="/vergleich">Zum Vergleich →</Link></div><AmazonProductGrid products={related} compact /></section>
    </main>
  );
}
