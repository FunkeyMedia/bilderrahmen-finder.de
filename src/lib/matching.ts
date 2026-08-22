import type { FinderAnswers, MatchResult, Product } from "./types";

const labels = {
  purpose: "Anwendungsfall",
  size: "Format",
  budget: "Budget",
  style: "Wohnstil",
  color: "Farbwunsch",
  placement: "Platzierung",
  completeness: "Datenklarheit",
};

const weights = { purpose: 28, size: 24, budget: 18, style: 12, color: 8, placement: 5, completeness: 5 };

const adjacentSizes: Record<string, string[]> = {
  small: ["medium", "a4"], medium: ["small", "a4", "30x40"], a4: ["medium", "30x40"],
  "30x40": ["a4", "medium", "50x70"], "50x70": ["30x40", "large", "70x100"], "70x100": ["50x70", "large"], large: ["50x70", "70x100"],
};

function ratio(actual: string, wanted: string | undefined, kind: keyof typeof weights) {
  if (!wanted || wanted === "unsure" || wanted === "flexible") return 1;
  if (actual === wanted) return 1;
  if (kind === "size" && adjacentSizes[wanted]?.includes(actual)) return 0.62;
  if (kind === "budget") {
    const order = ["budget", "mid", "premium"];
    return Math.abs(order.indexOf(actual) - order.indexOf(wanted)) === 1 ? 0.52 : 0.12;
  }
  if (kind === "placement" && (actual === "both" || wanted === "both")) return 0.78;
  if (kind === "color" && actual === "neutral") return 0.58;
  if (kind === "purpose" && ((actual === "photo" && wanted === "gallery") || (actual === "gallery" && wanted === "photo"))) return 0.58;
  return 0.08;
}

function reasonFor(product: Product, key: string) {
  const map: Record<string, string> = {
    purpose: `passt zum gewünschten Einsatz „${purposeLabel(product.purpose)}“`,
    size: `trifft das gesuchte Format mit ${product.size}`,
    budget: `liegt in der gewünschten Budgetklasse`,
    style: `passt gestalterisch zum gewählten Wohnstil`,
    color: `greift den gewünschten Farbeindruck auf`,
    placement: `eignet sich für die gewünschte Platzierung`,
  };
  return map[key];
}

export function purposeLabel(value: string) {
  return ({ photo: "Foto", poster: "Poster/Kunstdruck", gallery: "Bilderwand", document: "Dokument", digital: "digitale Bilder" } as Record<string, string>)[value] ?? value;
}

export function matchProducts(products: Product[], answers: FinderAnswers): MatchResult[] {
  const digitalRequested = answers.purpose === "digital";
  const analogRequested = Boolean(answers.purpose && !["unsure", "digital"].includes(answers.purpose));
  const hardFiltered = products.filter((product) => {
    if (digitalRequested) return product.purpose === "digital";
    if (analogRequested) return !["digital"].includes(product.purpose);
    return true;
  });

  return hardFiltered.map((product) => {
    const dimensions = [
      ["purpose", ratio(product.purpose, answers.purpose, "purpose")],
      ["size", ratio(product.sizeKey, answers.size, "size")],
      ["budget", ratio(product.priceBand, answers.budget, "budget")],
      ["style", ratio(product.style, answers.style, "style")],
      ["color", ratio(product.colorKey, answers.color, "color")],
      ["placement", ratio(product.placement, answers.placement, "placement")],
    ] as const;
    const completeness = [product.sizeKey !== "unsure", Boolean(product.material), Boolean(product.colorLabel)].filter(Boolean).length / 3;
    const breakdown = dimensions.map(([key, value]) => ({ label: labels[key], points: Math.round(value * weights[key] * 10) / 10, maximum: weights[key] }));
    breakdown.push({ label: labels.completeness, points: Math.round(completeness * weights.completeness * 10) / 10, maximum: weights.completeness });
    const score = Math.max(1, Math.min(99, Math.round(breakdown.reduce((sum, item) => sum + item.points, 0))));
    const reasons = dimensions
      .filter(([, value]) => value >= 0.75)
      .map(([key]) => reasonFor(product, key))
      .filter(Boolean)
      .slice(0, 3);
    const caveats = [...product.cons];
    if (answers.size && answers.size !== "unsure" && product.sizeKey !== answers.size) caveats.unshift("Format ist nur eine Annäherung – Maße unbedingt prüfen");
    return { product, score, reasons, caveats: [...new Set(caveats)].slice(0, 3), breakdown };
  }).sort((a, b) => b.score - a.score || b.product.sourceScore - a.product.sourceScore);
}

export function recommendationSet(results: MatchResult[]) {
  const best = results[0];
  const budget = results.find((result) => result.product.id !== best?.product.id && result.product.priceBand === "budget") ?? results[1];
  const premium = results.find((result) => ![best?.product.id, budget?.product.id].includes(result.product.id) && ["premium", "mid"].includes(result.product.priceBand)) ?? results[2];
  return [best, budget, premium].filter((result): result is MatchResult => Boolean(result));
}

export function answersToParams(answers: FinderAnswers) {
  const params = new URLSearchParams();
  Object.entries(answers).forEach(([key, value]) => { if (value) params.set(key, value); });
  return params.toString();
}

export function paramsToAnswers(params: Record<string, string | string[] | undefined>): FinderAnswers {
  const value = (key: string) => typeof params[key] === "string" ? params[key] : undefined;
  return {
    purpose: value("purpose") as FinderAnswers["purpose"], size: value("size") as FinderAnswers["size"],
    placement: value("placement") as FinderAnswers["placement"], style: value("style") as FinderAnswers["style"],
    color: value("color") as FinderAnswers["color"], budget: value("budget") as FinderAnswers["budget"],
  };
}
