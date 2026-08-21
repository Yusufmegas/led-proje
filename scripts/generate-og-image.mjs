// public/og-image.png (1200x630) üretir.
// `output: "export"` altında next/og ImageResponse (edge runtime) çalışmadığı için
// OG görseli build dışında statik olarak üretilir ve app/layout.tsx metadata'sından servis edilir.
import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const INK = "#071526";
const ACCENT = "#b35600";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${INK}"/>
  <g fill="${ACCENT}">
    <rect x="96" y="150" width="28" height="28" rx="3"/>
    <rect x="132" y="150" width="28" height="28" rx="3"/>
  </g>
  <g fill="#ffffff">
    <rect x="96" y="186" width="28" height="28" rx="3"/>
    <rect x="132" y="186" width="28" height="28" rx="3"/>
  </g>
  <text x="96" y="330" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="700" fill="#ffffff">LED<tspan fill="${ACCENT}">Proje</tspan></text>
  <text x="96" y="400" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="400" fill="#dbe3ee">Profesyonel LED Ekran Sistemleri</text>
  <rect x="96" y="452" width="88" height="4" fill="${ACCENT}"/>
  <text x="96" y="524" font-family="Arial, Helvetica, sans-serif" font-size="27" font-weight="400" fill="#b7c7dc">Projelendirme &#183; Sistem entegrasyonu &#183; Montaj &#183; Teknik servis</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile("public/og-image.png", png);
console.log(`public/og-image.png yazildi — ${WIDTH}x${HEIGHT}, ${(png.length / 1024).toFixed(0)}KB`);
