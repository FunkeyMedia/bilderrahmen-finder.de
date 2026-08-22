export type ProductKind = "frame" | "accessory";
export type Purpose = "photo" | "poster" | "gallery" | "document" | "digital" | "unsure";
export type SizeKey = "small" | "medium" | "a4" | "30x40" | "50x70" | "70x100" | "large" | "unsure";
export type StyleKey = "minimal" | "warm" | "classic" | "playful" | "unsure";
export type ColorKey = "black" | "white" | "wood" | "metal" | "colorful" | "neutral" | "unsure";
export type Placement = "wall" | "table" | "both" | "unsure";
export type PriceBand = "budget" | "mid" | "premium" | "flexible";

export interface Product {
  id: string;
  asin: string;
  kind: ProductKind;
  group: string;
  type: string;
  categoryLabel: string;
  brand: string;
  name: string;
  image: string;
  affiliateLink: string;
  amazonUrl: string;
  price: number | null;
  priceLabel: string;
  rating: number | null;
  reviews: number | null;
  prime: boolean;
  badge: string | null;
  sourceScore: number;
  size: string;
  sizeKey: SizeKey;
  material: string | null;
  colorLabel: string | null;
  colorKey: Exclude<ColorKey, "unsure">;
  purpose: Exclude<Purpose, "unsure">;
  style: Exclude<StyleKey, "unsure">;
  placement: Exclude<Placement, "unsure">;
  priceBand: PriceBand;
  summary: string;
  pros: string[];
  cons: string[];
  checkedAt: string;
}

export interface FinderAnswers {
  purpose?: Purpose;
  size?: SizeKey;
  placement?: Placement;
  style?: StyleKey;
  color?: ColorKey;
  budget?: PriceBand;
}

export interface MatchResult {
  product: Product;
  score: number;
  reasons: string[];
  caveats: string[];
  breakdown: Array<{ label: string; points: number; maximum: number }>;
}
