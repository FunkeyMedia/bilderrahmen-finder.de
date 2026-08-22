"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Anfrage: ${String(form.get("subject") || "bilderrahmen-finder.de")}`);
    const body = encodeURIComponent(`Name: ${String(form.get("name") || "")}\n\n${String(form.get("message") || "")}`);
    setStatus("Dein E-Mail-Programm wird geöffnet. Bitte prüfe die Nachricht vor dem Senden.");
    window.location.href = `mailto:kontakt@bilderrahmen-finder.de?subject=${subject}&body=${body}`;
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>Betreff<input name="subject" required /></label>
      <label>Nachricht<textarea name="message" rows={7} required /></label>
      <button className="button button-primary" type="submit">Nachricht vorbereiten</button>
      <p role="status">{status}</p>
    </form>
  );
}
