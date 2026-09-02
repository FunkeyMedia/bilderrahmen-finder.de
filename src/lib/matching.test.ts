import { describe, expect, it } from "vitest";
import { frames } from "@/lib/products";
import { matchProducts, recommendationSet } from "@/lib/matching";
import type { MatchResult } from "@/lib/types";

describe("recommendation roles", () => {
  it("does not call a cheaper mid-price frame a premium alternative", () => {
    const recommendations = recommendationSet(matchProducts(frames, {
      purpose: "photo",
      size: "a4",
      placement: "wall",
      style: "minimal",
      color: "black",
      budget: "mid",
    })) as Array<MatchResult & { label?: string }>;

    expect(recommendations[2].product.price).toBeLessThan(recommendations[0].product.price ?? Number.POSITIVE_INFINITY);
    expect(recommendations[2].label).toBe("Weitere passende Alternative");
  });
});
