import type { SpecRow } from "@/lib/types";
export const indoorPitchRows: SpecRow[] = [
  { label: "P1.53", value: "≈ 427.000 px/m²", note: "1,5 m+ yakın izleme" },
  { label: "P1.86", value: "≈ 289.000 px/m²", note: "1,9 m+ toplantı, sergi alanı, lobi" },
  { label: "P2.5", value: "160.000 px/m²", note: "2,5 m+ mağaza, sergi alanı, salon" },
  { label: "P3", value: "≈ 111.000 px/m²", note: "3 m+ geniş salon" },
  { label: "P4", value: "62.500 px/m²", note: "4 m+ büyük iç mekân" },
];
export const outdoorPitchRows: SpecRow[] = [
  { label: "P2.5", value: "160.000 px/m²", note: "2,5 m+ yakın dış mekân" },
  { label: "P3", value: "≈ 111.000 px/m²", note: "3 m+ cephe ve giriş uygulamaları" },
  { label: "P4", value: "62.500 px/m²", note: "4 m+ cephe, totem ve tabela" },
  { label: "P5", value: "40.000 px/m²", note: "5 m+ totem, meydan ve cadde" },
  { label: "P10", value: "10.000 px/m²", note: "10 m+ uzak izleme" },
];
export const indoorCommon = ["Parlaklık ≥ 750 nit", "3840 Hz yenileme; isteğe bağlı 6000 Hz", "16 bit gri ölçeği", "160° / 160° görüş açısı", "320 × 160 mm modül"];
export const outdoorCommon = ["Yaklaşık 5.500–6.500 nit parlaklık", "3840 Hz tazeleme", "Ön IP65 / arka IP54", "-20°C ~ +60°C çalışma sıcaklığı", "320 × 160 mm modül"];
