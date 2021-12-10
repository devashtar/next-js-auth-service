/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV
// https://devashtar.github.io/mobile-app-next-js
// https://devashtar.github.io/{здесь наш NEXT_PUBLIC_BASE_PATH}

module.exports = {
  reactStrictMode: true,
  exportPathMap: () => (isProd ? 'out' : ''),
  basePath: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : ''
}
