export function AmazonPrice({ amount, currency }: { amount: number; currency: string }) {
  const parts = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).formatToParts(amount);
  const integer = parts.filter((part) => part.type === "integer" || part.type === "group").map((part) => part.value).join("");
  const fraction = parts.find((part) => part.type === "fraction")?.value ?? "00";
  const symbol = parts.find((part) => part.type === "currency")?.value ?? currency;
  const label = new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(amount);

  return (
    <span className="amazon-price" aria-label={label}>
      <span className="amazon-price-whole" aria-hidden="true">{integer}</span>
      <sup className="amazon-price-fraction" aria-hidden="true">{fraction}</sup>
      <span className="amazon-price-currency" aria-hidden="true">{symbol}</span>
    </span>
  );
}
