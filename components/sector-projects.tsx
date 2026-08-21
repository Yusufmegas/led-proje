import Image from "next/image";
import Link from "next/link";
import { getVerifiedSectorProjects } from "@/lib/sector-projects";
import { assetPath } from "@/lib/site";

export function SectorProjects({ sector, title = "Bu alandaki uygulamalar", intro }: { sector?: string; title?: string; intro?: string }) {
  const projects = getVerifiedSectorProjects(sector);
  if (projects.length === 0) return null;
  return <section className="sector-projects">{title && <h2>{title}</h2>}{intro && <p>{intro}</p>}<div>{projects.map((project) => {
    const card = <><div><Image src={assetPath(project.coverImage)} alt={project.coverImageAlt} fill loading="lazy" sizes="(max-width: 700px) 100vw, 50vw" /></div><h3>{project.shortTitle}</h3><p>{[project.sector, project.city].filter(Boolean).join(" · ")}</p>{project.summary && <p>{project.summary}</p>}</>;
    return project.href ? <Link href={project.href} key={project.title}>{card}</Link> : <article key={project.title}>{card}</article>;
  })}</div></section>;
}
