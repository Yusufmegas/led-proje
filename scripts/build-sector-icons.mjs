// Projeler sayfası sektör kartlarının ikonlarını üretir: public/images/sectors/*.svg
//
// next/image ÇAĞRISINDA `unoptimized` ZORUNLU: lib/cloudflare-loader.ts her kaynağı
// /cdn-cgi/image/... yoluna çevirir, Cloudflare Image Transformations ise SVG girdiyi
// dönüştürmez; bayrak olmadan ikonlar production'da yüklenmez.
//
// NEDEN DOSYA, İNLINE DEĞİL: ikonlar next/image ile <img> olarak basılır; böylece
// width/height öznitelikleri HTML'e düşer (CLS yok) ve işaretleme şişmez. Aynı
// gerekçe standart rozetlerinde de geçerli (bkz. build-certification-badges.mjs).
//
// RENK: tek renk --blue (#0757d8). Beyaz kart üzerinde 6.24:1 — WCAG 1.4.11'in
// grafik bileşenler için istediği 3:1 eşiğinin üstünde. İkonlar dekoratiftir;
// kartın erişilebilir adını h3 içindeki bağlantı taşır, bu yüzden alt="" kullanılır.
//
// Çalıştırma: node scripts/build-sector-icons.mjs
import { mkdir, writeFile } from "node:fs/promises";

const OUT = "public/images/sectors";
const S = 48;
const BLUE = "#0757d8";

// Tek tip çizim dili: 3.4 birim kalınlıkta, yuvarlatılmış uçlu kontur.
const stroke = `fill="none" stroke="${BLUE}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"`;

const icons = {
  // Tente + vitrin: perakende cephesi.
  "magaza.svg": `<path d="M8 18 L11 8 H37 L40 18" ${stroke}/><path d="M8 18 a4 4 0 0 0 8 0 a4 4 0 0 0 8 0 a4 4 0 0 0 8 0 a4 4 0 0 0 8 0" ${stroke}/><path d="M11 22 V40 H37 V22" ${stroke}/><path d="M20 40 V29 H28 V40" ${stroke}/>`,
  // Çok katlı blok + giriş: AVM, otel ve kurumsal yapılar.
  "bina.svg": `<path d="M10 41 V11 a3 3 0 0 1 3-3 h22 a3 3 0 0 1 3 3 v30" ${stroke}/><path d="M6 41 H42" ${stroke}/><path d="M17 17 h4 M27 17 h4 M17 25 h4 M27 25 h4" ${stroke}/><path d="M20 41 V33 h8 v8" ${stroke}/>`,
  // Bina yüzeyine giydirilmiş ekran paneli: dış cephe uygulaması.
  "dis-cephe.svg": `<path d="M8 41 V7 h20 v34" ${stroke}/><path d="M4 41 H44" ${stroke}/><rect x="28" y="14" width="14" height="20" rx="1.5" ${stroke}/><path d="M32 20 h6 M32 26 h6" ${stroke}/>`,
  // Dikey ekran gövdesi + taban: totem.
  "totem.svg": `<rect x="16" y="5" width="16" height="28" rx="2.5" ${stroke}/><path d="M21 12 h6 M21 19 h6" ${stroke}/><path d="M24 33 V39" ${stroke}/><path d="M15 39 H33" ${stroke}/>`,
  // Skor ekranı + tribün eğrisi: spor alanı ve arena.
  "spor.svg": `<rect x="9" y="8" width="30" height="19" rx="2.5" ${stroke}/><path d="M15 15 h7 M15 21 h12" ${stroke}/><path d="M24 27 V32" ${stroke}/><path d="M8 41 a16 8 0 0 1 32 0" ${stroke}/>`,
};

await mkdir(OUT, { recursive: true });
for (const [file, art] of Object.entries(icons)) {
  const body = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="presentation">${art}</svg>\n`;
  await writeFile(`${OUT}/${file}`, body, "utf8");
  console.log(`ok  ${OUT}/${file}  (${Buffer.byteLength(body)} B)`);
}
