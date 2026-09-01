import { NextRequest, NextResponse } from "next/server";
import { getAmazonItems, isAmazonCreatorsApiConfigured } from "@/lib/amazon-creators-api";
import type { AmazonItemsResponse } from "@/lib/amazon-types";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const asins = (request.nextUrl.searchParams.get("asins") ?? "")
    .split(",")
    .map((asin) => asin.trim().toUpperCase())
    .filter(Boolean);
  const fetchedAt = new Date().toISOString();

  if (asins.length === 0 || asins.length > 10 || asins.some((asin) => !/^[A-Z0-9]{10}$/.test(asin))) {
    return NextResponse.json({ items: [], source: "unavailable", fetchedAt, message: "Bis zu zehn gültige ASINs sind erforderlich." } satisfies AmazonItemsResponse, { status: 400 });
  }

  if (!isAmazonCreatorsApiConfigured()) {
    return NextResponse.json({ items: [], source: "unavailable", fetchedAt, message: "Live-Daten sind noch nicht freigeschaltet." } satisfies AmazonItemsResponse, {
      status: 503,
      headers: { "cache-control": "no-store" },
    });
  }

  try {
    const items = await getAmazonItems(asins);
    return NextResponse.json({ items, source: "amazon-creators-api", fetchedAt } satisfies AmazonItemsResponse, {
      headers: { "cache-control": "public, s-maxage=3600, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Amazon Creators API request failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ items: [], source: "unavailable", fetchedAt, message: "Amazon-Live-Daten sind momentan nicht erreichbar." } satisfies AmazonItemsResponse, {
      status: 502,
      headers: { "cache-control": "no-store" },
    });
  }
}
