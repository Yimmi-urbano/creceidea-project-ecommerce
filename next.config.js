/** @type {import('next').NextConfig} */
const nextConfig = {
    cacheHandler: require.resolve('./cache-handler.js'),
    cacheMaxMemorySize: 100, // disable default in-memory caching
    output:"export"
}

module.exports = nextConfig
