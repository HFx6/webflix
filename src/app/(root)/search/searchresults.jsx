"use client";

import React, { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";

import { useSearchParams } from "next/navigation";

import InfiniteGrid from "../components/infinitegrid";

import MovieCardInfo from "../components/moviecardinfo";

export default function SearchResults() {
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

	const cardRef = useRef(null);
	const imageRef = useRef(null);

	const [mediaId, setMediaId] = useState(null);
	let delay = setTimeout(() => {}, 100);

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const handleMouseEnter = ({
		offset,
		offsetHeight,
		offsetWidth,
		backdrop_path,
		cumulativeOffset,
		mediaId,
	}) => {
		setMediaId(mediaId);
		let size = {
			height: offsetHeight,
			width: offsetWidth,
		};
		clearTimeout(delay);
		delay = setTimeout(async function () {
			imageRef.current.src = backdrop_path;
			cardRef.current.style.setProperty("--scale", ".66");
			cardRef.current.style.width = `${size.width * 1.5}px`;
			cardRef.current.style.left = `${
				offset.left - (size.width * 1.5 - size.width) / 2
			}px`;

			cardRef.current.style.top = `${
				cumulativeOffset.top - size.height / 2
			}px`;
			cardRef.current.style.left = `${
				cumulativeOffset.left - size.width / 4
			}px`;
			await sleep(600);

			cardRef.current.classList.add("hovercard--active");

			cardRef.current.style.setProperty("--scale", "1");
			cardRef.current.style.width = `${size.width * 1.5}px`;
		}, 400);
	};

	const handleMouseLeave = async () => {
		clearTimeout(delay);
	};

	const cardHandleMouseLeave = async () => {
		// await sleep(50);
		cardRef.current.style.setProperty("--scale", ".66");
		cardRef.current.style.setProperty("--translateY", "0px");
		// cardRef.current.style.setProperty("--translateX", "0px");
		// await sleep(100);
		cardRef.current.classList.remove("hovercard--active");
	};
	var cumulativeOffset = function (element) {
		var _elm = element;
		var top = 0,
			left = 0;
		do {
			top += element.offsetTop || 0;
			left += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		const parentOffset = new WebKitCSSMatrix(
			window.getComputedStyle(_elm.parentElement.parentElement).transform
		);
		return {
			top: top,
			left: left + parentOffset.m41,
		};
	};

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
									? process.env.IMAGE_PATH +
									  result.backdrop_path
									: result.poster_path
									? process.env.IMAGE_PATH +
									  result.poster_path
									: process.env.URL + "/logo/noimage.png"
							}
							width={500}
							height={280}
							alt={result.title}
							placeholder={`data:image/svg+xml;base64,${toBase64(
								shimmer(500, 280)
							)}`}
							className="w-full h-auto object-cover rounded-sm"
							onMouseEnter={(e) =>
								handleMouseEnter({
									offset: e.target.getBoundingClientRect(),
									offsetHeight: e.target.offsetHeight,
									offsetWidth: e.target.offsetWidth,
									backdrop_path: result.backdrop_path
										? process.env.IMAGE_PATH +
										  result.backdrop_path
										: result.poster_path
										? process.env.IMAGE_PATH +
										  result.poster_path
										: process.env.URL + "/logo/noimage.png",
									cumulativeOffset: cumulativeOffset(
										e.target
									),
									mediaId: result.id,
								})
							}
							cardHandleMouseLeave={cardHandleMouseLeave}
						/>
					</div>
				))}
			</InfiniteGrid>
			<MovieCardInfo
				cardRef={cardRef}
				imageRef={imageRef}
				mediaId={mediaId}
				cardHandleMouseLeave={cardHandleMouseLeave}
			/>
		</div>
	);
}