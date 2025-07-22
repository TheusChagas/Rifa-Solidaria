import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/vendedor',
        destination: '/vendedor/dashboard',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
