/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/original/**',
      },
    ],
  },
  env: {
    IMAGE_PATH: process.env.IMAGE_PATH,
  },
};

export default nextConfig;
