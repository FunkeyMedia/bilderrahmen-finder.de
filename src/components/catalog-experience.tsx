"use client";

import { type ReactNode, useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { useAmazonItems } from "@/lib/use-amazon-items";
import type { Product } from "@/lib/types";

type FilterKey = "kind" | "material" | "color" | "shape" | "format" | "style" | "budget";
type Filters = Record<FilterKey, string[]>;
type SortKey = "recommended" | "name" | "budget" | "premium";

type FilterOption = { value: string; label: string };
type FilterGroup = { key: FilterKey; label: string; description: string; options: FilterOption[] };

const INITIAL_FILTERS: Filters = {
  kind: [],
  material: [],
  color: [],
  shape: [],
  format: [],
  style: [],
  budget: [],
};

const FILTER_GROUPS: FilterGroup[] = [
  {
    key: "kind",
    label: "Was suchst du?",
    description: "Rahmen oder hilfreiches Zubehör",
    options: [
      { value: "frame", label: "Bilderrahmen" },
      { value: "accessory", label: "Zubehör" },
    ],
  },
  {
    key: "material",
    label: "Material",
    description: "Welche Wirkung soll der Rahmen haben?",
    options: [
      { value: "wood", label: "Holz" },
      { value: "plastic", label: "Kunststoff" },
      { value: "metal", label: "Metall" },
      { value: "acrylic", label: "Acryl" },
      { value: "unknown", label: "Nicht angegeben" },
    ],
  },
  {
    key: "color",
    label: "Farbe",
    description: "Passend zu Bild, Wand oder Möbeln",
    options: [
      { value: "black", label: "Schwarz" },
      { value: "white", label: "Weiß" },
      { value: "wood", label: "Holzton" },
      { value: "metal", label: "Metallisch" },
      { value: "neutral", label: "Neutral" },
      { value: "colorful", label: "Farbig" },
    ],
  },
  {
    key: "shape",
    label: "Form",
    description: "Die Grundform deines Motivs",
    options: [
      { value: "square", label: "Quadratisch" },
      { value: "rectangle", label: "Rechteckig" },
      { value: "round", label: "Rund" },
      { value: "special", label: "Sonderform / unklar" },
    ],
  },
  {
    key: "format",
    label: "Format",
    description: "Wähle die ungefähre Bildgröße",
    options: [
      { value: "small", label: "Bis 15 × 20" },
      { value: "medium", label: "Ca. 20 × 30" },
      { value: "a4", label: "A4 / 21 × 30" },
      { value: "30x40", label: "30 × 40" },
      { value: "50x70", label: "50 × 70" },
      { value: "70x100", label: "70 × 100" },
      { value: "large", label: "Weitere große Formate" },
      { value: "unsure", label: "Nicht angegeben" },
    ],
  },
  {
    key: "style",
    label: "Stil",
    description: "Welche Stimmung gefällt dir?",
    options: [
      { value: "minimal", label: "Minimalistisch" },
      { value: "warm", label: "Warm & natürlich" },
      { value: "classic", label: "Klassisch" },
      { value: "playful", label: "Ausdrucksstark" },
    ],
  },
  {
    key: "budget",
    label: "Budget",
    description: "So viel möchtest du ungefähr investieren",
    options: [
      { value: "budget", label: "Preisbewusst" },
      { value: "mid", label: "Ausgewogen" },
      { value: "premium", label: "Premium" },
    ],
  },
];

const LABELS = new Map(FILTER_GROUPS.flatMap((group) => group.options.map((option) => [`${group.key}:${option.value}`, option.label])));
const PRICE_ORDER = { budget: 0, mid: 1, flexible: 1, premium: 2 } as const;
const NUMBER_PAIR = /(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)/i;

function FilterGroupIcon({ type }: { type: FilterKey }) {
  const paths: Record<FilterKey, ReactNode> = {
    kind: <><rect x="4" y="5" width="12" height="14" rx="1.5" /><path d="m8 15 2.7-3 2.2 2.1L16 10.5" /><path d="M8 8.5h.01" /></>,
    material: <><path d="M5 18V6l7-3 7 3v12l-7 3-7-3Z" /><path d="m5 6 7 3 7-3M12 9v12" /></>,
    color: <><path d="M12 3.5c-4.7 0-8.5 3.4-8.5 7.7 0 3.8 3.1 6.8 6.8 6.8h1.2c1 0 1.6-.9 1.2-1.8-.4-.9.2-1.9 1.2-1.9h2.3c2.4 0 4.3-1.9 4.3-4.3 0-3.6-3.8-6.5-8.5-6.5Z" /><path d="M7.8 10h.01M10 6.8h.01M14 6.8h.01M17 10h.01" /></>,
    shape: <><rect x="3.5" y="5" width="9" height="14" rx="1.5" /><circle cx="17" cy="10" r="3.5" /><path d="m14 19 3-5 3 5h-6Z" /></>,
    format: <><path d="M5 4v16M19 4v16M3 7h5M16 7h5M3 17h5M16 17h5" /><path d="M9.5 9.5h5v5h-5z" /></>,
    style: <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" /><path d="m5.5 14 .6 1.8 1.9.7-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.7.6-1.8Z" /></>,
    budget: <><circle cx="12" cy="12" r="8.5" /><path d="M14.8 8.2c-.7-.7-1.6-1-2.7-1-1.5 0-2.6.8-2.6 2s1 1.7 2.7 2.1c1.7.4 2.7.9 2.7 2.3s-1.2 2.3-2.9 2.3c-1.2 0-2.3-.4-3-1.2M12 5.5v13" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[type]}</svg>;
}

function productShape(product: Product) {
  const searchable = `${product.name} ${product.size}`.toLocaleLowerCase("de");
  if (/\brund|kreis|oval/.test(searchable)) return "round";
  const dimensions = searchable.match(NUMBER_PAIR);
  if (dimensions) {
    const width = Number(dimensions[1].replace(",", "."));
    const height = Number(dimensions[2].replace(",", "."));
    if (width > 0 && height > 0) return Math.abs(width - height) / Math.max(width, height) < 0.04 ? "square" : "rectangle";
  }
  if (/\ba[0-6]\b/.test(searchable)) return "rectangle";
  return "special";
}

function materialKey(product: Product) {
  const material = product.material?.toLocaleLowerCase("de") ?? "";
  if (material.includes("holz")) return "wood";
  if (material.includes("kunststoff")) return "plastic";
  if (material.includes("metall") || material.includes("aluminium")) return "metal";
  if (material.includes("acryl")) return "acrylic";
  return "unknown";
}

function matchesFilters(product: Product, filters: Filters) {
  const values: Record<FilterKey, string> = {
    kind: product.kind,
    material: materialKey(product),
    color: product.colorKey,
    shape: productShape(product),
    format: product.sizeKey,
    style: product.style,
    budget: product.priceBand,
  };

  return (Object.keys(filters) as FilterKey[]).every((key) => filters[key].length === 0 || filters[key].includes(values[key]));
}

function searchText(product: Product) {
  return [product.name, product.brand, product.categoryLabel, product.type, product.size, product.material, product.colorLabel, product.summary]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("de");
}

export function CatalogExperience({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase("de"));
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [visibleCount, setVisibleCount] = useState(24);

  const counts = useMemo(() => {
    const result = new Map<string, number>();
    for (const group of FILTER_GROUPS) {
      for (const option of group.options) {
        const count = products.filter((product) => {
          const filtersWithoutGroup = { ...filters, [group.key]: [option.value] };
          return matchesFilters(product, filtersWithoutGroup) && (!deferredQuery || searchText(product).includes(deferredQuery));
        }).length;
        result.set(`${group.key}:${option.value}`, count);
      }
    }
    return result;
  }, [deferredQuery, filters, products]);

  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => matchesFilters(product, filters) && (!deferredQuery || searchText(product).includes(deferredQuery)));
    return matches.toSorted((left, right) => {
      if (sort === "name") return left.name.localeCompare(right.name, "de");
      if (sort === "budget") return PRICE_ORDER[left.priceBand] - PRICE_ORDER[right.priceBand] || right.sourceScore - left.sourceScore;
      if (sort === "premium") return PRICE_ORDER[right.priceBand] - PRICE_ORDER[left.priceBand] || right.sourceScore - left.sourceScore;
      return right.sourceScore - left.sourceScore || left.name.localeCompare(right.name, "de");
    });
  }, [deferredQuery, filters, products, sort]);

  const activeFilters = (Object.keys(filters) as FilterKey[]).flatMap((key) => filters[key].map((value) => ({ key, value, label: LABELS.get(`${key}:${value}`) ?? value })));
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const { items: amazonItems, loading: amazonLoading } = useAmazonItems(visibleProducts.map((product) => product.asin));

  function toggleFilter(key: FilterKey, value: string) {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value],
    }));
    setVisibleCount(24);
  }

  function resetFilters() {
    setQuery("");
    setFilters(INITIAL_FILTERS);
    setSort("recommended");
    setVisibleCount(24);
  }

  return (
    <main className="catalog-page">
      <header className="catalog-hero shell">
        <div>
          <p className="eyebrow">Selbst entdecken</p>
          <h1>Alle Rahmen. <em>Deine Auswahl.</em></h1>
          <p>Durchsuche alle Rahmen und kombiniere Material, Farbe, Form, Format, Stil und Budget so, wie es für dein Bild passt.</p>
        </div>
        <aside aria-label="Alternative Produktauswahl">
          <span>Lieber führen lassen?</span>
          <p>Der Finder stellt dir nur die Fragen, die deine Empfehlung verändern.</p>
        <Link className="button button-secondary" href="/finder">Finder starten →</Link>
        </aside>
      </header>

      <section className="catalog-workspace" aria-labelledby="catalog-title">
        <div className="shell">
          <h2 className="sr-only" id="catalog-title">Rahmen durchsuchen und filtern</h2>
          <form className="catalog-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <div className="catalog-search-copy">
              <label htmlFor="catalog-query">Wonach suchst du?</label>
              <span>Tippe einfach Farbe, Material oder Größe ein.</span>
            </div>
            <div className="catalog-search-field">
              <span aria-hidden="true" />
              <input
                id="catalog-query"
                type="search"
                value={query}
                onChange={(event) => { setQuery(event.target.value); setVisibleCount(24); }}
                placeholder="Zum Beispiel schwarzer Holzrahmen 30 × 40"
                autoComplete="off"
              />
              {query ? <button type="button" onClick={() => setQuery("")} aria-label="Suche löschen">Löschen</button> : null}
            </div>
          </form>

          <div className="filter-panel-shell">
            <header className="filter-panel-heading">
              <div>
                <span className="filter-step">Schnellauswahl</span>
                <h3>Was passt zu deinem Bild?</h3>
                <p>Wähle nur aus, was dir wichtig ist. Alles andere darf offenbleiben.</p>
              </div>
              <a className="filter-result-jump" href="#catalog-results">
                <strong>{filteredProducts.length}</strong>
                <span>passende Produkte ansehen</span>
                <span aria-hidden="true">↓</span>
              </a>
            </header>

            <div className="filter-panel" aria-label="Produktfilter">
              {FILTER_GROUPS.map((group) => (
                <fieldset className="filter-group" key={group.key}>
                  <legend>
                    <span className="filter-group-icon"><FilterGroupIcon type={group.key} /></span>
                    <span><strong>{group.label}</strong><small>{group.description}</small></span>
                  </legend>
                  <div>
                    {group.options.map((option) => {
                      const selected = filters[group.key].includes(option.value);
                      const count = counts.get(`${group.key}:${option.value}`) ?? 0;
                      return (
                        <button
                          type="button"
                          key={option.value}
                          className={selected ? "active" : ""}
                          data-filter={group.key}
                          data-value={option.value}
                          aria-label={`${option.label}, ${count} Treffer`}
                          aria-pressed={selected}
                          onClick={() => toggleFilter(group.key, option.value)}
                          disabled={!selected && count === 0}
                        >
                          <span className="filter-option-mark" aria-hidden="true" />
                          <span>{option.label}</span>
                          <small>{count}</small>
                          <span className="filter-check" aria-hidden="true">✓</span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>

          <div className="catalog-controls">
            <div className="active-filter-row" aria-label="Aktive Filter">
              {activeFilters.length > 0 ? activeFilters.map((filter) => (
                <button type="button" key={`${filter.key}:${filter.value}`} onClick={() => toggleFilter(filter.key, filter.value)}>
                  {filter.label}<span aria-hidden="true">×</span><span className="sr-only"> entfernen</span>
                </button>
              )) : <span className="empty-filter-message"><span aria-hidden="true">✦</span> Starte mit einem Wunsch – mehrere lassen sich kombinieren.</span>}
              {activeFilters.length > 1 || query ? <button className="clear-filters" type="button" onClick={resetFilters}>Alles zurücksetzen</button> : null}
            </div>
            <label className="catalog-sort" htmlFor="catalog-sort">
              Sortieren
              <select id="catalog-sort" value={sort} onChange={(event) => { setSort(event.target.value as SortKey); setVisibleCount(24); }}>
                <option value="recommended">Empfohlene Reihenfolge</option>
                <option value="name">Name A–Z</option>
                <option value="budget">Preisbewusst zuerst</option>
                <option value="premium">Premium zuerst</option>
              </select>
            </label>
          </div>

          <div className="catalog-result-heading" id="catalog-results" aria-live="polite" aria-atomic="true">
            <p><strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "Treffer" : "Treffer"}</p>
            <span>{products.length} Rahmen und Zubehörprodukte insgesamt</span>
          </div>

          {visibleProducts.length > 0 ? (
            <>
              <div className="catalog-grid" aria-busy={amazonLoading}>
                {visibleProducts.map((product) => <ProductCard product={product} amazonItem={amazonItems[product.asin]} compact key={product.id} />)}
              </div>
              {visibleCount < filteredProducts.length ? (
                <div className="load-more">
                  <button className="button button-secondary" type="button" onClick={() => setVisibleCount((current) => current + 24)}>
                    Weitere Produkte anzeigen
                  </button>
                  <p>{visibleProducts.length} von {filteredProducts.length} Produkten sichtbar</p>
                </div>
              ) : null}
            </>
          ) : (
            <div className="catalog-empty">
              <span aria-hidden="true">0</span>
              <h2>Diese Kombination ist sehr speziell.</h2>
              <p>Entferne einen Filter oder starte mit dem Finder – dort können wir Prioritäten gegeneinander abwägen.</p>
              <div><button className="button button-secondary" type="button" onClick={resetFilters}>Filter zurücksetzen</button><Link className="text-link" href="/finder">Finder starten</Link></div>
            </div>
          )}

          <p className="data-disclaimer catalog-disclaimer">Produktabbildungen sind generische KI-Illustrationen, keine offiziellen Hersteller- oder Amazon-Fotos. Preise, Verfügbarkeit und Produktangaben können sich ändern; bitte vor dem Kauf bei Amazon prüfen.</p>
        </div>
      </section>
    </main>
  );
}
