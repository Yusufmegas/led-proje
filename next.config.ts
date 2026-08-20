import type { NextConfig } from "next";

const isGithubPagesProject = process.env.GITHUB_PAGES_PROJECT === "true";
const githubPagesBasePath = isGithubPagesProject ? "/led-proje" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: githubPagesBasePath,
  assetPrefix: githubPagesBasePath ? `${githubPagesBasePath}/` : undefined,
  poweredByHeader: false,
  agentRules: false,
  turbopack: { root: process.cwd() },
  images: { unoptimized: true, formats: ["image/avif", "image/webp"] }
};

export default nextConfig;
