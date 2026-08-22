"use client";

import { amazonAffiliateUrl } from "@/lib/config";

interface AffiliateLinkProps {
  asin: string;
  label?: string;
  context: string;
  className?: string;
}

export function AffiliateLink({ asin, label = "Bei Amazon ansehen", context, className = "affiliate-button" }: AffiliateLinkProps) {
  const trackClick = () => {
    const body = JSON.stringify({ asin, context, occurredAt: new Date().toISOString() });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
    else void fetch("/api/events", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true });
  };

  return (
    <a
      className={className}
      href={amazonAffiliateUrl(asin)}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      onClick={trackClick}
      aria-label={`${label} – bezahlter Affiliate-Link, öffnet Amazon in einem neuen Tab`}
    >
      {label} <span aria-hidden="true">↗</span>
      <small>Affiliate-Link</small>
    </a>
  );
}
