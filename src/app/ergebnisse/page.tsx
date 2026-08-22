import type { Metadata } from "next";
import { ResultsExperience } from "@/components/results-experience";
import { paramsToAnswers } from "@/lib/matching";

export const metadata: Metadata = { title: "Deine Rahmen-Empfehlungen", description: "Persönlich gewichtete Bilderrahmen-Empfehlungen mit transparentem Match-Score." };

export default async function ResultsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <ResultsExperience answers={paramsToAnswers(await searchParams)} />;
}
