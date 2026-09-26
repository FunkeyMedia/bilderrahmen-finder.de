import type { Metadata } from "next";
import Link from "next/link";
import { AmazonProductGrid } from "@/components/amazon-product-grid";
import { digitalModels } from "@/data/digital-models";
import { SITE_URL } from "@/lib/config";
import { digitalFrames } from "@/lib/products";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Digitale Bilderrahmen mit WLAN, App & ohne WLAN",
  description: "Digitale Bilderrahmen entdecken: Modelle mit WLAN und Frameo-App, einfache Rahmen ohne WLAN sowie große Displays. Mit ehrlichen Hinweisen zu Speicher, Strom und Bedienung.",
  alternates: { canonical: "/digitale-bilderrahmen" },
  openGraph: {
    title: "Digitale Bilderrahmen entdecken",
    description: "WLAN, Frameo, Speicherkarte oder großes Display: Finde einen digitalen Bilderrahmen, der zu deinem Alltag passt.",
    url: "/digitale-bilderrahmen",
  },
};

const featuredIds = [
  "rahmen-b0ddkdkbt3", // 11-inch, higher-resolution option
  "rahmen-b0cvxbq2tf", // 10.1-inch Frameo option
  "rahmen-b0fh53q263", // wood-look Frameo option
  "rahmen-b0gdfbnphx", // 10.1-inch Wi-Fi option
  "rahmen-b0ggb7lwx8", // AiMOR app option
  "rahmen-b0gtwc2lk8", // AiMOR app option
  "rahmen-b0ds1y1k1k", // offline option
  "rahmen-b0ctmdn2rj", // offline option
];
const featuredFrames = featuredIds.flatMap((id) => {
  const product = digitalFrames.find((item) => item.id === id);
  return product ? [product] : [];
});

export default function DigitalFramesPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Digitale Bilderrahmen",
    url: `${SITE_URL}/digitale-bilderrahmen`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: featuredFrames.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${SITE_URL}/produkt/${product.id}`,
      })),
    },
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }} />
      <section className={`${styles.hero} shell`}>
        <div>
          <p className="eyebrow">Fotos, die täglich wieder auftauchen</p>
          <h1>Digitale Bilderrahmen <em>für echte Erinnerungen.</em></h1>
          <p>Vom einfachen Rahmen mit Speicherkarte bis zum WLAN-Bilderrahmen mit App: Hier findest du Modelle für verschiedene Arten, Fotos zu teilen und zu zeigen.</p>
          <div className={styles.heroActions}>
            <a className="button button-primary" href="#modelle">Modelle entdecken →</a>
            <a className="text-link" href="#kaufhilfe">Worauf achten?</a>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.heroFrame}><span>momente</span><i /></div>
          <div className={styles.heroNote}>Neue Fotos. Jeden Tag.</div>
        </div>
      </section>

      <section className={styles.quickLinks} aria-label="Themen auf dieser Seite">
        <div className="shell">
          <a href="#wlan">WLAN & App <span aria-hidden="true">↗</span></a>
          <a href="#ohne-wlan">Ohne WLAN <span aria-hidden="true">↗</span></a>
          <a href="#grosse-displays">Große Displays <span aria-hidden="true">↗</span></a>
          <a href="#kaufhilfe">Kaufhilfe <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className={`${styles.intro} shell`} id="kaufhilfe" aria-labelledby="digital-guide-title">
        <div className="section-heading">
          <div><p className="eyebrow">Schnelle Orientierung</p><h2 id="digital-guide-title">Welche Art passt zu dir?</h2></div>
        </div>
        <div className={styles.guideGrid}>
          <article id="wlan"><span>01 / Gemeinsam teilen</span><h3>WLAN & App</h3><p>Familie und Freunde können Fotos auch aus der Ferne schicken. Prüfe, welche App das Modell nutzt, ob mehrere Personen senden können und welche Funktionen ein Abo brauchen.</p></article>
          <article id="ohne-wlan"><span>02 / Einfach lokal</span><h3>Ohne WLAN</h3><p>Fotos kommen per SD-Karte oder USB auf den Rahmen. Das ist sinnvoll, wenn am Aufstellort kein WLAN verfügbar ist oder du bewusst ohne App auskommen möchtest.</p></article>
          <article id="grosse-displays"><span>03 / Mehr Bildfläche</span><h3>15,6 Zoll und größer</h3><p>Für größere Räume lohnt der Blick auf Displaygröße, Auflösung, Blickwinkel und Wandmontage. Ein großes Display braucht meist dauerhaft einen Stromanschluss.</p></article>
          <article><span>04 / Flexibel platzieren</span><h3>Mit Akku</h3><p>Ein Akkumodell lässt sich zeitweise ohne Kabel umstellen. Vergleiche die angegebene Laufzeit und plane regelmäßiges Laden ein. <a href="https://www.rollei.de/blogs/presse/rollei-erweitert-sortiment-neue-smart-frames-wifi-104-und-106-ab-sofort-erhaltlich" target="_blank" rel="noopener noreferrer">Beispiel von Rollei ↗</a></p></article>
        </div>
      </section>

      <section className={`${styles.productSection} shell`} id="modelle" aria-labelledby="amazon-digital-title">
        <div className="section-heading">
          <div><p className="eyebrow">Modelle bei Amazon</p><h2 id="amazon-digital-title">Digitale Bilderrahmen auf einen Blick.</h2></div>
          <Link href="/sortiment">Zum gesamten Sortiment →</Link>
        </div>
        <p className={styles.sectionIntro}>Diese Produktkacheln führen zu Amazon-Angeboten. Originalbilder, aktuelle Preise und Verfügbarkeit erscheinen nur, wenn die Amazon-Schnittstelle Daten liefert. Die Reihenfolge ist eine Themenauswahl, keine Testwertung.</p>
        <AmazonProductGrid products={featuredFrames} compact className={styles.amazonGrid} />
        <p className="data-disclaimer">Ohne Amazon-Originalbild zeigen wir eine generische KI-Illustration. Wir haben die Geräte nicht selbst getestet; technische Angaben und aktuelle Konditionen bitte beim Anbieter prüfen.</p>
      </section>

      <section className={styles.manufacturerSection} aria-labelledby="manufacturer-title">
        <div className="shell">
          <div className="section-heading"><div><p className="eyebrow">Weitere Modelle</p><h2 id="manufacturer-title">Aktuelle Modelle der Hersteller.</h2></div></div>
          <p className={styles.sectionIntro}>Die folgenden Modelle ergänzen die Auswahl um 10,1, 15,6 und 21,5 Zoll. Angaben stammen von den verlinkten Herstellerseiten, geprüft am 26.09.2026. Hier zeigen wir bewusst keine Preise oder Lagerbestände.</p>
          <div className={styles.modelGrid}>
            {digitalModels.map((model, index) => (
              <article className={styles.modelCard} key={model.id}>
                <div className={`${styles.modelVisual} ${index % 3 === 1 ? styles.visualMint : index % 3 === 2 ? styles.visualLime : ""}`} aria-hidden="true"><div className={styles.screen}><span>{model.screen}</span></div><small>Schematische Darstellung</small></div>
                <div className={styles.modelBody}>
                  <p className={styles.modelKicker}>{model.brand} · {model.feature}</p>
                  <h3>{model.name}</h3>
                  <p>{model.summary}</p>
                  <span className={styles.modelDetail}>{model.detail}</span>
                  <a href={model.url} target="_blank" rel="noopener noreferrer">Zur Herstellerseite <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.faq} shell`} aria-labelledby="faq-title">
        <p className="eyebrow">Häufige Fragen</p><h2 id="faq-title">Vor dem Kauf kurz klären.</h2>
        <div className={styles.faqGrid}>
          <article><h3>Braucht ein digitaler Bilderrahmen WLAN?</h3><p>Nein. Modelle ohne WLAN spielen Fotos meist von Speicherkarte oder USB ab. WLAN ist vor allem für das Teilen aus der Ferne praktisch.</p></article>
          <article><h3>Was bringt die Frameo-App?</h3><p>Bei kompatiblen Rahmen lassen sich Fotos vom Smartphone senden. Welche Funktionen kostenlos sind, hängt von der aktuellen App-Version und dem jeweiligen Modell ab.</p></article>
          <article><h3>Welche Displaygröße ist sinnvoll?</h3><p>Um 10 Zoll passt gut auf Tisch und Regal. 15,6 Zoll oder mehr kann im größeren Raum besser wirken. Achte zusätzlich auf Auflösung, Blickwinkel und Stellplatz.</p></article>
          <article><h3>Funktioniert ein Rahmen ohne Stromkabel?</h3><p>Die meisten Geräte brauchen Netzstrom. Für zeitweise kabellose Nutzung gibt es Modelle mit Akku; Laufzeit und Ladebedarf sollten zum Einsatz passen.</p></article>
        </div>
      </section>
    </main>
  );
}
