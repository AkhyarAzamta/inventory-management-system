import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     // Mengarahkan ke versi yang benar
  //     "oidc-token-hash": require.resolve("oidc-token-hash"),
  //   };
  //   return config;
  // },
};

export default nextConfig;
