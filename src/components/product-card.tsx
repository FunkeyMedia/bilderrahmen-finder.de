import Image from "next/image";
import Link from "next/link";
import { AffiliateLink } from "@/components/affiliate-link";
import type { AmazonLiveItem } from "@/lib/amazon-types";
import type { Product } from "@/lib/types";

export function ProductCard({ product, compact = false, amazonItem }: { product: Product; compact?: boolean; amazonItem?: AmazonLiveItem }) {
  const liveImage = amazonItem?.image;
  const imageSrc = liveImage?.url ?? product.image;
  const productName = amazonItem?.title ?? product.name;
  return (
    <article className={`product-card${compact ? " compact" : ""}${amazonItem ? " has-live-data" : ""}`}>
      <Link className="product-image" href={`/produkt/${product.id}`}>
        {amazonItem ? <span className="amazon-data-badge">Originaldaten von Amazon</span> : null}
        <Image
          src={imageSrc}
          alt={liveImage ? productName : `${product.name} – generische KI-Produktillustration`}
          fill
          sizes={compact ? "(max-width: 700px) 85vw, 260px" : "(max-width: 700px) 85vw, 360px"}
          unoptimized={Boolean(liveImage)}
        />
      </Link>
      <div className="product-card-body">
        <p className="product-kicker">{product.categoryLabel} · {product.size}</p>
        <h3><Link href={`/produkt/${product.id}`}>{productName}</Link></h3>
        <p>{product.summary}</p>
        {amazonItem?.price ? (
          <div className="live-price"><small>Aktueller Amazon-Preis</small><strong>{amazonItem.price.displayAmount}</strong><span>Stand {new Date(amazonItem.fetchedAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr</span></div>
        ) : (
          <div className="price-unavailable"><strong>Preis bei Amazon prüfen</strong><span>Keine Echtzeitangabe verfügbar</span></div>
        )}
        <div className="product-meta"><span>{product.material ?? "Material prüfen"}</span></div>
        <AffiliateLink asin={product.asin} context="product-card" label="Bei Amazon ansehen" className="affiliate-button product-buy-button" />
        <Link className="card-link" href={`/produkt/${product.id}`}>Details & Einordnung <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
