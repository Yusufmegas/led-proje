export const projectSectorGroups = [
  { label: "Perakende ve ticari işletmeler", sectors: ["AVM", "Mağaza", "Market", "Kuyumcu", "Eczane", "Pastane ve fırın", "Restoran ve kafe", "Showroom", "Otomotiv galerisi"] },
  { label: "Kurumsal ve eğitim alanları", sectors: ["İşyeri ve ofis", "Kurumsal lobi", "Okul ve eğitim kurumu", "Toplantı ve konferans salonu", "Kontrol merkezi", "Fabrika ve üretim tesisi", "Belediye ve kamu alanı", "Hastane ve klinik"] },
  { label: "Konaklama ve etkinlik", sectors: ["Otel", "Düğün ve davet salonu", "Sahne ve organizasyon", "Fuar ve kongre", "Spor salonu ve arena", "Etkinlik alanı"] },
  { label: "Mimari ve dış mekân", sectors: ["Bina cephesi", "Açık alan ve meydan", "Totem ve giriş alanı", "Yol ve yönlendirme ekranı", "Dış mekân reklam ekranı"] },
] as const;
export type ProjectSector = (typeof projectSectorGroups)[number]["sectors"][number];
export type ProjectStatus = "draft" | "placeholder" | "published" | "archived";
export type ProjectEnvironment = "İç mekân" | "Dış mekân";
export type ProjectPermission = "granted" | "pending" | "denied";
export type ProjectImage = { src: string; alt: string; kind: "cover" | "desktop-cover" | "mobile-cover" | "before" | "installation" | "completed" | "detail" | "video-poster"; order: number };
export type ProjectVideo = { title: string; type: "local" | "youtube" | "vimeo"; url: string; posterImage: string; posterAlt: string; description?: string; publicationPermission: ProjectPermission; order: number };
export type ProjectReference = { id: string; brandName: string; logo?: string; darkLogo?: string; logoAlt: string; projectSlug: string; sector: ProjectSector; publicationPermission: ProjectPermission; status: ProjectStatus; order: number; isPlaceholder: boolean };
export type SectorProject = {
  id: string; slug: string; title: string; shortTitle: string; summary: string; description: string; sector: ProjectSector; applicationType: string; environment: ProjectEnvironment; city: string; district?: string;
  coverImage: string; desktopCoverImage?: string; mobileCoverImage?: string; coverImageAlt: string; galleryImages: readonly ProjectImage[]; beforeImage?: ProjectImage; installationImages: readonly ProjectImage[]; completedImages: readonly ProjectImage[]; detailImages: readonly ProjectImage[];
  videos: readonly ProjectVideo[]; clientName?: string; clientLogo?: string; clientLogoAlt?: string; products: readonly string[]; services: readonly string[]; technicalHighlights: readonly string[]; screenDimensions?: string; pixelPitch?: string; completionDate?: string;
  featured: boolean; status: ProjectStatus; isPlaceholder: boolean; publicationPermission: ProjectPermission; imagePermission: ProjectPermission; videoPermission: ProjectPermission; productHref?: string; href?: string;
};
const demo = (project: Omit<SectorProject, "status" | "isPlaceholder" | "publicationPermission" | "imagePermission" | "videoPermission" | "galleryImages" | "installationImages" | "completedImages" | "detailImages" | "videos" | "featured">): SectorProject => ({ ...project, status: "placeholder", isPlaceholder: true, publicationPermission: "denied", imagePermission: "granted", videoPermission: "denied", featured: false, galleryImages: [{ src: project.coverImage, alt: project.coverImageAlt, kind: "completed", order: 1 }], installationImages: [], completedImages: [], detailImages: [], videos: [{ title: "Örnek proje video alanı", type: "local", url: "", posterImage: project.coverImage, posterAlt: project.coverImageAlt, description: "Video, yayın izni alındıktan sonra kullanıcı etkileşimiyle yüklenir.", publicationPermission: "denied", order: 1 }] });
export const placeholderProjects: readonly SectorProject[] = [
  demo({ id: "demo-retail", slug: "ornek-magaza", title: "Örnek Mağaza LED Ekran Yerleşimi", shortTitle: "Mağaza vitrini", summary: "Vitrin görünürlüğü ve yakın izleme için örnek kart düzeni.", description: "Bu kayıt gerçek müşteri veya proje değildir; yalnız arayüz değerlendirmesinde kullanılır.", sector: "Mağaza", applicationType: "Vitrin ekranı", environment: "İç mekân", city: "Örnek şehir", coverImage: "/images/visual-v3/retail-led.webp", coverImageAlt: "Mağaza alanında örnek LED ekran yerleşimi", products: ["İç mekân LED ekran"], services: ["Keşif ve projelendirme"], technicalHighlights: ["Yakın izleme", "Mimari yerleşim"] }),
  demo({ id: "demo-mall", slug: "ornek-avm", title: "Örnek AVM Ortak Alan Yerleşimi", shortTitle: "AVM ortak alanı", summary: "Geniş dolaşım alanı için örnek uygulama kartı.", description: "Bu kayıt gerçek müşteri veya proje değildir.", sector: "AVM", applicationType: "Mimari ekran yüzeyi", environment: "İç mekân", city: "Örnek şehir", coverImage: "/images/visual-v5/mall-led-wall.webp", coverImageAlt: "AVM ortak alanında örnek LED ekran yüzeyi", products: ["İç mekân LED ekran"], services: ["Sistem entegrasyonu"], technicalHighlights: ["Geniş görüş açısı"] }),
  demo({ id: "demo-stage", slug: "ornek-sahne", title: "Örnek Sahne LED Ekran Yerleşimi", shortTitle: "Sahne ekranı", summary: "Sahne görüş aksına uygun örnek kart düzeni.", description: "Bu kayıt gerçek organizasyon veya proje değildir.", sector: "Sahne ve organizasyon", applicationType: "Sahne görüntü yüzeyi", environment: "İç mekân", city: "Örnek şehir", coverImage: "/images/visual-v7/stage-led.webp", coverImageAlt: "Sahnede örnek LED ekran yerleşimi", products: ["İç mekân LED ekran"], services: ["Montaj ve devreye alma"], technicalHighlights: ["Görüntü kaynağı yönetimi"] }),
  demo({ id: "demo-arena", slug: "ornek-arena", title: "Örnek Arena LED Ekran Yerleşimi", shortTitle: "Arena ekranı", summary: "Tribün görüşüne göre düzenlenmiş örnek proje kartı.", description: "Bu kayıt gerçek spor tesisi veya proje değildir.", sector: "Spor salonu ve arena", applicationType: "Merkez ekran", environment: "İç mekân", city: "Örnek şehir", coverImage: "/images/visual-v7/arena-led.webp", coverImageAlt: "Spor arenasında örnek LED ekran yerleşimi", products: ["LED ekran sistemleri"], services: ["Kontrol sistemi entegrasyonu"], technicalHighlights: ["Uzak izleme"] }),
  demo({ id: "demo-facade", slug: "ornek-cephe", title: "Örnek Bina Cephesi Yerleşimi", shortTitle: "Cephe ekranı", summary: "Mimari yüzeye uyarlanan örnek dış mekân kartı.", description: "Bu kayıt gerçek bina veya proje değildir.", sector: "Bina cephesi", applicationType: "Cephe ekranı", environment: "Dış mekân", city: "Örnek şehir", coverImage: "/images/visual-v3/facade-led.webp", coverImageAlt: "Bina cephesinde örnek dış mekân LED ekran", products: ["Dış mekân LED ekran"], services: ["Taşıyıcı sistem koordinasyonu"], technicalHighlights: ["Çevresel koşullar"] }),
] as const;
// Yayın ve görsel izni alınmış gerçek LEDProje uygulamaları.
// Kapak görselleri kendi saha çekimlerimizden çıkarılmıştır (public/images/projects).
const reference = (p: {
  id: string; slug: string; brand: string; title: string; shortTitle: string; sector: ProjectSector;
  applicationType: string; environment: ProjectEnvironment; city: string; cover: string; coverAlt: string;
  summary: string; description: string; products: string[]; services: string[]; highlights: string[];
}): SectorProject => ({
  id: p.id, slug: p.slug, title: p.title, shortTitle: p.shortTitle, summary: p.summary, description: p.description,
  sector: p.sector, applicationType: p.applicationType, environment: p.environment, city: p.city,
  coverImage: p.cover, coverImageAlt: p.coverAlt,
  galleryImages: [{ src: p.cover, alt: p.coverAlt, kind: "completed", order: 1 }],
  installationImages: [], completedImages: [], detailImages: [], videos: [],
  clientName: p.brand, products: p.products, services: p.services, technicalHighlights: p.highlights,
  featured: true, status: "published", isPlaceholder: false,
  publicationPermission: "granted", imagePermission: "granted", videoPermission: "denied",
});

export const sectorProjects: readonly SectorProject[] = [
  reference({
    id: "ilhan-kuyumculuk", slug: "ilhan-kuyumculuk", brand: "İlhan Kuyumculuk",
    title: "İlhan Kuyumculuk Dış Cephe LED Ekran Uygulaması", shortTitle: "İlhan Kuyumculuk",
    sector: "Kuyumcu", applicationType: "Dış cephe ekranı", environment: "Dış mekân", city: "",
    cover: "/images/projects/dis_11_ilhan_kuyumculuk.webp",
    coverAlt: "İlhan Kuyumculuk mağazasının cephesindeki dış mekân LED ekran",
    summary: "Cadde üzerindeki mağaza cephesinde, gün ışığında okunabilir kampanya ve ürün iletişimi.",
    description: "Mağaza cephesine entegre edilen dış mekân LED ekran; taşıyıcı sistem, enerji ve veri altyapısı ile birlikte projelendirildi, LEDProje teknik ekibiyle monte edilip devreye alındı.",
    products: ["Dış mekân LED ekran"], services: ["Keşif ve projelendirme", "Montaj ve devreye alma", "Teknik servis"],
    highlights: ["Cephe entegrasyonu", "Gün ışığında okunurluk", "Yerinde bakım erişimi"],
  }),
  reference({
    id: "koc-finans", slug: "koc-finans", brand: "Koç Finans",
    title: "Koç Finans Kurumsal Cephe LED Ekran Uygulaması", shortTitle: "Koç Finans",
    sector: "İşyeri ve ofis", applicationType: "Kurumsal cephe ekranı", environment: "Dış mekân", city: "",
    cover: "/images/projects/dis_10_koc_finans.webp",
    coverAlt: "Koç Finans binasının köşe cephesindeki kurumsal LED ekran",
    summary: "Kurumsal binanın köşe cephesinde marka ve bilgilendirme içeriği için sürekli çalışan ekran yüzeyi.",
    description: "Bina köşesine uyarlanan dış mekân LED ekran; mimari yüzeye uygun kabinet yerleşimi, enerji ve veri dağıtımı ile kontrol sistemi tek kapsamda çözüldü.",
    products: ["Dış mekân LED ekran", "Kontrol sistemi"], services: ["Sistem entegrasyonu", "Montaj ve devreye alma"],
    highlights: ["Köşe cephe yerleşimi", "Kurumsal içerik yönetimi", "Sürekli çalışma"],
  }),
  reference({
    id: "cigerci-bahattin", slug: "cigerci-bahattin", brand: "Ciğerci Bahattin",
    title: "Ciğerci Bahattin Cephe LED Ekran Uygulaması", shortTitle: "Ciğerci Bahattin",
    sector: "Restoran ve kafe", applicationType: "Tabela üstü ekran", environment: "Dış mekân", city: "",
    cover: "/images/projects/dis_9_cigerci_bahattin.webp",
    coverAlt: "Ciğerci Bahattin işletmesinin tabelası üzerindeki dış mekân LED ekran",
    summary: "İşletme tabelasıyla bütünleşen, menü ve kampanya iletişimine uygun yatay ekran yüzeyi.",
    description: "Mevcut tabela hattına uyumlu ölçüde planlanan dış mekân LED ekran; taşıyıcı bağlantı, enerji hattı ve içerik kaynağı saha koşullarına göre yapılandırıldı.",
    products: ["Dış mekân LED ekran"], services: ["Keşif ve projelendirme", "Montaj ve devreye alma"],
    highlights: ["Tabela hattına uyum", "Yatay format", "Cadde görüş aksı"],
  }),
  reference({
    id: "neslihan-canpolat", slug: "neslihan-canpolat", brand: "Neslihan Canpolat",
    title: "Neslihan Canpolat Mağaza İçi LED Ekran Uygulaması", shortTitle: "Neslihan Canpolat",
    sector: "Mağaza", applicationType: "Mağaza içi görüntü duvarı", environment: "İç mekân", city: "",
    cover: "/images/projects/ic_8_neslihan_akbulut.webp",
    coverAlt: "Neslihan Canpolat mağazasının iç duvarındaki LED görüntü yüzeyi",
    summary: "Mağaza içi karşılama duvarında koleksiyon ve marka içeriği için yakın izlemeye uygun ekran.",
    description: "Mağaza mimarisine gömülü iç mekân LED ekran; yakın izleme mesafesine uygun piksel aralığı, kablo gizleme ve içerik yönetimi birlikte planlandı.",
    products: ["İç mekân LED ekran"], services: ["Sistem entegrasyonu", "Montaj ve devreye alma"],
    highlights: ["Mimariye gömülü yerleşim", "Yakın izleme", "Marka içeriği"],
  }),
];
export const placeholderReferences: readonly ProjectReference[] = placeholderProjects.slice(0, 4).map((project, order) => ({ id: `ref-${project.id}`, brandName: "Örnek logo alanı", logoAlt: "Gerçek müşteri logosu için örnek yerleşim alanı", projectSlug: project.slug, sector: project.sector, publicationPermission: "denied", status: "placeholder", order, isPlaceholder: true }));
export const projectReferences: readonly ProjectReference[] = [];
export function isPublishableProject(project: SectorProject) { return project.status === "published" && !project.isPlaceholder && project.publicationPermission === "granted" && project.imagePermission === "granted"; }
export function getPublishedProjects(sector?: string) { return sectorProjects.filter((project) => isPublishableProject(project) && (!sector || project.sector === sector)); }
export function getVerifiedSectorProjects(sector?: string) { return getPublishedProjects(sector); }
// NODE_ENV kapısı kaldırıldı: yayın kararı artık yalnız izin alanlarıyla verilir.
// Placeholder kayıtlar isPlaceholder/publicationPermission filtresine takıldığı için
// production'a sızmaz; gerçek kayıtlar hem development hem production'da görünür.
export function getProjectShowcaseData() { return getPublishedProjects(); }
export function getReferenceShowcaseData() { return projectReferences.filter((reference) => reference.status === "published" && !reference.isPlaceholder && reference.publicationPermission === "granted"); }
