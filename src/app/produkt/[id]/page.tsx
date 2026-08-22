import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateLink } from "@/components/affiliate-link";
import { ProductCard } from "@/components/product-card";
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
      <section className="product-hero">
        <div className="product-stage"><span>KI-Produktillustration</span><Image src={product.image} alt={`${product.name} – generische, markenfreie KI-Produktillustration`} fill priority sizes="(max-width: 800px) 94vw, 48vw" /></div>
        <div className="product-main">
          <p className="eyebrow">{product.categoryLabel} · Datenstand {product.checkedAt}</p>
          <h1>{product.name}</h1>
          <p className="product-summary">{product.summary}</p>
          <dl className="product-facts"><div><dt>Erfasstes Format</dt><dd>{product.size}</dd></div><div><dt>Material</dt><dd>{product.material ?? "nicht eindeutig"}</dd></div><div><dt>Farbe</dt><dd>{product.colorLabel ?? "nicht eindeutig"}</dd></div><div><dt>Preis-Momentaufnahme</dt><dd>{product.priceLabel}</dd></div></dl>
          <AffiliateLink asin={product.asin} context="product-detail" label="Aktuellen Preis bei Amazon prüfen" />
          <p className="affiliate-disclosure">Beim Kauf über diesen Link erhalten wir möglicherweise eine Provision. Für dich ändert sich der Preis nicht.</p>
        </div>
      </section>
      <section className="product-evaluation">
        <div><p className="eyebrow">Unsere Einordnung</p><h2>Wofür dieser Rahmen interessant ist</h2><ul className="check-list">{product.pros.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div className="caveat-box"><h3>Vor dem Kauf prüfen</h3><ul>{product.cons.map((item) => <li key={item}>{item}</li>)}</ul><p>Die Einordnung basiert auf erfassten Produktangaben, nicht auf einem eigenen Produkttest.</p></div>
      </section>
      <section className="data-note"><h2>Was wir aus Amazon-Daten übernommen haben</h2><p>ASIN {product.asin}, Marke, Titel, erkennbares Format, Material/Farbe sowie die Preis- und Resonanzdaten zum Erfassungszeitpunkt. Verfügbarkeit, Preis und Bewertungen können sich ändern und werden deshalb nicht als Echtzeitdaten dargestellt.</p>{product.rating != null && <p>Momentaufnahme vom {product.checkedAt}: {product.rating.toLocaleString("de-DE")} von 5 Sternen bei {product.reviews?.toLocaleString("de-DE")} erfassten Bewertungen. Diese Angabe ist kein eigenes Testergebnis.</p>}</section>
      <section className="related-section"><div className="section-heading"><div><p className="eyebrow">Ähnliche Richtung</p><h2>Drei weitere Optionen</h2></div><Link href="/vergleich">Zum Vergleich →</Link></div><div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.id} compact />)}</div></section>
    </main>
  );
}
