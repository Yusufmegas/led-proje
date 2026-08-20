import Image from "next/image";
import Link from "next/link";
import { getVerifiedSectorProjects } from "@/lib/sector-projects";

export function SectorProjects({ sector }: { sector?: string }) {
  const projects = getVerifiedSectorProjects(sector);
  if (projects.length === 0) return null;
  return <section className="sector-projects"><h2>Bu alandaki uygulamalar</h2><div>{projects.map((project) => {
    const card = <><div><Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 700px) 100vw, 50vw" /></div><h3>{project.title}</h3>{project.city && <p>{project.city}</p>}{project.summary && <p>{project.summary}</p>}</>;
    return project.href ? <Link href={project.href} key={project.title}>{card}</Link> : <article key={project.title}>{card}</article>;
  })}</div></section>;
}
