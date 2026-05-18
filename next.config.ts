import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	// Enable images from unsplash.com
	images: {
		domains: ["images.unsplash.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "yktzzgbyiyxmzsxqhrwo.supabase.co", // Replace with your actual Supabase project ID
				port: "",
				pathname: "/storage/v1/object/public/**",
			},
		],
	},
};

export default nextConfig;
