import Image from "next/image";
import Link from "next/link";
import { AmazonProductGrid } from "@/components/amazon-product-grid";
import { frames } from "@/lib/products";
import { AmazonTopTen } from "@/components/amazon-top-ten";

export default function Home() {
  return (
    <main>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Weniger suchen. Stimmiger rahmen.</p>
          <h1 id="hero-title">
            Dein Bild hat schon eine Geschichte. <em>Wir finden den Rahmen.</em>
          </h1>
          <p className="hero-intro">
            Beantworte ein paar einfache Fragen und erhalte eine nachvollziehbare
            Empfehlung aus 200 ausgewählten Bilderrahmen – passend zu Motiv,
            Format, Stil und Budget.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/finder">
              Rahmen-Finder starten <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button-quiet" href="/sortiment">
              Alle Rahmen
            </Link>
            <a className="text-link" href="#so-gehts">
              Erst verstehen, wie es geht
            </a>
          </div>
          <ul className="trust-line" aria-label="Vorteile des Finders">
            <li>kostenlos</li>
            <li>ohne Anmeldung</li>
            <li>transparent erklärt</li>
          </ul>
        </div>

        <div className="hero-art" aria-label="Drei schwarze Bilderrahmen als Beispiel">
          <div className="art-sun" aria-hidden="true" />
          <div className="art-caption">
            <span>01</span>
            <p>Form, Farbe, Wirkung – als klare Entscheidung statt endloser Liste.</p>
          </div>
          <Image
            src="/hero-frames.png"
            alt="Drei unterschiedlich ausgerichtete schwarze Bilderrahmen"
            width={760}
            height={760}
            priority
            sizes="(max-width: 900px) 90vw, 46vw"
          />
        </div>
      </section>

      <section className="proof-strip" aria-label="Datenbasis">
        <div className="shell proof-grid">
          <p><strong>200</strong><span>Rahmen vorausgewählt</span></p>
          <p><strong>50</strong><span>Zubehör-Ideen</span></p>
          <p><strong>100 %</strong><span>regelbasiert erklärt</span></p>
          <p><strong>0</strong><span>erfundene Testsiegel</span></p>
        </div>
      </section>

      <AmazonTopTen />

      <section className="pathways shell" aria-labelledby="pathways-title">
        <div className="section-heading">
          <div><p className="eyebrow">Zwei Wege zum passenden Rahmen</p><h2 id="pathways-title">Lass dich führen. Oder entdecke selbst.</h2></div>
        </div>
        <div className="pathway-grid">
          <article>
            <div className="pathway-visual" aria-hidden="true">
              <Image src="/home/finder-guidance-v1.jpg" alt="" width={1536} height={1024} sizes="(max-width: 860px) 100vw, 48vw" />
              <span>01</span>
            </div>
            <div className="pathway-copy">
              <p className="pathway-label">Persönliche Empfehlung</p>
              <h3>Der Rahmen-Finder denkt deine Anforderungen zusammen.</h3>
              <p>Ideal, wenn du schnell eine nachvollziehbare Auswahl aus drei passenden Produkten möchtest.</p>
              <Link className="button button-primary" href="/finder">Finder starten →</Link>
            </div>
          </article>
          <article>
            <div className="pathway-visual" aria-hidden="true">
              <Image src="/home/frame-catalog-v1.jpg" alt="" width={1536} height={1024} sizes="(max-width: 860px) 100vw, 48vw" />
              <span>02</span>
            </div>
            <div className="pathway-copy">
              <p className="pathway-label">Alle Rahmen entdecken</p>
              <h3>Du suchst selbst – mit Filtern statt endlosem Scrollen.</h3>
              <p>Durchsuche alle 250 Produkte und kombiniere Holz, Schwarz, quadratisch, Format und weitere Eigenschaften.</p>
              <Link className="button button-secondary" href="/sortiment">Alle Rahmen →</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="process shell" id="so-gehts" aria-labelledby="process-title">
        <p className="eyebrow">Vom Motiv zur Entscheidung</p>
        <h2 id="process-title">Ein guter Rahmen beginnt nicht beim Produkt. Sondern bei dir.</h2>
        <div className="process-grid">
          {[
            ["01", "brief", "Du zeigst uns dein Vorhaben", "Motiv, Format, Ort und Stil – nur Fragen, die das Ergebnis wirklich verändern."],
            ["02", "score", "Wir gewichten, statt zu raten", "Jede Antwort fließt sichtbar in einen Match-Score ein. Ausschlusskriterien verhindern unpassende Treffer."],
            ["03", "choice", "Du bekommst eine klare Auswahl", "Ein bester Treffer, eine preisbewusste Alternative und eine besondere Option – inklusive ehrlicher Grenzen."],
          ].map(([number, icon, title, body]) => (
            <article key={number}>
              <div className="process-card-top">
                <span className={`process-icon process-icon-${icon}`} aria-hidden="true"><i /><i /><i /></span>
                <span className="process-number">{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <Link className="button button-secondary" href="/finder">
          Jetzt in weniger als einer Minute starten
        </Link>
      </section>

      <section className="featured-section shell" aria-labelledby="featured-title">
        <div className="section-heading">
          <div><p className="eyebrow">Nicht „die Besten“. Sondern passend.</p><h2 id="featured-title">Drei Beispiele, drei unterschiedliche Aufgaben.</h2></div>
          <Link href="/vergleich">Produkte vergleichen →</Link>
        </div>
        <AmazonProductGrid products={[frames[1], frames[0], frames.find((product) => product.sizeKey === "50x70") ?? frames[2]]} />
        <p className="data-disclaimer">Produktabbildungen sind generische KI-Illustrationen, keine offiziellen Hersteller- oder Amazon-Fotos. Preise und Angaben: Momentaufnahme vom 22.08.2026.</p>
      </section>

      <section className="trust-section">
        <div className="shell trust-layout">
          <div><p className="eyebrow">Vertrauen ohne Siegeltheater</p><h2>Wir zeigen auch, was wir nicht wissen.</h2></div>
          <div className="trust-points">
            <article><span>01</span><h3>Keine erfundenen Tests</h3><p>Wir ordnen erfasste Produkteigenschaften ein und behaupten keine eigene Labor- oder Langzeiterfahrung.</p></article>
            <article><span>02</span><h3>Affiliate offen erklärt</h3><p>Amazon-Links sind gekennzeichnet. Eine mögliche Provision verändert weder Match-Score noch Reihenfolge.</p></article>
            <article><span>03</span><h3>Unsicherheit bleibt sichtbar</h3><p>Fehlende Maße oder Materialien werden nicht schöngefärbt, sondern als Prüfschritt genannt.</p></article>
          </div>
        </div>
      </section>

      <section className="final-cta shell">
        <p className="eyebrow">Bereit für dein Bild?</p>
        <h2>Sechs Fragen. Drei verständliche Empfehlungen. Eine bessere Entscheidung.</h2>
        <div><Link className="button button-primary" href="/finder">Finder starten →</Link><Link className="text-link" href="/so-funktionierts">So rechnen wir</Link></div>
      </section>
    </main>
  );
}
