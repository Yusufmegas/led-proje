# LEDProje Technical SEO Checklist

Bu checklist Next.js uygulaması geliştirildiğinde uygulanacaktır; mevcut belge herhangi bir framework dosyası oluşturmaz.

## Temel teknik kararlar

- [ ] Canonical origin ve `metadataBase` olarak `https://ledproje.com.tr` kullan; `www` varyantını tercih edilen domaine tek adımda yönlendir.
- [ ] URL path'lerinde dokümante edilen slash'sız canonical biçimi kullan ve trailing-slash varyantlarını tek biçime yönlendir.
- [ ] Next.js App Router ve strict TypeScript kullan; kritik içerikte mümkün olduğunca Server Components tercih et.

## Sayfa ve metadata

- [ ] Her indexable URL için benzersiz, intent uyumlu title ve meta description üret.
- [ ] Tek, görünür ve açıklayıcı H1 kullan; alt başlıklarda mantıksal hiyerarşi kur.
- [ ] Metadata'yı doğrulanmış sayfa içeriğinden üret; eksik teknik veriyi metadata'ya ekleme.
- [ ] Open Graph ve uygun Twitter card alanlarını ekle; görselin gerçek sayfa içeriğini temsil etmesini sağla.
- [ ] Dil ve locale değerlerini Türkçe/Türkiye bağlamıyla tutarlı yapılandır.

## Canonical, index ve URL yönetimi

- [ ] Her indexable sayfada tercih edilen mutlak canonical URL'yi bilinçli belirle.
- [ ] Canonical'ı farklı intent'li sayfaları bastırmak veya kopya şehir sayfalarını meşrulaştırmak için kullanma.
- [ ] HTTP/HTTPS, www tercihi, trailing slash ve büyük/küçük harf politikasını tek biçime yönlendir.
- [ ] Kalıcı URL değişikliklerinde tek atlamalı 301/308 redirect kullan; zincir ve loop oluşturma.
- [ ] Silinen eşdeğersiz içerik için 404 veya 410 döndür; alakasız biçimde ana sayfaya yönlendirme.
- [ ] Filtre, arama sonucu, preview, test, admin ve ince içerik URL'leri için gerektiğinde `noindex`; crawl ihtiyacına göre `follow` kararı ver.
- [ ] `robots.txt` ile index kaldırmaya çalışma; hassas içeriği yalnız robots engeline bırakma.

## Sitemap ve robots

- [ ] XML sitemap yalnız canonical, indexable ve başarılı 200 URL'leri içersin.
- [ ] Sitemap'i sayfa kümeleri büyürse mantıksal olarak böl ve Search Console/Bing'e gönder.
- [ ] `lastmod` yalnız gerçek anlamlı içerik değişiminde güncellensin.
- [ ] `robots.txt` gerekli crawl izinlerini, engelleri ve sitemap konumunu doğru göstersin.

## Structured data

- [ ] JSON-LD ile yalnız görünür ve gerçek bilgileri işaretle.
- [x] Kullanıcı tarafından doğrulanan açık adres ve merkezi site config'iyle tutarlı `LocalBusiness` kullan; işletme adı yalnız `LEDProje` olsun.
- [ ] `FAQPage` yalnız `/sik-sorulan-sorular` sayfasında, görünür soru ve cevaplarla birebir eşleşecek biçimde kullanılır.
- [ ] Görünür breadcrumb ile uyumlu `BreadcrumbList` kullan.
- [ ] Sabit fiyat olmadığı için `Offer`, price, priceCurrency, availability veya stock ekleme; görünür ve gerçek veri olmadan review/aggregateRating kullanma.
- [ ] Schema tipini zengin sonuç garantisi gibi sunma; validator ve Rich Results Test ile kontrol et.

## Crawlability ve rendering

- [ ] SEO için gerekli metin ve linkleri ilk server-rendered HTML içinde sun; kullanıcı etkileşimine bağımlı bırakma.
- [ ] Anlamlı sayfaları gerçek `<a href>` bağlantılarıyla erişilebilir kıl.
- [ ] JavaScript kapalı/başarısız olduğunda ana içerik ve yönlendirme anlamını koru.
- [ ] Status code ile görünen sayfa durumunu eşleştir; soft 404 üretme.
- [ ] Pagination gerekirse crawl edilebilir ayrı URL'ler, self-canonical ve sıralı içerik kullan; tüm sayfaları ilk sayfaya canonical etme.

## Internal linking ve breadcrumbs

- [ ] Ürün, çözüm, rehber, proje, hizmet ve şehir kümeleri arasında `SITE-ARCHITECTURE.md` modelini uygula.
- [ ] `/` ile `/led-ekranlar`, iki fiyat sayfası, iç mekân ile mağaza ve dış mekân ile dış cephe arasındaki intent sınırlarını anchor ve içerik düzeyinde koru.
- [ ] Anchor text'i hedef sayfayı açıklayacak biçimde doğal yaz; mekanik exact-match tekrarından kaçın.
- [ ] Orphan indexable sayfa bırakma.
- [ ] Ana sayfa hariç hiyerarşik sayfalarda görünür breadcrumb kullan.

## Image SEO

- [ ] Gerçek LED ekran görsellerini kullanım izni ve doğru bağlamla kullan.
- [ ] Uygun görselleri AVIF/WebP sun; responsive `srcset`/`sizes` ve doğru boyutlandırma uygula.
- [ ] Layout shift önlemek için width/height veya aspect ratio belirt.
- [ ] Anlam taşıyan görsellere kısa Türkçe alt metin; dekoratif görsellere boş alt kullan.
- [ ] Dosya adlarını açıklayıcı tut; anahtar kelime doldurma yapma.
- [ ] Hero/LCP görselini önceliklendir; ekran dışı görselleri lazy-load et.

## Performance ve Core Web Vitals

- [ ] LCP, INP ve CLS'yi gerçek kullanıcı verisiyle izle; geliştirmede Lighthouse/lab ölçümüyle destekle.
- [ ] Görselleri, istemci JavaScript'ini ve üçüncü taraf scriptleri bütçele; gereksiz carousel/video yükleme.
- [ ] Font dosyalarını azalt, subset/self-host seçeneklerini değerlendir, uygun preload ve `font-display` kullan.
- [ ] Kritik kaynağı önceliklendir; kullanılmayan preload ve render-blocking kaynak oluşturma.
- [ ] Mobil ağ ve cihaz koşullarında test et.

## 404 ve hata durumları

- [ ] Yararlı, markayla uyumlu özel 404 sayfası sun ve gerçek 404 status code döndür.
- [ ] 5xx hatalarını gözlemle; hata sayfasını 200 olarak sunma.
- [ ] Kırık internal linkleri build/test veya periyodik crawl ile tespit et.

## Yayın kontrolü

- [ ] URL, title, H1, intent, canonical ve index durumu birbiriyle uyumlu.
- [ ] Sitemap/robots, redirect ve status code testleri başarılı.
- [ ] Sitemap yalnız gerçekten oluşturulmuş, özgün, canonical ve indexlenebilir sayfaları içeriyor; kiralama route'u veya veri bekleyen pitch/şehir sayfası içermiyor.
- [ ] Schema doğrulandı ve görünür içerikle eşleşiyor.
- [ ] Mobil görünüm, klavye erişimi ve temel ekran okuyucu semantiği kontrol edildi.
- [ ] Build, lint ve ilgili testler başarılı; Search Console URL Inspection ile kritik sayfalar kontrol edildi.
