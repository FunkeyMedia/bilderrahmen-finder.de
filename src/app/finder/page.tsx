import type { Metadata } from "next";
import { FinderExperience } from "@/components/finder-experience";

export const metadata: Metadata = {
  title: "Bilderrahmen-Finder starten",
  description: "In drei oder sechs verständlichen Schritten zum Bilderrahmen, der zu Motiv, Format, Stil und Budget passt.",
  alternates: { canonical: "/finder" },
};

export default function FinderPage() {
  return <main className="finder-shell"><FinderExperience /></main>;
}
