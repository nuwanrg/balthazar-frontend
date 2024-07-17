/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NFT_DATA_URL: process.env.NFT_DATA_URL,
  },
};

module.exports = nextConfig;
