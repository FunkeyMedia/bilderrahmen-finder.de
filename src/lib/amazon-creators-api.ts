import "server-only";
import type { AmazonLiveItem } from "@/lib/amazon-types";

const API_URL = "https://creatorsapi.amazon/catalog/v1/getItems";
const MARKETPLACE = "www.amazon.de";
const TOKEN_ENDPOINTS: Record<string, string> = {
  "3.1": "https://api.amazon.com/auth/o2/token",
  "3.2": "https://api.amazon.co.uk/auth/o2/token",
  "3.3": "https://api.amazon.co.jp/auth/o2/token",
};

type TokenCache = { value: string; expiresAt: number };
let tokenCache: TokenCache | null = null;

function credentials() {
  const clientId = process.env.AMAZON_CREATORS_API_CLIENT_ID;
  const clientSecret = process.env.AMAZON_CREATORS_API_CLIENT_SECRET;
  const partnerTag = process.env.AMAZON_PARTNER_TAG ?? process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_ID ?? "onlinestarkei-21";
  const version = process.env.AMAZON_CREATORS_API_CREDENTIAL_VERSION ?? "3.2";
  return { clientId, clientSecret, partnerTag, version };
}

export function isAmazonCreatorsApiConfigured() {
  const { clientId, clientSecret } = credentials();
  return Boolean(clientId && clientSecret);
}

async function getAccessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.value;

  const { clientId, clientSecret, version } = credentials();
  if (!clientId || !clientSecret) throw new Error("Amazon Creators API ist nicht konfiguriert.");
  const endpoint = TOKEN_ENDPOINTS[version];
  if (!endpoint) throw new Error(`Unbekannte Amazon-Credential-Version: ${version}`);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      scope: "creatorsapi::default",
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Amazon-Authentifizierung fehlgeschlagen (${response.status}).`);
  const payload = await response.json() as { access_token?: string; expires_in?: number };
  if (!payload.access_token) throw new Error("Amazon hat kein Zugriffstoken zurückgegeben.");
  tokenCache = {
    value: payload.access_token,
    expiresAt: Date.now() + Math.max(300, payload.expires_in ?? 3600) * 1000,
  };
  return tokenCache.value;
}

type ApiImage = { url?: string; width?: number; height?: number };
type ApiMoney = { amount?: number; currency?: string; displayAmount?: string };
type ApiItem = {
  asin?: string;
  detailPageURL?: string;
  images?: { primary?: { large?: ApiImage; medium?: ApiImage } };
  itemInfo?: { title?: { displayValue?: string } };
  offersV2?: { listings?: Array<{ availability?: { message?: string; type?: string }; price?: { money?: ApiMoney } }> };
};

function normalizeItem(item: ApiItem, fetchedAt: string): AmazonLiveItem | null {
  if (!item.asin || !item.detailPageURL) return null;
  const image = item.images?.primary?.large ?? item.images?.primary?.medium;
  const listing = item.offersV2?.listings?.find((entry) => entry.price?.money) ?? item.offersV2?.listings?.[0];
  const money = listing?.price?.money;
  return {
    asin: item.asin,
    title: item.itemInfo?.title?.displayValue ?? null,
    detailPageUrl: item.detailPageURL,
    image: image?.url ? { url: image.url, width: image.width ?? 500, height: image.height ?? 500 } : null,
    price: typeof money?.amount === "number" && money.currency && money.displayAmount
      ? { amount: money.amount, currency: money.currency, displayAmount: money.displayAmount }
      : null,
    availability: listing?.availability?.message ?? listing?.availability?.type ?? null,
    fetchedAt,
  };
}

export async function getAmazonItems(asins: string[]) {
  const uniqueAsins = [...new Set(asins.map((asin) => asin.toUpperCase()))];
  if (uniqueAsins.length === 0 || uniqueAsins.length > 10 || uniqueAsins.some((asin) => !/^[A-Z0-9]{10}$/.test(asin))) {
    throw new Error("Amazon-Abfrage enthält ungültige ASINs.");
  }

  const token = await getAccessToken();
  const { partnerTag } = credentials();
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      "x-marketplace": MARKETPLACE,
    },
    body: JSON.stringify({
      itemIds: uniqueAsins,
      itemIdType: "ASIN",
      languagesOfPreference: ["de_DE"],
      currencyOfPreference: "EUR",
      marketplace: MARKETPLACE,
      partnerTag,
      resources: [
        "images.primary.large",
        "images.primary.medium",
        "itemInfo.title",
        "offersV2.listings.availability",
        "offersV2.listings.price",
      ],
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Amazon-Produktabruf fehlgeschlagen (${response.status}).`);
  const payload = await response.json() as {
    itemResults?: { items?: ApiItem[] };
    itemsResult?: { items?: ApiItem[] };
  };
  const fetchedAt = new Date().toISOString();
  const items = payload.itemResults?.items ?? payload.itemsResult?.items ?? [];
  return items.map((item) => normalizeItem(item, fetchedAt)).filter((item): item is AmazonLiveItem => item !== null);
}
