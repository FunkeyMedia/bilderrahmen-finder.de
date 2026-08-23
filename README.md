# bilderrahmen-finder.de

Ein transparenter, regelbasierter Produktfinder für Bilderrahmen. Die Website führt Menschen in wenigen verständlichen Schritten zu passenden Empfehlungen, erklärt jeden Treffer und ermöglicht einen übersichtlichen Vergleich von zwei bis vier Produkten.

## Marken- und Designidee

„Dein Bild hat schon eine Geschichte. Wir finden den Rahmen.“ verbindet die Wärme eines persönlichen Einrichtungsstücks mit der Klarheit einer modernen Entscheidungshilfe. Das Design nutzt warme Papierfarben, tiefes Petrol, Koralle, Mint und Lime, großzügige Flächen und eine redaktionelle Serifenschrift für einen eigenständigen Galerie-Charakter. Alle Kaufwege bleiben bewusst ruhig und transparent.

## Funktionsumfang

- geführter Finder mit sechs Fragen und Schnellmodus mit drei Fragen
- dynamische Folgefragen, Live-Vorschau, Zurück-Funktion und lokaler Zwischenstand
- transparente Match-Scores mit verständlicher Begründung
- drei kuratierte Empfehlungen: bester Treffer, preisbewusste Alternative und Premium-/Spezialoption
- vollständiges Produktsortiment mit Freitextsuche, Mehrfachfiltern, Trefferzahlen, Sortierung und schrittweisem Nachladen
- Vergleich von zwei bis vier Produkten mit den wichtigsten Unterschieden zuerst
- 250 lokale Beispieldatensätze: 200 Rahmen und 50 Zubehörprodukte
- 250 optimierte, lokal ausgelieferte WebP-Produktillustrationen
- statisch erzeugte Produktdetailseiten mit Produkt-Metadaten
- Ratgeber, Methodik, Vertrauens-, Kontakt- und Transparenzseiten
- Impressum und Datenschutz mit deutlich markierten Betreiberpflichten
- Affiliate-Klickmessung als datensparsames Ereignis ohne personenbezogene Daten
- responsive Oberfläche, Tastaturbedienung und Unterstützung für reduzierte Bewegung

## Technologie

- Next.js 16 mit App Router
- React 19 und TypeScript
- Tailwind CSS 4 plus projektspezifisches Designsystem in CSS
- lokale Bild- und Produktdaten; kein Laufzeit-CMS und keine externe Produkt-API
- Vercel für Hosting und Produktions-Deployment

## Lokal starten

Voraussetzungen: Node.js 20 oder neuer und pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Danach ist die Website unter `http://localhost:3000` erreichbar.

Qualitätsprüfung:

```bash
pnpm check
```

## Projektstruktur

```text
src/app/                 Seiten, Metadaten, Sitemap, robots.txt und Event-Endpunkt
src/components/          Finder, Sortiment, Ergebnisse, Vergleich und wiederverwendbare UI
src/data/products.json   normalisierter Produktkatalog
src/lib/                 Konfiguration, Typen, Datenzugriff und Match-Logik
public/products/         optimierte Produktillustrationen
```

Produktdaten, Empfehlungslogik und Benutzeroberfläche sind bewusst getrennt. So kann `src/data/products.json` später durch ein CMS, eine redaktionell gepflegte Datei oder eine Amazon-konforme Datenquelle ersetzt werden.

## Finder- und Ranking-Logik

Der Finder bewertet jedes Produkt deterministisch auf einer Skala von 0 bis 100. Die Gewichtung liegt in `src/lib/matching.ts`:

| Kriterium | Gewicht |
| --- | ---: |
| Einsatzzweck | 28 |
| Format | 24 |
| Budgetklasse | 18 |
| Stil | 12 |
| Farbe | 8 |
| Platzierung | 5 |
| Datenklarheit | 5 |

Digitale und klassische Rahmen schließen sich als Produkttyp gegenseitig aus. Unbekannte Werte werden nicht als sicherer Treffer ausgegeben. Das Ergebnis enthält den höchsten Gesamtscore sowie Alternativen für Preis und Spezialisierung. Jeder Score wird aus denselben Regeln und den sichtbaren Antworten berechnet.

## Produktdaten ergänzen

1. In `src/data/products.json` ein neues Objekt nach dem vorhandenen Schema ergänzen.
2. Eine WebP-Datei unter `public/products/<produkt-id>.webp` ablegen.
3. `imagePath` auf diese Datei setzen und eine aussagekräftige `imageAlt`-Beschreibung eintragen.
4. Eigenschaften wie Typ, Stil, Formate, Farben, Platzierung, Budgetklasse, Vorteile, Grenzen und Datenklarheit vollständig pflegen.
5. `pnpm check` ausführen und Finder, Produktdetailseite und Vergleich kontrollieren.

Aktuelle Preise, Bewertungen, Rabatte und Verfügbarkeit werden bewusst nicht gespeichert oder behauptet. Vor der Aufnahme echter Produkte müssen Katalogdaten und Medienrechte redaktionell sowie nach den Bedingungen des Amazon-Partnerprogramms geprüft werden.

## Amazon-Affiliate-Konfiguration

Die Partner-ID wird zentral in `src/lib/config.ts` verwaltet. Standardwert ist `onlinestarkei-21`; für Deployments kann sie überschrieben werden:

```text
NEXT_PUBLIC_AMAZON_AFFILIATE_ID=onlinestarkei-21
```

Affiliate-Links werden aus der ASIN erzeugt, sichtbar gekennzeichnet, in einem neuen Tab geöffnet und mit `sponsored`, `nofollow`, `noopener` und `noreferrer` abgesichert. Der Endpunkt `/api/events` nimmt ausschließlich ein minimales Klickereignis mit Produkt-ID und ASIN entgegen und speichert im aktuellen Stand keine Nutzerdaten dauerhaft.

## Umgebungsvariablen

| Variable | Zweck |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | kanonische Produktions-URL für Metadaten, Sitemap und strukturierte Daten |
| `NEXT_PUBLIC_AMAZON_AFFILIATE_ID` | zentrale Amazon-Partner-ID |

## Deployment auf Vercel

Das Repository in Vercel importieren, die beiden Variablen aus `.env.example` als Production-Variablen setzen und deployen. Bei einer eigenen Domain anschließend `NEXT_PUBLIC_SITE_URL` auf die endgültige HTTPS-Adresse ändern und neu deployen.

## Vor dem produktiven Betrieb

- Betreibername, ladungsfähige Anschrift, E-Mail-Adresse und gegebenenfalls weitere Pflichtangaben in Impressum und Datenschutz ergänzen.
- Rechtstexte durch eine qualifizierte Stelle prüfen lassen; sie sind keine Rechtsberatung.
- Kontaktadresse und Domain festlegen.
- Rechte, Herkunft und Aktualität aller Produktdaten und Produktbilder prüfen.
- Amazon-Partnerkonto, Linkvorgaben und Kennzeichnung abschließend kontrollieren.
- Falls eine dauerhafte Analyse eingebaut wird: Consent-, Aufbewahrungs- und Datenschutzkonzept ergänzen.

## Datenstatus

Der enthaltene Katalog ist ausdrücklich ein Beispieldatensatz. Produktmerkmale stammen aus der vorbereiteten Projektquelle und können unvollständig sein. Die Website behauptet keine eigenen Produkttests und zeigt keine erfundenen Echtzeitpreise, Bewertungen oder Lieferinformationen.
