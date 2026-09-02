import type { Metadata } from "next";
import Link from "next/link";
import { AmazonProductGrid } from "@/components/amazon-product-grid";
import { accessories } from "@/lib/products";

export const metadata: Metadata = { title: "Bilderrahmen-Kaufberatung", description: "Formate, Materialien, Passepartouts und Aufhängung verständlich erklärt – ohne erfundene Testsiegel.", alternates: { canonical: "/ratgeber" } };

export default function GuidePage() {
  return (
    <main className="editorial-page shell">
      <header className="editorial-hero"><p className="eyebrow">Kaufberatung ohne Fachchinesisch</p><h1>Der Rahmen soll dein Bild tragen – nicht mit ihm konkurrieren.</h1><p>Eine praktische Orientierung zu Format, Material, Farbe, Passepartout und Aufhängung. Du musst kein Einrichtungsexperte sein, um eine stimmige Entscheidung zu treffen.</p><Link className="button button-primary" href="/finder">Mit meinem Motiv starten</Link></header>
      <div className="article-layout">
        <aside><strong>In diesem Ratgeber</strong><a href="#format">Format</a><a href="#material">Material</a><a href="#passepartout">Passepartout</a><a href="#aufhaengung">Aufhängung</a></aside>
        <article>
          <section id="format"><span className="chapter-number">01</span><h2>Format: Erst das Motiv messen</h2><p>Miss Breite und Höhe des Motivs. Bei Passepartouts ist der Bildausschnitt kleiner als das Rahmenformat. Ein A4-Dokument braucht deshalb nicht automatisch einen A4-Rahmen, wenn du einen sichtbaren Rand möchtest.</p><div className="tip"><strong>Einfacher Check</strong><p>Motivmaß + gewünschter Rand + Falz des Rahmens = benötigtes Außenformat. Bei unklaren Angaben immer die Maßzeichnung des Angebots prüfen.</p></div></section>
          <section id="material"><span className="chapter-number">02</span><h2>Material: Wirkung und Alltag zusammen denken</h2><p>Holz wirkt warm und wohnlich, Metall meist feiner und grafischer, Kunststoff oft leichter und preisbewusster. Entscheidend ist neben der Optik auch das Gewicht – besonders bei großen Formaten und empfindlichen Wänden.</p></section>
          <section id="passepartout"><span className="chapter-number">03</span><h2>Passepartout: Abstand schafft Wirkung</h2><p>Ein Passepartout beruhigt kleine Motive und schafft Abstand zum Rahmen. Achte auf den tatsächlichen Ausschnitt, säurearme Materialien bei wertvollen Originalen und darauf, ob es im Lieferumfang enthalten ist.</p></section>
          <section id="aufhaengung"><span className="chapter-number">04</span><h2>Aufhängung: Die Wand entscheidet mit</h2><p>Beton, Gipskarton, Tapete und Fliesen brauchen unterschiedliche Lösungen. Das Gesamtgewicht aus Rahmen, Glas und Motiv muss unter der angegebenen Traglast bleiben. Im Zweifel eine geeignete Befestigung fachlich prüfen lassen.</p></section>
        </article>
      </div>
      <section className="related-section" id="zubehoer"><div className="section-heading"><div><p className="eyebrow">Ergänzungen</p><h2>Hilfreiches Zubehör</h2></div><p>Aus der erfassten Amazon-Auswahl</p></div><AmazonProductGrid products={accessories.slice(0, 6)} compact /></section>
    </main>
  );
}
