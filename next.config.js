/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	images: {
		domains: ["image.tmdb.org", "i.ytimg.com"],
		unoptimized: true,
	},
	experimental: {
		serverActions: true,
	},
	output: "standalone",
};

module.exports = nextConfig;
