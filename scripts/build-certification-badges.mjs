// Standart ve uygunluk rozetlerini üretir: public/images/standards/*.svg
//
// NEDEN ÇİZİLİYOR, İNDİRİLMİYOR:
// ISO, belgeli firmalar için bir "ISO 9001 logosu" YAYINLAMAZ; ISO'nun kendi logosu
// tescillidir ve belge sahiplerince kullanılması açıkça yasaktır (marka hakkı
// belgelendirme kuruluşundadır). TSE amblemi de tescilli bir markadır. RoHS, EMC ve
// IP65 için ise resmî bir işaret hiç yoktur. Bu yüzden rozetler resmî amblemlerin
// kopyası değil, her standardın sektörde yerleşik AYIRT EDİCİ RENGİYLE çizilmiş
// tipografik işaretlerdir. Tek istisna CE'dir: CE işaretini üreticinin kendisi
// iliştirir, bu yüzden 765/2008 sayılı tüzükteki daire yaylı biçim korunmuştur.
// Firma belgelendirme kuruluşundan gerçek marka görselleri alırsa bu dosyalar aynı
// viewBox ile birebir değiştirilebilir.
//
// OPTİK HİZA: altı rozet de aynı 160×96 viewBox'ı, aynı çerçeveyi ve aynı alt vurgu
// çubuğunu kullanır; şeritte height:48px verildiğinde hepsi aynı yükseklikte durur.
//
// RENK/ERİŞİLEBİLİRLİK: metin ve glif renklerinin tamamı beyaz üzerinde WCAG AA
// (>=4.5:1) eşiğini geçer. CE'nin sarı çubuğu 1.51:1'dir; bu yüzden yalnız dekoratif
// vurgudur, hiçbir anlam taşımaz — anlam <img alt> ile verilir (bkz. lib/images.ts).
//
// Çalıştırma: node scripts/build-certification-badges.mjs
import { mkdir, writeFile } from "node:fs/promises";

const OUT = "public/images/standards";
const W = 160;
const H = 96;
const FONT = "Arial, Helvetica, sans-serif";
const MUTED = "#56647a";
const LINE = "#dbe3ee";

const esc = (v) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const word = (text, x, y, size, fill) =>
  `<text x="${x}" y="${y}" text-anchor="middle" font-family="${FONT}" font-size="${size}" font-weight="700" letter-spacing="0.5" fill="${fill}">${esc(text)}</text>`;

// CE işareti: iki eş dairenin yayından oluşur, E'nin orta kolu sağa uzar.
function ceMark(color) {
  const arc = (cx) => `<path d="M ${cx + 13.4} 31.9 A 18 18 0 1 0 ${cx + 13.4} 56.1" fill="none" stroke="${color}" stroke-width="7"/>`;
  return `${arc(57)}${arc(101)}<rect x="86" y="40.5" width="33" height="7" fill="${color}"/>`;
}

const badges = [
  {
    file: "ce.svg",
    title: "CE uygunluk işareti",
    accent: "#003399",
    // Sarı yalnız dekoratif: AB mavi/sarı çağrışımını verir, bilgi taşımaz.
    art: `${ceMark("#003399")}<rect x="56" y="80" width="48" height="4" rx="2" fill="#ffcc00"/>`,
  },
  {
    file: "iso9001.svg",
    title: "ISO 9001:2015 belgesi",
    accent: "#1a4f9c",
    art: `${word("ISO", 80, 46, 30, "#1a4f9c")}${word("9001:2015", 80, 66, 14, MUTED)}`,
  },
  {
    file: "tse.svg",
    title: "TSE belgesi",
    accent: "#c8102e",
    art: word("TSE", 80, 54, 34, "#c8102e"),
  },
  {
    file: "rohs.svg",
    title: "RoHS uygunluk",
    accent: "#1b6b2f",
    art: `<path d="M 24 48 L 34 58 L 50 36" fill="none" stroke="#1b6b2f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>${word("RoHS", 106, 57, 26, "#1b6b2f")}`,
  },
  {
    file: "emc.svg",
    title: "EMC uygunluk",
    accent: "#0f6fb8",
    art: `<circle cx="24" cy="50" r="4.5" fill="#0f6fb8"/><path d="M 33 40 A 13 13 0 0 1 33 60" fill="none" stroke="#0f6fb8" stroke-width="5" stroke-linecap="round"/><path d="M 43 33 A 22 22 0 0 1 43 67" fill="none" stroke="#0f6fb8" stroke-width="5" stroke-linecap="round"/>${word("EMC", 108, 57, 26, "#0f6fb8")}`,
  },
  {
    file: "ip65.svg",
    title: "IP65 koruma sınıfı",
    accent: "#0757d8",
    art: `<path d="M 32 30 C 32 30 19 45 19 53 A 13 13 0 0 0 45 53 C 45 45 32 30 32 30 Z" fill="#0757d8"/>${word("IP65", 106, 50, 25, "#0b1528")}${word("IP54", 106, 66, 12, MUTED)}`,
  },
];

function svg({ title, accent, art, file }) {
  // CE kendi sarı çubuğunu çiziyor; kalan beş rozet ortak vurgu çubuğunu alır.
  const bar = file === "ce.svg" ? "" : `<rect x="56" y="80" width="48" height="4" rx="2" fill="${accent}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)}">
  <title>${esc(title)}</title>
  <rect x="1.5" y="1.5" width="${W - 3}" height="${H - 3}" rx="9" fill="#ffffff" stroke="${LINE}" stroke-width="2"/>
  ${art}${bar}
</svg>
`;
}

await mkdir(OUT, { recursive: true });
for (const badge of badges) {
  const body = svg(badge);
  await writeFile(`${OUT}/${badge.file}`, body, "utf8");
  console.log(`ok  ${OUT}/${badge.file}  (${Buffer.byteLength(body)} B)`);
}
