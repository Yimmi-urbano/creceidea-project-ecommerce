/** @type {import('next').NextConfig} */
const nextConfig = {
    cacheHandler: require.resolve('./cache-handler.js'),
    cacheMaxMemorySize: 100,
    //output: 'export',
}

module.exports = nextConfig
