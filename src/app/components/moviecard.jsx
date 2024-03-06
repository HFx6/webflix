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

	return (
		<>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={"https://image.tmdb.org/t/p/original/" + backdrop_path}
				alt={backdrop_path}
				className="moviecardimage"
				onMouseEnter={() =>
					handleMouseEnter({
						offset: imageRef.current.getBoundingClientRect(),
						offsetHeight: imageRef.current.offsetHeight,
						offsetWidth: imageRef.current.offsetWidth,
						backdrop_path: backdrop_path,
					})
				}
				onMouseLeave={() => handleMouseLeave()}
				ref={imageRef}
			/>
		</>
	);
}
