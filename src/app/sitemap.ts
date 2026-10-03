import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { products } from "@/lib/products";
export default function sitemap(): MetadataRoute.Sitemap {
  const originalUpdated = new Date("2026-08-22T00:00:00+02:00");
  const digitalUpdated = new Date("2026-09-26T00:00:00+02:00");
  const routes = ["", "/finder", "/sortiment", "/digitale-bilderrahmen", "/vergleich", "/ratgeber", "/so-funktionierts", "/ueber-uns", "/kontakt", "/affiliate-transparenz", "/impressum", "/datenschutz"];

  return [
    { url: `${SITE_URL}/kostenlose-vorlagen`, lastModified: new Date("2026-10-03"), changeFrequency: "monthly", priority: .8 },
    ...routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: ["", "/finder", "/sortiment", "/digitale-bilderrahmen"].includes(route) ? digitalUpdated : originalUpdated,
      changeFrequency: route === "" || route === "/sortiment" || route === "/digitale-bilderrahmen" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/sortiment" || route === "/digitale-bilderrahmen" ? .9 : .7,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/produkt/${product.id}`,
      lastModified: product.kind === "frame" && product.purpose === "digital" ? digitalUpdated : originalUpdated,
      changeFrequency: "weekly" as const,
      priority: .6,
    })),
  ];
}
