/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "profile.line-scdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "owluyykevmpvmiiqsega.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
