/** @type {import('next').NextConfig} */

// Check if we're building for GitHub Pages (only in production builds)
const isGithubPages = process.env.GITHUB_PAGES === 'true' && process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add basePath only for GitHub Pages production deployment
  basePath: isGithubPages ? '/Harsh-portfolio' : '',
  // Use HashRouter-like behavior for gh-pages
  assetPrefix: isGithubPages ? '/Harsh-portfolio/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig;