"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import Carousel from "./cardcarousel";
import MovieCardInfo from "./moviecardinfo";

export default function MediaListContent({ results, titles }) {
	const cardRef = useRef(null);
	const imageRef = useRef(null);
	// console.log(results[0]);
	let delay = setTimeout(() => {}, 100);

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const handleMouseEnter = ({
		offset,
		offsetHeight,
		offsetWidth,
		backdrop_path,
		cumulativeOffset,
	}) => {
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
			const e = {
				left: offset.left + window.scrollX,
				top: offset.top,
			};
			cardRef.current.style.width = `${size.width * 1.5}px`;
			cardRef.current.style.top = `${
				cumulativeOffset.top - size.height / 2
			}px`;
			cardRef.current.style.left = `${
				cumulativeOffset.left - size.width / 4
			}px`;
			await sleep(500);

			cardRef.current.classList.add("hovercard--active");

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
		// cardRef.current.style.setProperty("--translateX", "0px");
		await sleep(100);
		cardRef.current.classList.remove("hovercard--active");
	};
	return (
		<div className="flex flex-col moviecardsblock static mx-[2rem] my-3 gap-16 mt-[-18vh]">
			{results.map((result, index) => (
				<Carousel
					key={titles[index]}
					title={titles[index]}
					items={result?.data?.results}
					handleMouseLeave={handleMouseLeave}
					handleMouseEnter={handleMouseEnter}
				/>
			))}
			<MovieCardInfo
				cardRef={cardRef}
				imageRef={imageRef}
				cardHandleMouseLeave={cardHandleMouseLeave}
			/>
		</div>
	);
}
