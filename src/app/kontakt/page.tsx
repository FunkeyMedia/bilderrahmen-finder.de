import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = { title: "Kontakt", description: "Fragen, Hinweise oder Korrekturen an bilderrahmen-finder.de senden." };
export default function ContactPage() { return <main className="contact-page shell"><header className="page-intro"><p className="eyebrow">Sag uns, was fehlt</p><h1>Fragen, Korrekturen oder eine gute Idee?</h1><p>Nutze das Formular. Es öffnet dein E-Mail-Programm und übermittelt keine Formulardaten an unsere Website.</p></header><ContactForm /><div className="operator-note"><strong>Technischer Betreiberhinweis</strong><p>Das Postfach kontakt@bilderrahmen-finder.de muss vor dem produktiven Start durch den Betreiber eingerichtet werden.</p></div></main>; }
