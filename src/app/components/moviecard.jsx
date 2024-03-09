"use client";

import { useRef } from "react";

import Link from "next/link";
import Image from "next/image";

export default function MovieCard({
	handleMouseEnter,
	handleMouseLeave,
	backdrop_path,
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
				src={"https://image.tmdb.org/t/p/original/" + backdrop_path}
				alt={backdrop_path}
				className="moviecardimage w-full !relative"
				onMouseEnter={() =>
					handleMouseEnter({
						offset: imageRef.current.getBoundingClientRect(),
						offsetHeight: imageRef.current.offsetHeight,
						offsetWidth: imageRef.current.offsetWidth,
						backdrop_path: backdrop_path,
					})
				}
				fill={true}
				placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
				onMouseLeave={() => handleMouseLeave()}
				ref={imageRef}
			/>
		</>
	);
}
