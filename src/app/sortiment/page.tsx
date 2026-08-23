import type { Metadata } from "next";
import { CatalogExperience } from "@/components/catalog-experience";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Bilderrahmen-Sortiment durchsuchen",
  description: "Durchsuche 250 Bilderrahmen und Zubehörprodukte und filtere nach Material, Farbe, Form, Format, Stil und Budget.",
  alternates: { canonical: "/sortiment" },
};

export default function SortimentPage() {
  return <CatalogExperience products={products} />;
}
