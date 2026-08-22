import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <article className={`product-card${compact ? " compact" : ""}`}>
      <Link className="product-image" href={`/produkt/${product.id}`}>
        <Image src={product.image} alt={`${product.name} – generische KI-Produktillustration`} fill sizes={compact ? "220px" : "(max-width: 700px) 85vw, 320px"} />
      </Link>
      <div className="product-card-body">
        <p className="product-kicker">{product.categoryLabel} · {product.size}</p>
        <h3><Link href={`/produkt/${product.id}`}>{product.name}</Link></h3>
        <p>{product.summary}</p>
        <div className="product-meta">
          <span>{product.priceLabel}</span>
          <span>{product.material ?? "Material prüfen"}</span>
        </div>
        <Link className="card-link" href={`/produkt/${product.id}`}>Details und Einordnung <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
