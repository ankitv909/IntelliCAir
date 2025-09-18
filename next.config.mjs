import removeImports from 'next-remove-imports'

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN, 'localhost', 'http://localhost'],

  },

};
export default removeImports()(nextConfig);

