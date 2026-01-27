/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ENABLED FOR FIREBASE HOSTING
  trailingSlash: true,
  
  // ============================================================================
  // BUILD ID - CRITICAL FOR CACHE BUSTING
  // ============================================================================
  generateBuildId: async () => {
    return process.env.VERCEL_GIT_COMMIT_SHA || 
           process.env.RENDER_GIT_COMMIT || 
           `build-${Date.now()}`;
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  // Ottimizzazioni per SEO e Performance
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Headers per sicurezza e performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // ========================================================================
      // HTML PAGES - NO CACHE (always fresh)
      // ========================================================================
      {
        source: '/:path(.html)?',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
