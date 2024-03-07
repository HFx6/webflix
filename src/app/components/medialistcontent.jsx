"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import Carousel from "./cardcarousel";
import MovieCardInfo from "./moviecardinfo";

export default function MediaListContent({ movies, genre }) {
	const cardRef = useRef(null);
	const imageRef = useRef(null);

	let delay = setTimeout(() => {}, 100);

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const handleMouseEnter = ({
		offset,
		offsetHeight,
		offsetWidth,
		backdrop_path,
	}) => {
		console.log(offset, offsetHeight, offsetWidth);
		let size = {
			height: offsetHeight,
			width: offsetWidth,
		};
		clearTimeout(delay);
		delay = setTimeout(async function () {
			imageRef.current.src =
				"https://image.tmdb.org/t/p/original/" + backdrop_path;
			cardRef.current.style.left = `${
				offset.left - (size.width * 1.5 - size.width) / 2
			}px`;
			await sleep(500);

			cardRef.current.classList.add("hovercard--active");
			cardRef.current.style.setProperty(
				"--translateY",
				`${size.width * 0.2}px`
			);
			cardRef.current.style.setProperty("--scale", "1");
			cardRef.current.style.width = `${size.width * 1.5}px`;
		}, 300);
	};

	const handleMouseLeave = async () => {
		clearTimeout(delay);
	};

	const cardHandleMouseLeave = async () => {
		await sleep(50);
		cardRef.current.style.setProperty("--scale", ".66");
		cardRef.current.style.setProperty("--translateY", "0px");
		await sleep(100);
		cardRef.current.classList.remove("hovercard--active");
	};
	return (
		<div className="flex flex-col moviecardsblock relative mx-[4rem] my-3">
			<Carousel
				title={"Trending"}
				items={movies?.data.results}
				handleMouseLeave={handleMouseLeave}
				handleMouseEnter={handleMouseEnter}
			/>
			<Carousel
				title={"Animation"}
				items={genre?.data.results}
				handleMouseLeave={handleMouseLeave}
				handleMouseEnter={handleMouseEnter}
			/>
			<MovieCardInfo
				cardRef={cardRef}
				imageRef={imageRef}
				cardHandleMouseLeave={cardHandleMouseLeave}
			/>
		</div>
	);
}