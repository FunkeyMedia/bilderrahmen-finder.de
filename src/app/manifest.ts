import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "bilderrahmen-finder.de", short_name: "Rahmen-Finder", description: "Der passende Rahmen für dein Bild.", start_url: "/", display: "standalone", background_color: "#f6f0e6", theme_color: "#152c2e" }; }
