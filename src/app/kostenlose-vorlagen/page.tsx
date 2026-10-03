import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { TemplateEvents } from "./template-events";

export const metadata: Metadata = {
  "title": "Bild und Rahmen messen. Kostenloses Aufmaßblatt als PDF.",
  "description": "Bilderrahmen-Aufmaßblatt kostenlos als PDF: Motivmaß, Ausschnitt, Einlegemaß und Außenmaß getrennt erfassen. Druckvorlage, ausfüllbares PDF und fiktives Beispiel.",
  "alternates": {
    "canonical": "https://bilderrahmen-finder.de/kostenlose-vorlagen"
  },
  "openGraph": {
    "title": "Bild und Rahmen messen. Kostenloses Aufmaßblatt als PDF.",
    "description": "Bilderrahmen-Aufmaßblatt kostenlos als PDF: Motivmaß, Ausschnitt, Einlegemaß und Außenmaß getrennt erfassen. Druckvorlage, ausfüllbares PDF und fiktives Beispiel.",
    "url": "https://bilderrahmen-finder.de/kostenlose-vorlagen",
    "type": "website",
    "images": [
      {
        "url": "https://bilderrahmen-finder.de/vorlagen/bild-rahmen-aufmass-vorschau.png",
        "alt": "Bild & Rahmen: dein Maßblatt"
      }
    ]
  }
};

export default function FreeTemplatesPage() { return (<><main className={styles.wrap}>
 <TemplateEvents />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@graph": [{"@type": "WebPage", "name": "Bild und Rahmen messen. Kostenloses Aufmaßblatt als PDF.", "description": "Bilderrahmen-Aufmaßblatt kostenlos als PDF: Motivmaß, Ausschnitt, Einlegemaß und Außenmaß getrennt erfassen. Druckvorlage, ausfüllbares PDF und fiktives Beispiel.", "url": "https://bilderrahmen-finder.de/kostenlose-vorlagen", "inLanguage": "de-DE", "dateModified": "2026-10-03"}, {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://bilderrahmen-finder.de"}, {"@type": "ListItem", "position": 2, "name": "Kostenlose Vorlagen", "item": "https://bilderrahmen-finder.de/kostenlose-vorlagen"}]}]}).replace(/</g,"\\u003c") }} />
 <nav className={styles.crumbs} aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><span>Kostenlose Vorlagen</span></nav>
 <header className={styles.hero}><div className={styles.eyebrow}>Kostenlose PDF-Vorlagen</div><h1>Bild und Rahmen messen. Kostenloses Aufmaßblatt als PDF.</h1><p>Einlegemaß ist nicht Außenmaß. Mit diesem Maßblatt behältst du Motiv, Passepartout und Rahmen getrennt im Blick, bevor du bestellst.</p><div className={styles.tags}><span>Ohne Anmeldung</span><span>1 Seite · DIN A4</span><span>Privat &amp; betrieblich nutzbar</span></div></header>
 <section className={styles.download} id="downloads" aria-labelledby="download-title"><div><Image className={styles.preview} src="/vorlagen/bild-rahmen-aufmass-vorschau.png" width={893} height={1263} alt="Vorschau: Aufmaßblatt für Bild und Rahmen" priority /><p className={styles.small}>Vorschau der ersten Seite. Die PDF enthält den vollständigen Bogen.</p></div><div><div className={styles.eyebrow}>Direkt herunterladen</div><h2 id="download-title">Bild & Rahmen: dein Maßblatt</h2><p>Ein übersichtlicher Bogen für deine eigenen Angaben. Wähle die Version, die zu deinem nächsten Schritt passt.</p><div className={styles.links}><a href="/vorlagen/bild-rahmen-aufmass.pdf" download data-template="bild-rahmen-aufmass" data-template-format="druck">PDF zum Ausdrucken<span>3 KB · PDF</span></a>
<a href="/vorlagen/bild-rahmen-aufmass-ausfuellbar.pdf" download data-template="bild-rahmen-aufmass" data-template-format="ausfuellbar">Ausfüllbares PDF<span>15 KB · PDF</span></a>
<a href="/vorlagen/bild-rahmen-aufmass-beispiel.pdf" download data-template="bild-rahmen-aufmass" data-template-format="beispiel">Fiktives Beispiel ansehen<span>4 KB · PDF</span></a>
</div><p className={styles.small}>Zum Ausfüllen die Datei zuerst herunterladen und in einem PDF-Programm mit Formularunterstützung öffnen. Danach unter einem neuen Dateinamen speichern. Browser-Vorschauen unterstützen Formularfelder unterschiedlich.</p></div></section>
 <section className={styles.instructions}><h2>So nutzt du die Vorlage.</h2><div className={styles.steps}><div className={styles.step}><b>01</b><p>Breite und Höhe deines Motivs oder Papiers in Zentimetern messen.</p></div><div className={styles.step}><b>02</b><p>Gewünschten Ausschnitt und das Einlegemaß des konkreten Rahmens getrennt erfassen.</p></div><div className={styles.step}><b>03</b><p>Außenmaß, Rahmentiefe und Lieferumfang mit der Maßzeichnung des Anbieters abgleichen.</p></div></div></section>
 <section className={styles.next}><div><h2>Vom Plan zum passenden Angebot.</h2><p>Mit deinen Notizen geht es weiter zur passenden Auswahl. Die Vorlage bleibt kostenlos; Produkte und zusätzliche Leistungen können kostenpflichtig sein.</p></div><Link href="/finder" data-template-next="bild-rahmen-aufmass">Passenden Bilderrahmen finden →</Link></section>
 <section className={styles.faq}><h2>Fragen zum Download.</h2><details><summary>Sind alle drei Versionen kostenlos?</summary><p>Ja. Druckvorlage, ausfüllbares PDF und fiktives Beispiel kannst du ohne Anmeldung und ohne E-Mail-Adresse herunterladen.</p></details><details><summary>Was muss ich bei den Angaben beachten?</summary><p>Es gibt keine allgemeine Umrechnungsformel vom Motivmaß zum Rahmen-Außenmaß. Die Maße hängen vom konkreten Rahmenprofil und Passepartout ab.</p></details><details><summary>Werden meine Einträge auf die Website übertragen?</summary><p>Nein. Du füllst die heruntergeladene Datei auf deinem Gerät aus. Formulareingaben werden nicht an uns gesendet.</p></details><details><summary>Wo finde ich weitere Hilfe?</summary><p><Link href="/ratgeber">Bilderrahmen-Ratgeber lesen →</Link></p></details></section>
 <p className={styles.license}>Nutzung: kostenlos für eigene private und betriebliche Zwecke, auch zum Anpassen und internen Weitergeben. Weiterverkauf oder Veröffentlichung der Dateien als eigenes Vorlagenangebot sind nicht erlaubt. Die Beispiele sind fiktiv. Stand: 03.10.2026.</p>
 </main></>); }
