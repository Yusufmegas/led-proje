const components = [
  ["LED modül", "Görüntü yüzeyini oluşturur."],
  ["Kabinet", "Modülleri ve elektroniği bir arada taşır."],
  ["Güç sistemi", "Enerji dağıtımını proje kapsamına göre düzenler."],
  ["Alıcı kart ve veri", "Görüntü verisini ekran yüzeyine aktarır."],
  ["Kontrol sistemi", "Kaynak, çözünürlük ve yayın akışını yönetir."],
] as const;

export function SystemInventory() {
  return <div className="v5-system-flow">{components.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>;
}
