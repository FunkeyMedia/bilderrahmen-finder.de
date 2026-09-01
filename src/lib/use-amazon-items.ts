"use client";

import { useEffect, useMemo, useState } from "react";
import type { AmazonItemsResponse, AmazonLiveItem } from "@/lib/amazon-types";

function chunks<T>(values: T[], size: number) {
  return Array.from({ length: Math.ceil(values.length / size) }, (_, index) => values.slice(index * size, (index + 1) * size));
}

export function useAmazonItems(asins: string[]) {
  const key = [...new Set(asins)].sort().join(",");
  const normalizedAsins = useMemo(() => key ? key.split(",") : [], [key]);
  const [result, setResult] = useState<{ key: string; items: Record<string, AmazonLiveItem> }>({ key: "", items: {} });

  useEffect(() => {
    const controller = new AbortController();
    if (!key) return () => controller.abort();

    async function load() {
      const collected: Record<string, AmazonLiveItem> = {};
      for (const group of chunks(normalizedAsins, 10)) {
        try {
          const response = await fetch(`/api/amazon/items?asins=${encodeURIComponent(group.join(","))}`, { signal: controller.signal });
          if (!response.ok) continue;
          const payload = await response.json() as AmazonItemsResponse;
          for (const item of payload.items) collected[item.asin] = item;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") return;
        }
      }
      if (!controller.signal.aborted) setResult({ key, items: collected });
    }

    void load();
    return () => controller.abort();
  }, [key, normalizedAsins]);

  return { items: result.key === key ? result.items : {}, loading: Boolean(key) && result.key !== key };
}
