/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
    },
};

module.exports = nextConfig;
