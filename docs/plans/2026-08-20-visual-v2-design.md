# LEDProje Visual V2 Design

## Yön

Premium B2B technology ile architectural engineering editorial yaklaşımı birleştirilir. Site açık zemin ağırlıklıdır; koyu lacivert mühendislik, servis ve final dönüşüm alanlarında kullanılır. Turuncu yalnız birincil aksiyon rengidir.

## Sistem

Ana sayfa gerçek fotoğraf ölçeği, asimetrik ürün grid'i, yatay mühendislik akışı ve daha açık bilgi hiyerarşisi kazanır. Reusable içerik sayfası ürün, pitch ve şehir türüne göre görsel varyant üretir; SEO verisi ve DOM içeriği değişmez. Mobil navigasyon erişilebilir drawer, footer native `details` accordion ve sabit dönüşüm çubuğu kullanır.

## Doğrulama

Mevcut route/metadata/canonical/schema snapshot'ları korunur. 375, 390, 768, 1024, 1440 ve 1920 genişliklerinde overflow, navigasyon, hesaplayıcı, footer ve görseller kontrol edilir. Son aşamada lint, typecheck, build, Playwright console/broken image/link ve SEO regresyon kontrolleri çalıştırılır.
