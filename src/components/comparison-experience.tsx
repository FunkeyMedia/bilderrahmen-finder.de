"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { frames } from "@/lib/products";
import type { Product } from "@/lib/types";
import { AffiliateLink } from "./affiliate-link";

export function ComparisonExperience({ initialIds }: { initialIds: string[] }) {
  const initial = initialIds.map((id) => frames.find((product) => product.id === id)).filter((product): product is Product => Boolean(product)).slice(0, 4);
  const [selected, setSelected] = useState<Product[]>(initial.length >= 2 ? initial : frames.slice(0, 2));
  const [query, setQuery] = useState("");
  const choices = useMemo(() => frames.filter((product) => !selected.some((item) => item.id === product.id) && `${product.name} ${product.brand} ${product.size}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query, selected]);

  function add(product: Product) { if (selected.length < 4) setSelected((current) => [...current, product]); }
  function remove(id: string) { if (selected.length > 2) setSelected((current) => current.filter((product) => product.id !== id)); }

  return (
    <main className="compare-page shell">
      <header className="page-intro"><p className="eyebrow">Vergleichen ohne Tabellenwüste</p><h1>Die Unterschiede, die deine Entscheidung verändern.</h1><p>Wähle zwei bis vier Rahmen. Wir stellen Format, Wirkung, Platzierung, Budget und mögliche Grenzen zuerst gegenüber.</p></header>
      <div className="compare-toolbar">
        <label htmlFor="compare-search">Weiteren Rahmen suchen</label>
        <input id="compare-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Marke, Format oder Produktname" />
        {query && <div className="search-results">{choices.map((product) => <button type="button" key={product.id} onClick={() => { add(product); setQuery(""); }} disabled={selected.length >= 4}><span>{product.name}</span><small>{product.size} · {product.priceLabel}</small></button>)}</div>}
        <p>{selected.length} von maximal 4 Produkten ausgewählt</p>
      </div>
      <div className="compare-grid" style={{ "--columns": selected.length } as React.CSSProperties}>
        {selected.map((product, index) => (
          <article className="compare-card" key={product.id}>
            <div className="compare-rank">0{index + 1}</div>
            <div className="compare-image"><Image src={product.image} alt={`${product.name} – generische KI-Produktillustration`} fill sizes="(max-width: 700px) 82vw, 300px" /></div>
            <h2>{product.name}</h2>
            <dl>
              <div><dt>Wirkung</dt><dd>{({ minimal: "klar & ruhig", warm: "warm & natürlich", classic: "klassisch & wertig", playful: "ausdrucksstark" } as Record<string, string>)[product.style]}</dd></div>
              <div><dt>Format</dt><dd>{product.size}</dd></div>
              <div><dt>Platzierung</dt><dd>{product.placement === "wall" ? "Wand" : product.placement === "table" ? "Tisch/Regal" : "Wand oder Tisch"}</dd></div>
              <div><dt>Material</dt><dd>{product.material ?? "nicht eindeutig"}</dd></div>
              <div><dt>Preisstand</dt><dd>{product.priceLabel}<small>Stand {product.checkedAt}</small></dd></div>
              <div><dt>Wichtigste Grenze</dt><dd>{product.cons[0]}</dd></div>
            </dl>
            <AffiliateLink asin={product.asin} context="comparison" label="Bei Amazon prüfen" />
            <Link className="detail-link" href={`/produkt/${product.id}`}>Produktdetails</Link>
            <button className="remove-product" type="button" onClick={() => remove(product.id)} disabled={selected.length <= 2}>Aus Vergleich entfernen</button>
          </article>
        ))}
      </div>
      <p className="compare-note">Fehlende Angaben werden bewusst als „nicht eindeutig“ gezeigt. Der Vergleich behauptet keine eigenen Produkttests.</p>
    </main>
  );
}
