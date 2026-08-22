import catalog from "@/data/products.json";
import type { Product } from "./types";

export const products = catalog as Product[];
export const frames = products.filter((product) => product.kind === "frame");
export const accessories = products.filter((product) => product.kind === "accessory");

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function relatedProducts(product: Product, limit = 3) {
  return products
    .filter((candidate) => candidate.id !== product.id && candidate.kind === product.kind)
    .map((candidate) => ({
      candidate,
      affinity:
        Number(candidate.purpose === product.purpose) * 3 +
        Number(candidate.sizeKey === product.sizeKey) * 2 +
        Number(candidate.style === product.style) * 2 +
        Number(candidate.priceBand === product.priceBand),
    }))
    .sort((a, b) => b.affinity - a.affinity || b.candidate.sourceScore - a.candidate.sourceScore)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
