"use client";
import { useEffect } from "react";
import Script from "next/script";
export function TemplateEvents() {
 useEffect(() => {
 const target = window as unknown as { va?: (action: string, payload: unknown) => void; vaq?: unknown[][] };
 if (!target.va) target.va = (...args: [string, unknown]) => { target.vaq = target.vaq || []; target.vaq.push(args); };
 target.va("beforeSend", (event: { url: string }) => {
   try {
     if (new URL(event.url).pathname !== "/kostenlose-vorlagen") return null;
     return { ...event, url: "https://bilderrahmen-finder.de/kostenlose-vorlagen" };
   } catch { return null; }
 });
 const click = (event: MouseEvent) => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>("a[data-template], a[data-template-next]");
  if (!link) return;
  const name = link.dataset.template ? "template_download_click" : "template_offer_interest";
  const data: Record<string, string> = link.dataset.template
   ? { template_id: link.dataset.template, format: link.dataset.templateFormat || "druck" }
   : { template_id: link.dataset.templateNext || "", placement: "free_templates" };
  const va = (window as unknown as { va?: (action: string, payload: unknown) => void }).va; va?.("event", { name, data });
 };
 document.addEventListener("click", click);
 return () => document.removeEventListener("click", click);
 }, []);
 return <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />;
}
