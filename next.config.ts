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
  // basePath'i client tarafına da taşır; lib/site.ts assetPath() bunu kullanarak
  // public/ varlıklarını prefixler (unoptimized image loader bunu kendisi yapmaz).
  env: { NEXT_PUBLIC_BASE_PATH: githubPagesBasePath },
  // Cloudflare Image Transformations. `formats` yalnız Next'in yerleşik optimizer'ı
  // için geçerlidir; custom loader'da biçim seçimi Cloudflare'in format=auto'suna aittir.
  images: { loader: "custom", loaderFile: "./lib/cloudflare-loader.ts" }
};

export default nextConfig;
