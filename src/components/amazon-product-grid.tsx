"use client";

import { ProductCard } from "@/components/product-card";
import { useAmazonItems } from "@/lib/use-amazon-items";
import type { Product } from "@/lib/types";

export function AmazonProductGrid({ products, compact = false, className = "product-grid" }: { products: Product[]; compact?: boolean; className?: string }) {
  const { items, loading } = useAmazonItems(products.map((product) => product.asin));
  return (
    <div className={className} aria-busy={loading}>
      {products.map((product) => <ProductCard product={product} amazonItem={items[product.asin]} compact={compact} key={product.id} />)}
    </div>
  );
}
