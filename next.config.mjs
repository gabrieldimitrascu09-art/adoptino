/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media.adoptino.ro' },
      { protocol: 'https', hostname: 'api.adoptino.ro' },
    ],
  },
};

export default nextConfig;