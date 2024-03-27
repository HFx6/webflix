"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

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

async function fetchImage(src) {
	const response = await fetch(src);
	const arrayBuffer = await response.arrayBuffer();
	const base64Image = `data:image/jpeg;base64,${Buffer.from(
		arrayBuffer
	).toString("base64")}`;
	return base64Image;
}

export default function MovieCard({
	handleMouseEnter,
	handleMouseLeave,
	movie,
}) {
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
	const imageRef = useRef(null);
	const [src, setSrc] = useState(
		`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`
	);

	useEffect(() => {
		movie.media_type = movie.media_type
			? movie.media_type
			: movie.first_air_date
			? "tv"
			: "movie";
		const loadSmallImage = async () => {
			const smallImage = await fetchImage(
				process.env.IMAGE_PATH_SMALL + movie.backdrop_path
			);
			setSrc(smallImage);
		};

		loadSmallImage();
	}, [movie]);
	return (
		<>
			<Image
				key={movie.id + movie.media_type}
				src={process.env.IMAGE_PATH + movie.backdrop_path}
				alt={"movie poster for " + movie.title}
				className="moviecardimage w-full !relative"
				onMouseEnter={() => {
					handleMouseEnter({
						offset: imageRef.current.getBoundingClientRect(),
						offsetHeight: imageRef.current.offsetHeight,
						offsetWidth: imageRef.current.offsetWidth,
						backdrop_path: movie.backdrop_path
							? movie.backdrop_path
							: movie.poster_path
							? movie.poster_path
							: "/logo/noimage.png",
						cumulativeOffset: cumulativeOffset(imageRef.current),
						mediaId: movie.id,
						release_date:
							movie.release_date || movie.first_air_date,
						vote_average: movie.vote_average,
						genre_ids: movie.genre_ids,
						poster_path: movie?.poster_path,
						media_type:
							movie.media_type ||
							(movie.first_air_date ? "tv" : "movie"),
					});
				}}
				fill={true}
				sizes={
					"(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
				}
				placeholder="blur"
				blurDataURL={src}
				onMouseLeave={() => {
					handleMouseLeave();
				}}
				ref={imageRef}
			/>
		</>
	);
}
