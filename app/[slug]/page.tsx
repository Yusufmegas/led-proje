import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { allPages, pageMap } from "@/lib/pages";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return allPages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const page = pageMap.get(slug); if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${slug}` }, robots: page.index ? { index: true, follow: true } : { index: false, follow: true }, openGraph: { title: `${page.title} | LEDProje`, description: page.description, url: absoluteUrl(`/${slug}`), type: "website" } };
}
export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const page = pageMap.get(slug); if (!page) notFound(); return <ContentPage page={page} />; }
