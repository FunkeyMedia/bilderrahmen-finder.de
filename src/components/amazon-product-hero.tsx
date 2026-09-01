"use client";

import Image from "next/image";
import { AffiliateLink } from "@/components/affiliate-link";
import { AmazonPrice } from "@/components/amazon-price";
import { useAmazonItems } from "@/lib/use-amazon-items";
import type { Product } from "@/lib/types";

export function AmazonProductHero({ product }: { product: Product }) {
  const { items, loading } = useAmazonItems([product.asin]);
  const live = items[product.asin];
  const image = live?.image;
  const title = live?.title ?? product.name;

  return (
    <section className="product-hero" aria-busy={loading}>
      <div className={`product-stage${live ? " live-amazon-stage" : ""}`}>
        <span>{live ? "Originalbild von Amazon" : "Beispielillustration"}</span>
        <Image
          src={image?.url ?? product.image}
          alt={image ? title : `${product.name} – generische, markenfreie KI-Produktillustration`}
          fill
          priority
          sizes="(max-width: 800px) 94vw, 48vw"
          unoptimized={Boolean(image)}
        />
      </div>
      <div className="product-main">
        <p className="eyebrow">{product.categoryLabel} · {live ? "Amazon-Livedaten" : `Datenstand ${product.checkedAt}`}</p>
        <h1>{title}</h1>
        <p className="product-summary">{product.summary}</p>
        {live?.price ? (
          <div className="detail-live-price">
            <span>Aktueller Preis bei Amazon</span>
            <AmazonPrice amount={live.price.amount} currency={live.price.currency} />
            <small>Zuletzt abgerufen: {new Date(live.fetchedAt).toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" })} Uhr</small>
          </div>
        ) : <div className="detail-live-price unavailable"><span>Aktueller Preis</span><strong>Bei Amazon prüfen</strong><small>Momentan keine Live-Preisangabe verfügbar.</small></div>}
        <dl className="product-facts">
          <div><dt>Erfasstes Format</dt><dd>{product.size}</dd></div>
          <div><dt>Material</dt><dd>{product.material ?? "nicht eindeutig"}</dd></div>
          <div><dt>Farbe</dt><dd>{product.colorLabel ?? "nicht eindeutig"}</dd></div>
          <div><dt>Verfügbarkeit</dt><dd>{live?.availability ?? "Auf Amazon prüfen"}</dd></div>
        </dl>
        <AffiliateLink asin={product.asin} context="product-detail" label="Jetzt bei Amazon ansehen" />
        <p className="affiliate-disclosure">Werbung · Affiliate-Link. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Für dich ändert sich der Preis nicht.</p>
        <p className="amazon-price-note">Preis und Verfügbarkeit stammen bei erfolgreichem Abruf direkt von Amazon.de und können sich jederzeit ändern. Maßgeblich sind die Angaben auf Amazon.</p>
      </div>
    </section>
  );
}
