import React from "react";
import Image from "next/image";

async function getSearch(term) {
	const res = await fetch(process.env.URL + "/api/search?q=" + term);
	return res.json();
}

export default async function Search({ searchParams }) {
	const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs>
		<linearGradient id="g">
			<stop stop-color="#333" offset="20%" />
			<stop stop-color="#222" offset="50%" />
			<stop stop-color="#333" offset="70%" />
		</linearGradient>
	</defs>
	<rect width="${w}" height="${h}" fill="#333" />
	<rect id="r" width="${w}" height="${h}" fill="url(#g)" />
	<animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

	const toBase64 = (str) =>
		typeof window === "undefined"
			? Buffer.from(str).toString("base64")
			: window.btoa(str);
	const { q } = searchParams;
	const searchData = getSearch(q);
	const [_search] = await Promise.all([searchData]);
	const search = _search.data;

	return (
		<div className="gap-y-[10vh] mx-[2.5vw] mt-40 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{search.results.map((result) => (
				<div
					key={result.id}
					className="group relative aspect-video overflow-hidden"
				>
					<Image
						src={
							result.backdrop_path
								? "https://image.tmdb.org/t/p/original/" +
								  result.backdrop_path
								: "https://image.tmdb.org/t/p/original/" +
								  result.poster_path
						}
						width={500}
						height={280}
						alt={result.title}
						placeholder={`data:image/svg+xml;base64,${toBase64(
							shimmer(500, 280)
						)}`}
						className="w-full h-auto object-cover rounded-sm"
					/>
				</div>
			))}
		</div>
	);
}
