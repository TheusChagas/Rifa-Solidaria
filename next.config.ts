import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/vendedor',
        destination: '/vendedor/rifas',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
