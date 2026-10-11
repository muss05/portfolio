import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 90 is used for the profile photo, which is small on screen but should stay crisp.
  images: { qualities: [75, 90] },
};

export default nextConfig;
