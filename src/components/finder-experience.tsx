"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { frames } from "@/lib/products";
import { answersToParams, matchProducts } from "@/lib/matching";
import type { FinderAnswers } from "@/lib/types";

type AnswerKey = keyof FinderAnswers;
type Question = {
  key: AnswerKey;
  eyebrow: string;
  title: string;
  help: string;
  options: Array<{ value: string; label: string; note: string }>;
};

const questions: Question[] = [
  { key: "purpose", eyebrow: "Beginnen wir mit deinem Bild", title: "Was möchtest du einrahmen?", help: "Damit schließen wir unpassende Rahmenarten früh aus.", options: [
    { value: "photo", label: "Foto oder Porträt", note: "Erinnerungen, Familienbilder, Reisen" }, { value: "poster", label: "Poster oder Kunstdruck", note: "Grafik, Illustration oder großes Motiv" },
    { value: "gallery", label: "Mehrere Bilder", note: "Serie, Collage oder Bilderwand" }, { value: "document", label: "Urkunde oder Dokument", note: "Zertifikat, Abschluss oder Erinnerung" },
    { value: "digital", label: "Digitale Erinnerungen", note: "Wechselnde Fotos auf einem Display" }, { value: "unsure", label: "Ich bin nicht sicher", note: "Wir halten die Auswahl bewusst offen" },
  ]},
  { key: "size", eyebrow: "Das richtige Verhältnis", title: "Welche Größe hat dein Motiv?", help: "Miss das Motiv, nicht den Außenrand des bisherigen Rahmens.", options: [
    { value: "small", label: "Klein bis 15 × 20 cm", note: "Tischfotos und kleine Erinnerungen" }, { value: "a4", label: "A4 / ca. 21 × 30 cm", note: "Dokumente, Fotos und kleinere Prints" },
    { value: "30x40", label: "Etwa 30 × 40 cm", note: "Beliebtes Wandformat" }, { value: "50x70", label: "Etwa 50 × 70 cm", note: "Poster und Kunst mit Präsenz" },
    { value: "70x100", label: "Etwa 70 × 100 cm", note: "Große Statements an der Wand" }, { value: "unsure", label: "Noch nicht sicher", note: "Formatangaben später genau prüfen" },
  ]},
  { key: "placement", eyebrow: "Wo das Bild leben wird", title: "Wo soll der Rahmen stehen oder hängen?", help: "Die Rückwand und Aufhängung müssen zum Einsatzort passen.", options: [
    { value: "wall", label: "An der Wand", note: "Einzeln oder als Bilderwand" }, { value: "table", label: "Auf Tisch oder Regal", note: "Mit Aufsteller oder Standfuß" },
    { value: "both", label: "Beides wäre gut", note: "Flexibel umstellen" }, { value: "unsure", label: "Noch offen", note: "Wir bevorzugen vielseitige Lösungen" },
  ]},
  { key: "style", eyebrow: "Der Rahmen als Teil des Raums", title: "Welche Stimmung passt zu dir?", help: "Nicht der Trend entscheidet, sondern die Wirkung neben deinen Möbeln.", options: [
    { value: "minimal", label: "Klar und minimal", note: "Ruhige Linien, wenig Ablenkung" }, { value: "warm", label: "Warm und natürlich", note: "Holz, Eiche und wohnliche Töne" },
    { value: "classic", label: "Klassisch und wertig", note: "Metallische oder elegante Wirkung" }, { value: "playful", label: "Ausdrucksstark", note: "Farbe, Tiefe oder besondere Formen" },
    { value: "unsure", label: "Ich möchte offen bleiben", note: "Neutrale Gestaltung wird bevorzugt" },
  ]},
  { key: "color", eyebrow: "Die Verbindung zum Motiv", title: "Welche Rahmenfarbe suchst du?", help: "Ein Rahmen darf Kontrast schaffen oder sich bewusst zurücknehmen.", options: [
    { value: "black", label: "Schwarz", note: "Grafisch und kontrastreich" }, { value: "white", label: "Weiß", note: "Leicht und zurückhaltend" },
    { value: "wood", label: "Holz / Natur", note: "Warm und wohnlich" }, { value: "metal", label: "Metallisch", note: "Kühl, fein oder elegant" },
    { value: "colorful", label: "Farbe darf sichtbar sein", note: "Akzent oder Kinderzimmer" }, { value: "unsure", label: "Noch nicht entschieden", note: "Farbe wird schwächer gewichtet" },
  ]},
  { key: "budget", eyebrow: "Ein Rahmen, der auch finanziell passt", title: "In welcher Budgetklasse suchst du?", help: "Preise sind Momentaufnahmen. Den aktuellen Betrag siehst du immer bei Amazon.", options: [
    { value: "budget", label: "Preisbewusst", note: "Bis etwa 15 €" }, { value: "mid", label: "Ausgewogen", note: "Etwa 15 bis 35 €" },
    { value: "premium", label: "Premium oder Spezial", note: "Ab etwa 35 €" }, { value: "flexible", label: "Preis ist flexibel", note: "Passung zählt stärker als Budget" },
  ]},
];

export function FinderExperience() {
  const router = useRouter();
  const [mode, setMode] = useState<"guided" | "quick">("guided");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [ready, setReady] = useState(false);

  const activeQuestions = mode === "quick" ? questions.filter((q) => ["purpose", "size", "budget"].includes(q.key)) : questions;
  const question = activeQuestions[step] ?? activeQuestions[0];
  const preview = useMemo(() => matchProducts(frames, answers)[0], [answers]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem("bilderrahmen-finder-progress:v1");
        if (saved) setAnswers(JSON.parse(saved));
      } catch { /* Der Finder funktioniert auch ohne Browser-Speicher. */ }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function choose(value: string) {
    const next = { ...answers, [question.key]: value } as FinderAnswers;
    setAnswers(next);
    try { window.localStorage.setItem("bilderrahmen-finder-progress:v1", JSON.stringify(next)); } catch { /* optional */ }
    if (step === activeQuestions.length - 1) router.push(`/ergebnisse?${answersToParams(next)}`);
    else setStep((current) => current + 1);
  }

  function changeMode(nextMode: "guided" | "quick") {
    setMode(nextMode);
    setStep(0);
  }

  if (!ready) return <div className="finder-loading" aria-live="polite">Finder wird vorbereitet …</div>;

  return (
    <div className="finder-experience shell">
      <div className="finder-mode" aria-label="Finder-Modus">
        <button className={mode === "guided" ? "active" : ""} type="button" onClick={() => changeMode("guided")}>Geführt · 6 Fragen</button>
        <button className={mode === "quick" ? "active" : ""} type="button" onClick={() => changeMode("quick")}>Schnell · unter 1 Minute</button>
      </div>
      <div className="finder-topline">
        <button className="back-button" type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}>← Zurück</button>
        <span>Schritt {step + 1} von {activeQuestions.length}</span>
      </div>
      <div className="progress" aria-label={`Fortschritt: ${step + 1} von ${activeQuestions.length}`}><span style={{ width: `${((step + 1) / activeQuestions.length) * 100}%` }} /></div>
      <div className="finder-layout">
        <section className="finder-card" aria-labelledby="finder-question">
          <p className="eyebrow">{question.eyebrow}</p>
          <h1 id="finder-question">{question.title}</h1>
          <p>{question.help}</p>
          <div className="choice-grid">
            {question.options.map((option) => (
              <button type="button" key={option.value} aria-pressed={answers[question.key] === option.value} onClick={() => choose(option.value)}>
                <span><strong>{option.label}</strong><small>{option.note}</small></span><span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </section>
        <aside className="live-preview" aria-live="polite">
          <span>Live-Vorschau</span>
          {Object.keys(answers).length < 2 ? <p>Nach zwei Antworten zeigen wir dir eine erste Tendenz.</p> : preview ? <><strong>{preview.score}% Match</strong><p>{preview.product.name}</p><small>Die Vorschau wird mit jeder Antwort genauer.</small></> : <p>Wir verfeinern deine Auswahl.</p>}
        </aside>
      </div>
    </div>
  );
}
