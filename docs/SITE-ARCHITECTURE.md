# LEDProje Site Mimarisi

## Amaç ve ilkeler

Mimari, profesyonel LED ekran ihtiyacı olan kullanıcıyı ürün satışı yerine keşif, projelendirme, kurulum ve teklif akışına taşır. Her indexable URL tek bir belirgin search intent taşır. Teknik ürün sayfaları yalnızca doğrulanmış üretici/model verisi mevcut olduğunda yayımlanır.

## Önerilen URL yapısı

| Küme | Önerilen URL | Sayfa amacı |
|---|---|---|
| Ana Sayfa | `/` | Marka, ana ürün ve hizmet kapsamı; yüksek seviyeli “led ekran” intent'i |
| Ürünler | `/urunler/` | Ürün gruplarına yönlendiren kategori merkezi |
| İç Mekân LED Ekran | `/urunler/ic-mekan-led-ekran/` | İç mekân kullanım ihtiyacı ve çözüm seçimi |
| Dış Mekân LED Ekran | `/urunler/dis-mekan-led-ekran/` | Dış ortam çözümü, dayanım gereksinimleri ve keşif |
| Rental LED Ekran | `/urunler/rental-led-ekran/` | Etkinlik ve kiralama tipi modüler sistem ihtiyacı |
| LED Poster | `/urunler/led-poster/` | Dikey dijital gösterim çözümü |
| Şeffaf LED Ekran | `/urunler/seffaf-led-ekran/` | Vitrin ve şeffaf yüzey çözümü |
| COB LED Ekran | `/urunler/cob-led-ekran/` | COB teknolojisini araştıran ticari kullanıcı |
| Kontrol Sistemleri | `/urunler/kontrol-sistemleri/` | LED ekran kontrol ve içerik yönetimi ihtiyacı |
| Teknik ürün/model | `/urunler/{urun-grubu}/{model-slug}/` | Doğrulanmış model ve teknik veriye dayalı değerlendirme |
| Sektörel çözümler | `/cozumler/` | Sektör ve kullanım senaryosu merkezi |
| Sektör detayı | `/cozumler/{sektor-slug}/` | Sektöre özgü problem, uygulama ve seçim kriterleri |
| Şehir merkezi | `/hizmet-bolgeleri/` | Gerçek hizmet kapsamını açıklayan bölge merkezi |
| Şehir sayfası | `/hizmet-bolgeleri/{sehir}/led-ekran/` | Şehre özgü keşif, lojistik ve servis değeri |
| Fiyat rehberleri | `/rehber/led-ekran-fiyatlari/` | Fiyatı etkileyen faktörler ve teklif hazırlığı |
| Metrekare fiyatı | `/rehber/led-ekran-metrekare-fiyati/` | m² fiyat aramasının kapsam ve değişkenlerini açıklama |
| Projeler | `/projeler/` | Doğrulanmış uygulamalar için case-study merkezi |
| Proje detayı | `/projeler/{proje-slug}/` | Gerçek kapsam, çözüm, uygulama ve sonuç |
| Hizmetler | `/hizmetler/` | Hizmet yaşam döngüsü merkezi |
| Keşif ve projelendirme | `/hizmetler/kesif-ve-projelendirme/` | İhtiyaç analizi ve tasarım süreci |
| LED ekran kurulumu | `/hizmetler/led-ekran-kurulumu/` | Kurulum intent'i ve süreç bilgisi |
| Teknik destek | `/teknik-destek/` | Servis ve destek talebi; doğrulanmış kapsam |
| Hakkımızda | `/hakkimizda/` | Doğrulanmış şirket ve yetkinlik bilgileri |
| İletişim | `/iletisim/` | Telefon, WhatsApp, teklif ve keşif temas noktaları |

İlk sektörel sayfalar: `magaza-perakende`, `avm`, `otel-turizm`, `showroom`, `konferans-salonu`, `fuar-etkinlik`, `dugun-salonu`, `bina-cephe`, `spor-salonu`, `kurumsal-alanlar`.

İlk şehir adayları: İstanbul, İzmir, Ankara, Bursa ve Antalya. Bir şehir URL'si ancak özgün yerel değer ve doğrulanabilir operasyon bilgisi sağlandığında indexable olmalıdır.

## Teknik ürün genişleme modeli

P1.5, P1.8, P2.5, P3, P3.91, P4, P5 ve P10 gibi terimler için URL, ürünün doğrulanmış sınıfına bağlanmalıdır. Model datasheet'i gelmeden sayfa yayımlanmaz; URL rezervasyonu için boş veya zayıf sayfa oluşturulmaz. Aynı pixel pitch farklı iç/dış mekân ürünlerinde bulunuyorsa tek bir jenerik sayfada birleştirmek yerine doğrulanmış ürün ailesi ve kullanıcı intent'i esas alınır.

## Navigasyon ve dönüşüm

- Ana navigasyon: Ürünler, Çözümler, Projeler, Hizmetler, Rehber, Hakkımızda, İletişim.
- Birincil CTA: Teklif Al. Bağlama göre Ücretsiz Keşif, WhatsApp ve Uzmanla Görüş kullanılabilir.
- Telefon ve WhatsApp: `0501 580 01 01`; bağlantı formatları uygulama aşamasında doğrulanmalıdır.
- Breadcrumb; ana sayfa hariç hiyerarşik sayfalarda görünür ve yapılandırılmış veriyle uyumlu olmalıdır.

## Cannibalization ve URL çakışması riskleri

| Risk | Ayrım kuralı |
|---|---|
| `/` ile `/urunler/` “led ekran” için yarışabilir | Ana sayfa marka + genel çözüm; ürün merkezi karşılaştırma ve kategori navigasyonu taşır. |
| Ürün kategorisi ile fiyat rehberi yarışabilir | Kategori seçim/uygunluk intent'i; rehber maliyet faktörleri ve teklif hazırlığı intent'i taşır. |
| “led ekran fiyatları” ile “metrekare fiyatı” örtüşebilir | Genel fiyat sayfası tüm maliyet yapısını; m² sayfası ölçü temelli sorgunun sınırlarını açıklar. İçerik örtüşürse tek sayfada birleştirilir. |
| Şehir sayfası ile ulusal hizmet sayfası yarışabilir | Şehir sayfası yalnızca kanıtlanmış yerel operasyon değeri; hizmet sayfası ulusal süreç bilgisidir. |
| Pixel-pitch rehberi ile teknik ürün sayfası yarışabilir | Rehber karşılaştırma/eğitim; ürün sayfası doğrulanmış modele yönelik ticari değerlendirmedir. |
| Sektör sayfası ile ürün sayfası yarışabilir | Sektör sayfası kullanım problemi; ürün sayfası teknoloji ve ürün grubu seçimi odaklıdır. |

Yeni URL açmadan önce mevcut sayfaların primary query, intent ve içerik kapsamı kontrol edilmelidir. Yakın intent'ler ayrı zayıf sayfalara bölünmemeli; gerektiğinde redirect ve canonical planıyla birleştirilmelidir.
