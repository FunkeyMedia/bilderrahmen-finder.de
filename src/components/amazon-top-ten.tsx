"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { amazonTopTen } from "@/data/amazon-top-ten";
import { useAmazonItems } from "@/lib/use-amazon-items";
import { amazonAffiliateUrl } from "@/lib/config";
import { AffiliateLink } from "./affiliate-link";
import { AmazonPrice } from "./amazon-price";
import styles from "./amazon-top-ten.module.css";

export function AmazonTopTen() {
  const [expanded, setExpanded] = useState(false);
  const { items, loading } = useAmazonItems(amazonTopTen.items.map((item) => item.asin));
  return (
    <section className={`shell ${styles.section}`} id="amazon-top-10" aria-labelledby="top-ten-title">
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">Bei Amazon gefragt</p>
          <h2 id="top-ten-title">Zehn Rahmen. Ganz oben dabei.</h2>
          <p>Entdecke die Top 10 der Amazon-Bestseller in Bilderrahmen.</p>
        </div>
        <span className={styles.stamp}>TOP <strong>10</strong><span>Amazon-Bestseller</span></span>
      </div>
      <p className={styles.note}>Rangliste vom <time dateTime={amazonTopTen.checkedAt}>05.09.2026</time> · Nach Verkaufszahlen, kein Qualitätstest. Die Reihenfolge kann sich ändern. <a href={amazonTopTen.sourceUrl} target="_blank" rel="noopener noreferrer">Quelle bei Amazon ↗</a></p>
      <ol className={styles.grid} aria-label="Top 10 Bilderrahmen bei Amazon" aria-busy={loading}>
        {amazonTopTen.items.map((product, index) => {
          const live = items[product.asin];
          return (
            <li key={product.asin} hidden={!expanded && index >= 5}>
              <article className={styles.card}>
                <a className={styles.image} href={amazonAffiliateUrl(product.asin)} target="_blank" rel="sponsored nofollow noopener noreferrer" aria-label={`${product.name} bei Amazon – Affiliate-Link, neuer Tab`}>
                  <span className={styles.rank}>#{index + 1}</span>
                  {live?.image ? <Image src={live.image.url} alt={live.title ?? product.name} fill sizes="(max-width: 580px) 85vw, (max-width: 1000px) 42vw, 240px" unoptimized /> : <span className={styles.imageFallback}><svg viewBox="0 0 80 80" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><rect x="12" y="8" width="56" height="64" rx="3"/><path d="M21 17h38v46H21zM23 53l12-14 9 9 7-7 8 12"/><circle cx="48" cy="29" r="4"/></svg><small>{loading ? "Amazon-Bild wird geladen …" : "Originalbild bei Amazon ansehen"}</small></span>}
                </a>
                <div className={styles.body}>
                  <p className={styles.detail}>{product.detail}</p>
                  <h3>{product.name}</h3>
                  <div className={styles.price}>
                    {live?.price ? <><AmazonPrice amount={live.price.amount} currency={live.price.currency}/><small>Amazon-Preis · {new Date(live.fetchedAt).toLocaleString("de-DE", {timeZone:"Europe/Berlin", day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit"})} Uhr</small></> : <span>{loading ? "Preis wird geladen …" : "Preis bei Amazon prüfen"}</span>}
                  </div>
                  <AffiliateLink asin={product.asin} context="homepage-top-10" label="Bei Amazon ansehen" />
                </div>
              </article>
            </li>
          );
        })}
      </ol>
      <div className={styles.actions}>
        <button className="button button-secondary" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? "Weniger anzeigen ↑" : "Alle 10 Bestseller entdecken ↓"}</button>
        <Link href="/sortiment" className="text-link">Alle Rahmen durchstöbern →</Link>
      </div>
      <p className={styles.note}>Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Preise und Verfügbarkeit können sich ändern; maßgeblich sind die Angaben bei Amazon zum Kaufzeitpunkt.</p>
    </section>
  );
}
