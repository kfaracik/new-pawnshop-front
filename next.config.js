/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["www.apple.com"], // TODO: tmp
  },
};

module.exports = nextConfig;
