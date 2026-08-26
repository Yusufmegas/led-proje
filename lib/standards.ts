/**
 * Firmanın sahip olduğu belgeler ve uygunluk standartları.
 *
 * `certificateNo` bilinçli olarak boştur; belge numaraları doğrulandıkça buraya
 * yazılır. Render eden bileşenler alan doluysa gösterir, boşsa hiç basmaz —
 * bu yüzden doğrulanmamış bir numara siteye asla düşmez.
 *
 * Rozet görselleri scripts/build-certification-badges.mjs ile public/images/standards/
 * altına üretilir; neden
 * resmi marka görselleri kullanılmadığı o dosyanın başında açıklanmıştır.
 */
export type Standard = {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  certificateNo?: string;
};

export const standards: Standard[] = [
  {
    id: "ce",
    name: "CE",
    description: "Avrupa Birliği uygunluk işareti",
    logoUrl: "/images/standards/ce.svg",
  },
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    description: "Kalite yönetim sistemi belgesi",
    logoUrl: "/images/standards/iso9001.svg",
  },
  {
    id: "tse",
    name: "TSE",
    description: "Türk Standartları Enstitüsü uygunluk belgesi",
    logoUrl: "/images/standards/tse.svg",
  },
  {
    id: "rohs",
    name: "RoHS",
    description: "Tehlikeli madde kısıtlamasına uygunluk",
    logoUrl: "/images/standards/rohs.svg",
  },
  {
    id: "emc",
    name: "EMC",
    description: "Elektromanyetik uyumluluk",
    logoUrl: "/images/standards/emc.svg",
  },
  {
    id: "ip65",
    name: "IP65 / IP54",
    description: "Dış mekân toz ve su koruma sınıfı",
    logoUrl: "/images/standards/ip65.svg",
  },
];
