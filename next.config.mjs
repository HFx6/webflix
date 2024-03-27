/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "image.tmdb.org",
				port: "",
				pathname: "/t/p/*/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "i.imgur.com",
				port: "",
				pathname: "/**",
			}
		],
	},
	env: {
		IMAGE_PATH: process.env.IMAGE_PATH,
		IMAGE_PATH_SMALL: process.env.IMAGE_PATH_SMALL,
		URL: process.env.URL,
	},
};

export default nextConfig;
