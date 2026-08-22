import type { Metadata } from "next";
import { ComparisonExperience } from "@/components/comparison-experience";

export const metadata: Metadata = { title: "Bilderrahmen vergleichen", description: "Vergleiche zwei bis vier Bilderrahmen anhand der Unterschiede, die wirklich zählen." };

export default async function ComparePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const raw = typeof params.ids === "string" ? params.ids : "";
  return <ComparisonExperience initialIds={raw.split(",").filter(Boolean)} />;
}
