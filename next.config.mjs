/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "nextlenseknit.s3.ap-south-1.amazonaws.com",
            },
        ],
    },
    env: {
        AUTH_SECRET: process.env.AUTH_SECRET,
    }
};

export default nextConfig;

