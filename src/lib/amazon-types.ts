export interface AmazonLiveItem {
  asin: string;
  title: string | null;
  detailPageUrl: string;
  image: {
    url: string;
    width: number;
    height: number;
  } | null;
  price: {
    amount: number;
    currency: string;
    displayAmount: string;
  } | null;
  availability: string | null;
  fetchedAt: string;
}

export interface AmazonItemsResponse {
  items: AmazonLiveItem[];
  source: "amazon-creators-api" | "unavailable";
  fetchedAt: string;
  message?: string;
}
