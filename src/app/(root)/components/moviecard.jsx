"use client";

import { useRef } from "react";

import Link from "next/link";
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

export default function MovieCard({
	handleMouseEnter,
	handleMouseLeave,
	movie,
}) {
	const imageRef = useRef(null);
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
	return (
		<>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<Image
				key={new Date().getTime()}
				src={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path}
				alt={"movie poster for " + movie.title}
				className="moviecardimage w-full !relative"
				onMouseEnter={() =>
					handleMouseEnter({
						offset: imageRef.current.getBoundingClientRect(),
						offsetHeight: imageRef.current.offsetHeight,
						offsetWidth: imageRef.current.offsetWidth,
						backdrop_path: movie.backdrop_path,
						cumulativeOffset: cumulativeOffset(imageRef.current),
						mediaId: movie.id,
					})
				}
				fill={true}
				sizes={
					"(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
				}
				placeholder={`data:image/svg+xml;base64,${toBase64(
					shimmer(700, 475)
				)}`}
				onMouseLeave={() => handleMouseLeave()}
				ref={imageRef}
			/>
		</>
	);
}
