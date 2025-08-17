/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true
    },
    api: {
      bodyParser: {
        sizeLimit: '25mb',
      },
    },
  };
  
  export default nextConfig;