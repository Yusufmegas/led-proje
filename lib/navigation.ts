import type { LinkItem } from "@/lib/types";

export const productLinks: LinkItem[] = [
  { href: "/ic-mekan-led-ekran", label: "İç Mekân LED Ekran" },
  { href: "/dis-mekan-led-ekran", label: "Dış Mekân LED Ekran" },
  { href: "/poster-led-ekran", label: "Poster LED Ekran" },
  { href: "/esnek-led-ekran", label: "Esnek LED Ekran" },
  { href: "/totem-led-ekran", label: "Totem LED Ekran" },
  { href: "/led-ekran-kontrol-sistemleri", label: "Kontrol Sistemleri" },
];

export const solutionLinks: LinkItem[] = [
  { href: "/magaza-led-ekran#kullanim", label: "Mağaza ve perakende" },
  { href: "/avm-led-ekran#kullanim", label: "AVM ortak alanları" },
  { href: "/magaza-led-ekran#showroom", label: "Showroom" },
  { href: "/avm-led-ekran#otel-etkinlik", label: "Otel ve etkinlik alanları" },
  { href: "/ic-mekan-led-ekran#kurumsal", label: "Kurumsal ofis ve lobi" },
  { href: "/ic-mekan-led-ekran#toplanti", label: "Toplantı ve konferans salonları" },
  { href: "/led-ekran-kontrol-sistemleri#kontrol-merkezi", label: "Kontrol merkezi ve izleme odası" },
  { href: "/dis-cephe-led-ekran#bina-cepheleri", label: "Bina cephesi" },
  { href: "/dis-mekan-led-ekran#acik-alan", label: "Açık alan ve meydan" },
  { href: "/totem-led-ekran#giris-alanlari", label: "Totem ve giriş alanları" },
  { href: "/led-ekranlar#spor-arena", label: "Spor salonu ve arena" },
  { href: "/led-ekranlar#sahne-organizasyon", label: "Sahne ve organizasyon" },
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
