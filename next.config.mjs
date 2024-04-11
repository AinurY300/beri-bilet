/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["pics.avs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pics.avs.io"
      }
    ]
  }
}

export default nextConfig
