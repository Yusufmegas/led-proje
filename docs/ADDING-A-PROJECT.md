# Yeni Proje Ekleme Rehberi

Projeler dosya tabanlı ve tip güvenli olarak `lib/sector-projects.ts` üzerinden yönetilir. CMS veya yükleme paneli yoktur. Gerçek bir yönetim paneli; kimlik doğrulama, yetkilendirme, dosya yükleme ve medya saklama gerektirdiği için ayrı görevdir.

## Zorunlu yayın koşulları

Bir kayıt production ortamında yalnız şu koşulların tamamında görünür:

- `status: "published"`
- `isPlaceholder: false`
- `publicationPermission: "granted"`
- `imagePermission: "granted"`

Video ayrıca kendi `publicationPermission: "granted"` değerini ve proje düzeyinde `videoPermission: "granted"` değerini gerektirir. Eksik bilgi uydurulmaz.

## Ekleme adımları

1. `public/images/projects/<project-slug>/` klasörünü oluşturun.
2. Masaüstü ve mobil kırpımları dâhil kapak görsellerini ekleyin.
3. Galeri görsellerini `before`, `installation`, `completed` ve `detail` türleriyle düzenleyin.
4. Yerel MP4/WebM dosyasını veya izinli YouTube/Vimeo bağlantısını ekleyin; poster görseli tanımlayın.
5. Yayın izni bulunan müşteri logosunu aynı proje klasörüne ekleyin.
6. Her görsel ve logo için kısa, doğal ve açıklayıcı Türkçe alternatif metin yazın.
7. Proje, görsel ve video yayın izinlerini ayrı ayrı işaretleyin.
8. Doğrulanmış bütün alanlar tamamlandığında durumu `published`, `isPlaceholder` değerini `false` yapın.
9. Lint, typecheck, production build, proje sayfası, galeri, video, mobil görünüm ve sitemap kontrolünü çalıştırın.

## Medya klasörü örneği

```text
public/images/projects/proje-slug/
├── cover-desktop.webp
├── cover-mobile.webp
├── before-01.webp
├── installation-01.webp
├── completed-01.webp
├── detail-01.webp
├── client-logo.svg
└── video-poster.webp
```

Proje ayrıntı route’u ancak gerçek ve izinli kayıt yayımlandığında oluşturulmalı; placeholder kayıt için route, metadata, schema veya sitemap girdisi üretilmemelidir.
