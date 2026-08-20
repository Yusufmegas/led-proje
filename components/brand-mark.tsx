import Link from "next/link";

export function BrandMark() {
  return (
    <Link className="brand-mark" href="/" aria-label="LEDProje ana sayfa">
      <span className="brand-grid" aria-hidden="true"><i /><i /><i /><i /></span>
      <span>LED<span>Proje</span></span>
    </Link>
  );
}
