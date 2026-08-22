// Masaüstündeki AI kaynak görsellerini visual-v8 setine WebP olarak aktarır.
// Kaynak PNG'ler repoya girmez (bkz. .gitignore); yalnız buradaki WebP çıktılar commit edilir.
// Bu betik varlıkların hangi ayarla üretildiğini belgeler: 1536px genişlik, %85 kalite.
// Çalıştırma: node scripts/build-visual-v8.mjs
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const SRC = "C:/Users/HP/Desktop";
const OUT = "public/images/visual-v8";
const MAX_WIDTH = 1536;
const QUALITY = 85;

const jobs = [
  ["Spor salonu  arena.png", "arena-led.webp"],
  ["konser.png", "stage-led.webp"],
  ["otel.png", "hotel-led.webp"],
  ["acik alan.png", "plaza-led.webp"],
];

await mkdir(OUT, { recursive: true });

for (const [src, dest] of jobs) {
  const input = await readFile(`${SRC}/${src}`);
  const meta = await sharp(input).metadata();
  const output = await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();
  await writeFile(`${OUT}/${dest}`, output);
  const next = await sharp(output).metadata();
  console.log(
    `ok  ${src}  ${meta.width}x${meta.height} → ${next.width}x${next.height}  ` +
      `${(input.length / 1024 / 1024).toFixed(2)}MB → ${(output.length / 1024).toFixed(0)}KB  →  ${OUT}/${dest}`
  );
}
