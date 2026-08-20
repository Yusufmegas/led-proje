# LEDProje Site Mimarisi

Canonical domain: `https://ledproje.com.tr`. Canonical path'ler kısa, slash'sız ve tek bir search intent sahibidir.

## İş modeli temeli

LEDProje, Türkiye geneline hizmet veren İstanbul merkezli profesyonel LED ekran sistem entegratörü ve proje firmasıdır. LED panel/modül üretmez; proje şartlarına uygun panel, modül ve komponent tedarik sürecini yönetir. Projeye özel kabinet/kasa, güç ve veri altyapısı, alıcı kart/kontrol entegrasyonu, taşıyıcı sistem, mekanik montaj, modül hizalama, görüntü ayarı, test, devreye alma, bakım ve teknik servis LEDProje kapsamındadır. Montaj ve devreye alma kendi teknik ekibiyle yapılır.

Kiralama hizmeti ve kiralama route'u yoktur. Üretici/tedarikçi marka site mimarisinde kullanılmaz. Site e-ticaret değildir ve fiyat yayımlamaz.

## P0 — çekirdek SEO sayfaları

| Canonical URL | Sayfa | Primary query | Hacim | Intent |
|---|---|---|---:|---|
| `/` | Ana Sayfa | led ekran | 5.000 | Genel profesyonel çözüm ve sistem entegratörü |
| `/led-ekran-fiyatlari` | LED Ekran Fiyatları | led ekran fiyatları | 500 | Genel proje maliyet faktörleri ve teklif |
| `/led-ekran-metrekare-fiyati` | LED Ekran Metrekare Fiyatı | led ekran metrekare fiyatı | 500 | m² hesaplama beklentisi ve sınırları |
| `/ic-mekan-led-ekran` | İç Mekân LED Ekran | iç mekan led ekran | 500 | Ürün kategorisi |
| `/dis-mekan-led-ekran` | Dış Mekân LED Ekran | dış mekan led ekran | 500 | Ürün kategorisi |
| `/poster-led-ekran` | Poster LED Ekran | poster led ekran | 500 | Ürün kategorisi |
| `/esnek-led-ekran` | Esnek LED Ekran | esnek led ekran | 500 | Ürün kategorisi |
| `/magaza-led-ekran` | Mağaza LED Ekran | mağaza led ekran | 500 | Mağaza/perakende kullanım senaryosu |
| `/dis-cephe-led-ekran` | Dış Cephe LED Ekran | dış cephe led ekran | 500 | Bina cephesi uygulama/solution intent |
| `/istanbul-led-ekran` | İstanbul LED Ekran | istanbul led ekran | ≈500 | İstanbul odaklı yerel ticari arama niyeti |
| `/ankara-led-ekran` | Ankara LED Ekran | ankara led ekran | ≈500 | Ankara local commercial; fiziksel şube iddiası yok |

## P1 — sistem, hizmet ve teknik sayfalar

| Canonical URL | Sayfa | Primary query | Hacim/not | Yayın koşulu |
|---|---|---|---|---|
| `/led-ekranlar` | LED Ekranlar | led ekran sistemleri | 50 | Sistem/ürün hub'ı; ana sayfanın genel intent'ini kopyalamaz |
| `/totem-led-ekran` | Totem LED Ekran | totem led ekran | 50 | Doğrulanmış ürün çerçevesiyle hazırlanır |
| `/avm-led-ekran` | AVM LED Ekran | avm led ekran | 50 | AVM'ye özgü uygulama değeri gerekir |
| `/led-ekran-montaji` | LED Ekran Montajı ve Kurulumu | led ekran montajı / led ekran kurulumu | kurulum: 50 | Kendi teknik ekibi, mekanik montaj, hizalama, bağlantı, test ve devreye alma |
| `/led-ekran-teknik-servis` | LED Ekran Teknik Servis | led ekran teknik servis | hacim verilmedi | LEDProje tarafından sunulan gerçek servis kapsamı; ticari koşullar doğrulanmalı |
| `/led-ekran-kontrol-sistemleri` | LED Ekran Kontrol Sistemleri | led ekran kontrol sistemleri | hacim verilmedi | Marka adı kullanmadan receiver/data/controller entegrasyonu |
| `/p2-5-led-ekran` | P2.5 LED Ekran | p2.5 led ekran | 50 | Özgün iç/dış kullanım ve teknik veri |
| `/p3-led-ekran` | P3 LED Ekran | p3 led ekran | 50 | Özgün iç/dış kullanım ve teknik veri |
| `/p4-led-ekran` | P4 LED Ekran | p4 led ekran | 50 | Özgün iç/dış kullanım ve teknik veri |
| `/p5-led-ekran` | P5 LED Ekran | p5 led ekran | 50 | Dış mekân bağlamı ve ürün/model doğrulaması |
| `/p10-led-ekran` | P10 LED Ekran | p10 led ekran | 50 | Dış mekân bağlamı ve ürün/model doğrulaması |

Pitch sayfaları yalnız pitch adını değiştirerek çoğaltılmaz. Kaynak PDF'deki pitch yoğunluğu, izleme mesafesi, kullanım, parlaklık, refresh, IP ve modül/kabinet çerçevesi doğru iç/dış kapsamıyla kullanılabilir; nihai satılabilir ürün/model konfigürasyonu ayrıca doğrulanır.

## P1 fırsat

`/led-ekran-tabela`, `led ekran tabela` (5.000) intent'ini ancak profesyonel full-color ve büyük ölçekli LED ekran tabela sistemleri olarak ayrıştırabildiğinde hedefler. Ucuz kayan yazı/tabela intent'iyle karışık olduğundan core Phase 1 için zorunlu değildir.

## P2 ve sonraki faz

- `/cozumler`, `/hizmetler`, `/projeler`, `/hakkimizda`, `/iletisim`
- `/led-ekran-kesif-projelendirme`, `/led-ekran-bakim-onarim`, `/teknik-bilgi`
- Gerçek veriye dayalı `/projeler/{proje-slug}` case study'leri
- Local SEO haritasındaki P1–P3 şehir sayfaları; yalnız içerik/yayın eşiğini geçenler
- Ek sektör ve teknik bilgi topic cluster sayfaları
- `led ekran firmaları` için formatı/URL'si kararlaştırılmamış doğrulanabilir kurumsal içerik fırsatı

P2 URL'leri özgün intent, içerik ve yayın verisi doğrulanmadan indexlenmez.

## Ürün ve hizmet hiyerarşisi

```text
/led-ekranlar
├── /ic-mekan-led-ekran
├── /dis-mekan-led-ekran
├── /poster-led-ekran
├── /esnek-led-ekran
├── /totem-led-ekran
├── /led-ekran-kontrol-sistemleri
└── Pitch sayfaları
    ├── /p2-5-led-ekran
    ├── /p3-led-ekran
    ├── /p4-led-ekran
    ├── /p5-led-ekran
    └── /p10-led-ekran

/hizmetler
├── /led-ekran-montaji
├── /led-ekran-teknik-servis
├── /led-ekran-kesif-projelendirme (P2)
└── /led-ekran-bakim-onarim (P2)
```

## Cannibalization sınırları

| URL'ler | Bağlayıcı ayrım |
|---|---|
| `/` ↔ `/led-ekranlar` | `/` genel `led ekran`, marka ve anahtar teslim entegrasyon; `/led-ekranlar` `led ekran sistemleri`, ürün türleri ve sistem bileşenleri |
| `/led-ekran-fiyatlari` ↔ `/led-ekran-metrekare-fiyati` | Genel proje maliyet faktörleri ↔ m² hesaplama beklentisi ve neden alanın tek başına fiyat olmadığı |
| `/ic-mekan-led-ekran` ↔ `/magaza-led-ekran` | İç mekân ürün kategorisi/seçimi ↔ mağaza kullanım senaryosu, vitrin ve müşteri deneyimi |
| `/dis-mekan-led-ekran` ↔ `/dis-cephe-led-ekran` | Dış ortam ürün kategorisi/dayanım ↔ bina cephesi entegrasyonu, konstrüksiyon ve proje uygulaması |
| `/magaza-led-ekran` ↔ `/avm-led-ekran` | Tekil mağaza/perakende senaryosu ↔ AVM ortak alanları ve daha geniş operasyon ölçeği |
| `/poster-led-ekran` ↔ `/totem-led-ekran` | Dikey ince poster ürünü ↔ tek/çift yüzlü totem sistemi ve dış/ortak alan uygulaması |
| `/led-ekran-montaji` ↔ `/led-ekran-teknik-servis` | İlk kurulum, bağlantı, test ve devreye alma ↔ satış sonrası bakım, arıza, konfigürasyon ve saha desteği |
| Ürün kategorileri ↔ pitch sayfaları | Ortam/ürün seçimi ↔ doğrulanmış teknik pitch değerlendirmesi |
| Şehir URL'leri ↔ ulusal hizmet sayfaları | Şehre özgü kullanım, lojistik ve proje yaklaşımı ↔ Türkiye geneli süreç/hizmet anlatımı |
| `/led-ekran-tabela` ↔ `/` | Profesyonel full-color tabela uygulaması ↔ genel LED ekran ve sistem entegrasyonu |

## Local SEO

URL standardı `/{sehir}-led-ekran`'dır. Her şehirde `{şehir} led ekran` ile `led ekran {şehir}` aynı canonical sayfaya aittir. Query sırası, ilçe veya hizmet varyantı için ayrı URL ve nested `/hizmet-bolgeleri/...` yapısı oluşturulmaz.

| Öncelik | Şehirler | Keyword Planner talebi | Yayın yaklaşımı |
|---|---|---|---|
| P0 | İstanbul, Ankara | ≈500/şehir | İlk ve en kapsamlı local landing page'ler |
| P1 | İzmir, Antalya, Bursa, Konya, Kayseri, Samsun | ≈50/şehir | P0 ile aynı kalite eşiğinde aşamalı yayın |
| P2 | Erzurum, Amasya | 10–100 bandı | İçerik yeterliliği ve iş değeri doğrulandıkça yayın |
| P3 | Diğer 71 il | çoğunlukla 0–10 veya yetersiz veri | Araştırma havuzu; otomatik route veya index yok |

İlk local SEO dalgası şu canonical URL'lerden oluşur:

1. `/istanbul-led-ekran`
2. `/ankara-led-ekran`
3. `/izmir-led-ekran`
4. `/antalya-led-ekran`
5. `/bursa-led-ekran`
6. `/konya-led-ekran`
7. `/kayseri-led-ekran`
8. `/samsun-led-ekran`
9. `/erzurum-led-ekran`
10. `/amasya-led-ekran`

Bu liste otomatik yayın listesi değildir. Her URL yalnız özgün şehir kullanımı, ürün önerisi, keşif/projelendirme, montaj, teknik servis ve lojistik yaklaşımı gibi yeterli içerik sağlandığında indexlenir ve sitemap'e eklenir.

Doğrulanmış merkez şehir İstanbul'dur. Diğer şehirlerde fiziksel şube varmış gibi davranılmaz. Doğrulanmamış açık adres, ekip, servis noktası, proje, müşteri veya müdahale süresi yazılmaz. Türkiye geneline gerçek satış, montaj ve teknik servis hizmeti verildiği söylenebilir.

81 ilin tamamı ileride mimariye dahil edilebilir; ancak şehir adı değiştirilmiş kopyalar doorway page'dir ve toplu şekilde üretilmez.

## Navigasyon ve dönüşüm

Ana navigasyondaki Çözümler menüsü mevcut route'ları üç grupta sunar: Uygulama Alanları, Ürün Çözümleri, Proje ve Hizmet. Teknik Bilgi alanı `/sik-sorulan-sorular` merkezine bağlantı verir. Yeni grup route'u üretilmez.

`/sik-sorulan-sorular`, LED ekran seçimi ve proje süreciyle ilgili bilgi amaçlı soruların tek merkezidir. Ticari ürün, fiyat, hizmet ve şehir sayfaları kendi primary sorgularını korur; tekrar eden SSS blokları veya FAQ schema üretmez.

Birincil CTA Teklif Al'dır; bağlama göre Ücretsiz Keşif, WhatsApp ve Uzmanla Görüş kullanılabilir. Telefon/WhatsApp `0501 580 01 01`'dir. Breadcrumb görünür hiyerarşi ve canonical URL ile uyumlu olur.

## Kapsam dışı route'lar

- Kiralama/rental ve kiralama fiyatları
- `led ekran panel` veya `led panel ekran` için ayrı route
- Üretici/tedarikçi marka landing page'leri
- TV, televizyon, panel değişimi ve tüketici elektroniği sayfaları
- Sahte şehir, ilçe veya şube sayfaları
