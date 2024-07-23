/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_NFT_DATA_URL: process.env.NEXT_PUBLIC_NFT_DATA_URL,
  },
};

module.exports = nextConfig;
