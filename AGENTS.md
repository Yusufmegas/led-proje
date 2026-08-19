# LEDProje Repository Kuralları

- Her görevde önce kapsamı ve doğrulama adımlarını planla; uygulamadan önce mevcut mimariyi ve ilgili dosyaları incele.
- Kullanıcı onayı olmadan büyük mimari değişiklik, teknoloji değişimi veya kapsam genişletmesi yapma.
- Gereksiz dependency ekleme. Yeni dependency gerekiyorsa mevcut araçlarla çözülemeyen ihtiyacı ve maliyetini açıkla.
- Teknik özellik, fiyat, proje, referans, müşteri, sertifika, garanti, teslimat veya operasyon verisi uydurma. Eksik bilgiyi `TO VERIFY` olarak işaretle.
- SEO'yu sonradan eklenecek bir katman olarak görme; URL, intent, metadata, içerik, internal linking, schema ve index durumunu sayfa geliştirilirken ele al.
- Mobil öncelikli, responsive ve erişilebilir arayüzler geliştir; semantik HTML, klavye kullanımı, görünür odak, yeterli kontrast ve anlamlı alternatif metin sağla.
- Core Web Vitals ve yükleme maliyetini baştan gözet; görsel, font, JavaScript ve üçüncü taraf kodlarını gerekçesiz büyütme.
- TypeScript strict yaklaşımını koru; `any`, kontrolsüz type assertion ve sessiz hata yutmayı gerekçesiz kullanma.
- Ortak davranış ve görsel kalıplarda component reuse yap; erken ve anlamsız soyutlamadan kaçın.
- Kullanıcıya gösterilen Türkçe metinler kurumsal, açık ve doğrulanabilir olmalı; fiyat gösterme veya doğrudan e-ticaret akışı oluşturma.
- Görevi tamamlamadan önce mevcut proje komutlarına göre build, lint ve ilgili testleri çalıştır. Komut yoksa bunu açıkça raporla; doğrulama sonucu başarısızken işi tamamlanmış sayma.
- İlgili kurallar için `docs/CONTENT-RULES.md`, `docs/TECHNICAL-SEO.md` ve project-specific `ledproje-seo` skill'ini uygula.
