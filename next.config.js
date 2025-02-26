/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: require.resolve('./cache-handler.js'),
  cacheMaxMemorySize: 100,
  //skipTrailingSlashRedirect: true,
  // Elimina 'output: export' para que Next.js use SSR/SSG y no exporte archivos estáticos
}

module.exports = nextConfig;
