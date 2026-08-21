// public/images altındaki tüm WebP'leri en fazla 1200px genişliğe ve %80 kaliteye indirir.
// `output: "export"` altında Next.js image optimization çalışmadığı (srcset üretilmediği) için
// görseller kaynakta küçültülmelidir. Idempotent: 1200px'ten dar görseller yalnız yeniden
// sıkıştırılır, büyütülmez.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public/images";
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.isFile() && extname(entry.name).toLowerCase() === ".webp") out.push(full);
  }
  return out;
}

const files = await walk(ROOT);
let before = 0;
let after = 0;

for (const file of files) {
  const original = await readFile(file);
  const meta = await sharp(original).metadata();
  const output = await sharp(original)
    .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();

  before += original.length;
  // Sıkıştırma kazanç sağlamıyorsa dosyaya dokunma.
  if (output.length >= original.length) {
    after += original.length;
    console.log(`skip  ${file} (${meta.width}px, ${(original.length / 1024).toFixed(0)}KB)`);
    continue;
  }
  await writeFile(file, output);
  after += output.length;
  const next = await sharp(output).metadata();
  console.log(
    `ok    ${file}  ${meta.width}px→${next.width}px  ${(original.length / 1024).toFixed(0)}KB→${(output.length / 1024).toFixed(0)}KB`
  );
}

console.log(`\ntoplam: ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB (${files.length} dosya)`);
