"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import Carousel from "./cardcarousel";
import MovieCardInfo from "./moviecardinfo";

export default function MediaListContent({ results, titles }) {
	const cardRef = useRef(null);
	const imageRef = useRef(null);

	const delay = useRef(setTimeout(() => {}, 100));

	const [selectedMedia, setSelectedmedia] = useState({});

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const handleMouseEnter = ({
		offset,
		offsetHeight,
		offsetWidth,
		backdrop_path,
		cumulativeOffset,
		mediaId,
		release_date,
		vote_average,
		genre_ids,
		media_type,
	}) => {
		if (cardRef?.current)
			cardRef?.current?.classList?.remove("hovercard--active");
		setSelectedmedia({
			mediaId,
			release_date,
			vote_average,
			genre_ids,
			media_type,
			backdrop_path,
		});
		let size = {
			height: offsetHeight,
			width: offsetWidth,
		};
		// remove active class from all other cards

		// if (imageRef?.current) imageRef.current.src = process.env.IMAGE_PATH + backdrop_path;
		clearTimeout(delay.current);
		delay.current = setTimeout(async function () {
			cardRef.current.style.setProperty("--scale", ".66");
			cardRef.current.style.width = `${size.width * 1.5}px`;
			cardRef.current.style.left = `${
				offset.left - (size.width * 1.5 - size.width) / 2
			}px`;

			cardRef.current.style.top = `${
				cumulativeOffset.top - size.height / 2
			}px`;
			cardRef.current.style.left = `${Math.min(
				Math.max(cumulativeOffset.left - size.width / 4, 10),
				window.innerWidth - size.width * 1.5 - 10
			)}px`;
			await sleep(600);

			cardRef.current.classList.add("hovercard--active");

			cardRef.current.style.setProperty("--scale", "1");
			cardRef.current.style.width = `${size.width * 1.5}px`;
		}, 400);
	};

	const handleMouseLeave = async () => {
		clearTimeout(delay.current);
	};

	const cardHandleMouseLeave = async () => {
		// await sleep(50);
		cardRef.current.style.setProperty("--scale", ".66");
		cardRef.current.style.setProperty("--translateY", "0px");
		// cardRef.current.style.setProperty("--translateX", "0px");
		// await sleep(100);
		cardRef.current.classList.remove("hovercard--active");
	};
	return (
		<div className="flex flex-col moviecardsblock static mx-[2.5vw] my-3 gap-16 mt-[-6vh]">
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
				selectedMedia={selectedMedia}
				cardHandleMouseLeave={cardHandleMouseLeave}
			/>
		</div>
	);
}
