/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapimyprofilev2-production.up.railway.app',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
