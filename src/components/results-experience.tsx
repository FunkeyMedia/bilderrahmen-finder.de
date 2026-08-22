import Image from "next/image";
import Link from "next/link";
import { AffiliateLink } from "./affiliate-link";
import { frames } from "@/lib/products";
import { matchProducts, recommendationSet } from "@/lib/matching";
import type { FinderAnswers } from "@/lib/types";

export function ResultsExperience({ answers }: { answers: FinderAnswers }) {
  const results = recommendationSet(matchProducts(frames, answers));
  const compareIds = results.map((result) => result.product.id).join(",");
  const labels = ["Unsere beste Empfehlung für dich", "Die preisbewusste Alternative", "Die Premium- oder Spezialalternative"];

  return (
    <main className="results-page shell">
      <header className="results-header">
        <p className="eyebrow">Deine persönliche Auswahl</p>
        <h1>Drei Wege zu einem Rahmen, der wirklich passt.</h1>
        <p>Die Reihenfolge entsteht aus deinen Antworten. Preise und Produktangaben sind eine Momentaufnahme vom 22.08.2026 und werden vor dem Kauf bei Amazon geprüft.</p>
        <div className="results-actions"><Link className="button button-secondary" href="/finder">Antworten anpassen</Link><Link className="text-link" href={`/vergleich?ids=${compareIds}`}>Alle drei direkt vergleichen →</Link></div>
      </header>
      <div className="result-stack">
        {results.map((result, index) => (
          <article className={`result-card result-${index + 1}`} key={result.product.id}>
            <div className="result-visual">
              <span className="result-number">0{index + 1}</span>
              <Image src={result.product.image} alt={`${result.product.name} – generische KI-Produktillustration`} fill sizes="(max-width: 800px) 90vw, 38vw" priority={index === 0} />
            </div>
            <div className="result-copy">
              <p className="result-label">{labels[index]}</p>
              <div className="score-line"><strong>{result.score}%</strong><span>Match-Score</span></div>
              <h2>{result.product.name}</h2>
              <p>{result.product.summary}</p>
              <div className="result-columns">
                <div><h3>Warum passend</h3><ul>{result.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></div>
                <div><h3>Darauf achten</h3><ul>{result.caveats.map((caveat) => <li key={caveat}>{caveat}</li>)}</ul></div>
              </div>
              <dl className="fact-row"><div><dt>Budget</dt><dd>{result.product.priceLabel}</dd></div><div><dt>Format</dt><dd>{result.product.size}</dd></div><div><dt>Material</dt><dd>{result.product.material ?? "nicht eindeutig"}</dd></div></dl>
              <div className="result-buttons">
                <AffiliateLink asin={result.product.asin} context={`results-${index + 1}`} />
                <Link className="detail-link" href={`/produkt/${result.product.id}`}>Vollständige Einordnung</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <section className="method-note"><h2>So liest du den Match-Score</h2><p>Der Score bewertet Passung, nicht allgemeine Qualität: Einsatz 28 Punkte, Format 24, Budget 18, Stil 12, Farbe 8, Platzierung 5 und Datenklarheit 5. Digitale und klassische Rahmen werden bei eindeutigem Wunsch voneinander ausgeschlossen.</p><Link href="/so-funktionierts">Komplette Methodik ansehen →</Link></section>
    </main>
  );
}
