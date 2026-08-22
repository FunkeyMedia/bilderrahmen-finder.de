export const SITE_NAME = "bilderrahmen-finder.de";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bilderrahmen-finder.de";
export const AMAZON_AFFILIATE_ID = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID ?? "onlinestarkei-21";
export const DATA_CHECKED_AT = "22.08.2026";

export function amazonAffiliateUrl(asin: string) {
  return `https://www.amazon.de/dp/${encodeURIComponent(asin)}/?tag=${encodeURIComponent(AMAZON_AFFILIATE_ID)}`;
}
