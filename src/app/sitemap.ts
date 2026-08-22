import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { products } from "@/lib/products";
export default function sitemap(): MetadataRoute.Sitemap { const updated = new Date("2026-08-22T00:00:00+02:00"); const routes = ["", "/finder", "/vergleich", "/ratgeber", "/so-funktionierts", "/ueber-uns", "/kontakt", "/affiliate-transparenz", "/impressum", "/datenschutz"]; return [...routes.map((route) => ({ url: `${SITE_URL}${route}`, lastModified: updated, changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })), ...products.map((product) => ({ url: `${SITE_URL}/produkt/${product.id}`, lastModified: updated, changeFrequency: "weekly" as const, priority: .6 }))]; }
