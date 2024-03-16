"use client";

import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";

import { useSearchParams } from "next/navigation";

import InfiniteGrid from "../components/infinitegrid";

import MovieCardInfo from "../components/moviecardinfo";

export default function Search() {
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
	const searchParams = useSearchParams();

	const search = searchParams.get("q");

	const [currentPage, setCurrentPage] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [results, setResults] = useState([]);

	const load = useCallback(async () => {
		try {
			const res = await fetch(
				`/api/search?q=${search}&page=${currentPage + 1}`
			);
			const { data } = await res.json();
			console.log(data.page, data.total_pages, data.results.length);
			setCurrentPage(data.page);
			setHasMore(data.total_pages > data.page);
			setResults((prevResults) => [...prevResults, ...data.results]);
		} catch (error) {
			console.error(error);
		}
	}, [search, currentPage]);

	useEffect(() => {
		setResults([]);
		setCurrentPage(0);
		setHasMore(true);
		load();
	}, [search]);

	return (
		<div className="gap-y-[10vh] mx-[2.5vw] mt-40 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			<InfiniteGrid hasMore={hasMore} load={load}>
				{results.map((result, index) => (
					<div
						key={index}
						className="group relative aspect-video overflow-hidden"
					>
						<Image
							src={
								result.backdrop_path
									? "https://image.tmdb.org/t/p/original/" +
									  result.backdrop_path
									: result.poster_path
									? "https://image.tmdb.org/t/p/original/" +
									  result.poster_path
									: "/logo/noimage.png"
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
			</InfiniteGrid>
		</div>
	);
}
