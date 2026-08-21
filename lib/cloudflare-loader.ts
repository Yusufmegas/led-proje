// next/image için Cloudflare Image Transformations loader'ı.
// Cloudflare, /cdn-cgi/image/<seçenekler>/<kaynak-yol> isteğini kaynaktan üretip
// Accept başlığına göre AVIF/WebP/JPEG döndürür (format=auto).
//
// basePath yalnız GitHub Pages önizleme dağıtımında doludur ve orada /cdn-cgi/
// namespace'i yoktur; o dağıtımda dönüşüm atlanır ve kaynak yol aynen kullanılır.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function cloudflareLoader({ src, width, quality }: {
  src: string; width: number; quality?: number
}) {
  if (basePath) return src;
  const params = [`width=${width}`, `quality=${quality || 80}`, "format=auto"];
  return `/cdn-cgi/image/${params.join(",")}${src}`;
}
