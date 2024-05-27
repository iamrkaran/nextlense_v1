/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'nextlenseknit.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXTLENSE_SERVER_URL: process.env.NEXTLENSE_SERVER_URL,
    NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    NEXTLENSE_PUBLIC_RAPIDAPI_KEY: process.env.NEXTLENSE_PUBLIC_RAPIDAPI_KEY,
  },
};

export default nextConfig;
  