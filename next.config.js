/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/training.html", destination: "/training", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

module.exports = nextConfig;
