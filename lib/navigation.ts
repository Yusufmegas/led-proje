import type { LinkItem } from "@/lib/types";

export const productLinks: LinkItem[] = [
  { href: "/ic-mekan-led-ekran", label: "İç Mekân LED Ekran" },
  { href: "/dis-mekan-led-ekran", label: "Dış Mekân LED Ekran" },
  { href: "/poster-led-ekran", label: "Poster LED Ekran" },
  { href: "/esnek-led-ekran", label: "Esnek LED Ekran" },
  { href: "/totem-led-ekran", label: "Totem LED Ekran" },
  { href: "/led-ekran-kontrol-sistemleri", label: "Kontrol Sistemleri" },
];

// Fragment'ler kaldırıldı: hedef sayfalarda karşılık gelen section id'leri yok, bu yüzden
// eski "#kullanim", "#showroom" gibi bağlantılar kullanıcıyı sayfanın başına düşürüyordu.
// Hedefler components/application-grid.tsx içindeki aynı 12 kullanım alanıyla hizalandı.
// Birden fazla kullanım alanı aynı sayfaya çıkabildiği için href benzersiz değildir;
// listeyi render eden bileşenler React key'i olarak label kullanır.
export const solutionLinks: LinkItem[] = [
  { href: "/magaza-led-ekran", label: "Mağaza ve perakende" },
  { href: "/avm-led-ekran", label: "AVM ortak alanları" },
  { href: "/magaza-led-ekran", label: "Showroom" },
  { href: "/ic-mekan-led-ekran", label: "Otel ve etkinlik alanları" },
  { href: "/ic-mekan-led-ekran", label: "Kurumsal ofis ve lobi" },
  { href: "/ic-mekan-led-ekran", label: "Toplantı ve konferans salonları" },
  { href: "/led-ekran-kontrol-sistemleri", label: "Kontrol merkezi ve izleme odası" },
  { href: "/dis-cephe-led-ekran", label: "Bina cephesi" },
  { href: "/dis-mekan-led-ekran", label: "Açık alan ve meydan" },
  { href: "/totem-led-ekran", label: "Totem ve giriş alanları" },
  { href: "/led-ekranlar", label: "Spor salonu ve arena" },
  { href: "/ic-mekan-led-ekran", label: "Sahne ve organizasyon" },
];

export const solutionGroups = [
  { title: "Perakende ve ticari alanlar", links: solutionLinks.slice(0, 4) },
  { title: "Kurumsal alanlar", links: solutionLinks.slice(4, 7) },
  { title: "Dış mekân ve mimari", links: solutionLinks.slice(7, 10) },
  { title: "Etkinlik ve spor", links: solutionLinks.slice(10, 12) },
] as const;

export const faqLink: LinkItem = { href: "/sik-sorulan-sorular", label: "Sık Sorulan Sorular" };

export const serviceLinks: LinkItem[] = [
  { href: "/led-ekran-kesif-projelendirme", label: "Keşif & Projelendirme" },
  { href: "/led-ekran-montaji", label: "Montaj & Devreye Alma" },
  { href: "/led-ekran-bakim-onarim", label: "Bakım & Onarım" },
  { href: "/led-ekran-teknik-servis", label: "Teknik Servis" },
];

export const cityLinks: LinkItem[] = [
  "istanbul", "ankara", "izmir", "antalya", "bursa", "konya", "kayseri", "samsun", "erzurum", "amasya",
].map((city) => ({
  href: `/${city}-led-ekran`,
  label: `${city[0].toLocaleUpperCase("tr-TR")}${city.slice(1)} LED Ekran`,
}));

export const pitchLinks: LinkItem[] = [
  { href: "/p2-5-led-ekran", label: "P2.5 LED Ekran" },
  { href: "/p3-led-ekran", label: "P3 LED Ekran" },
  { href: "/p4-led-ekran", label: "P4 LED Ekran" },
  { href: "/p5-led-ekran", label: "P5 LED Ekran" },
  { href: "/p10-led-ekran", label: "P10 LED Ekran" },
];
