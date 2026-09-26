export type DigitalModel = {
  id: string;
  brand: string;
  name: string;
  screen: string;
  feature: string;
  summary: string;
  detail: string;
  url: string;
};

// Specifications come from the linked manufacturer pages. No prices or stock claims are stored here.
export const digitalModels: DigitalModel[] = [
  {
    id: "rollei-103",
    brand: "Rollei",
    name: "Smart Frame WiFi 103",
    screen: "10,1 Zoll",
    feature: "WLAN & Frameo",
    summary: "Kompaktes Modell für Fotos aus der Familie: per App, Speicherkarte oder USB befüllbar.",
    detail: "32 GB · IPS-Touchscreen",
    url: "https://www.rollei.de/products/smart-frame-wifi-103",
  },
  {
    id: "denver-pff-1024",
    brand: "Denver",
    name: "PFF-1024BMK2",
    screen: "10,1 Zoll",
    feature: "WLAN & Frameo",
    summary: "Klassischer WLAN-Rahmen mit App-Freigabe und automatischer Nachtabschaltung.",
    detail: "16 GB · 1280 × 800 Pixel",
    url: "https://denver.eu/frameo/10-1/denver-pff-1024bmk2-black-119101040212",
  },
  {
    id: "rollei-107",
    brand: "Rollei",
    name: "Smart Frame WiFi 107",
    screen: "10,1 Zoll",
    feature: "App & Speicherkarte",
    summary: "Für alle, die Fotos aus der Ferne teilen und zusätzlich lokale Speichermedien nutzen möchten.",
    detail: "32 GB · IPS-Touchscreen",
    url: "https://www.rollei.de/products/smart-frame-wifi-107-30520",
  },
  {
    id: "denver-pff-1504",
    brand: "Denver",
    name: "PFF-1504B",
    screen: "15,6 Zoll",
    feature: "Großes Display",
    summary: "Mehr Bildfläche für Familienfotos, die auch aus etwas Abstand gut sichtbar sein sollen.",
    detail: "32 GB · Full HD · Frameo",
    url: "https://denver.eu/frameo/15/denver-pff-1504b-black-119101050170",
  },
  {
    id: "rollei-152",
    brand: "Rollei",
    name: "Smart Frame WiFi 152",
    screen: "15,6 Zoll",
    feature: "Großes Display",
    summary: "Großer IPS-Rahmen für die Wand oder das Sideboard, mit App und lokalen Übertragungswegen.",
    detail: "32 GB · Full HD · Frameo",
    url: "https://www.rollei.de/products/smarter-bilderrahmen-wifi-fameo-modell-152-50016",
  },
  {
    id: "rollei-211",
    brand: "Rollei",
    name: "Smart Frame WiFi 211",
    screen: "21,5 Zoll",
    feature: "XXL-Format",
    summary: "Für große Räume und sichtbarere Diashows: Full HD, App und zusätzliche Speicheroptionen.",
    detail: "32 GB · Full HD · Frameo",
    url: "https://www.rollei.de/products/smarter-bilderrahmen-smart-frame-wifi-211-30528",
  },
];
