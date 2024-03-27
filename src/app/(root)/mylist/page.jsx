"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { db, getWatchlist } from "../../../utils/db";

import MovieCardInfo from "../components/moviecardinfo";

import { useLiveQuery } from "dexie-react-hooks";

async function fetchImage(src) {
	const response = await fetch(src);
	const buffer = await response.arrayBuffer();
	const base64Image = `data:image/jpeg;base64,${Buffer.from(buffer).toString(
		"base64"
	)}`;
	return base64Image;
}

export default function MyList() {
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

	const cardRef = useRef(null);
	const imageRef = useRef(null);

	const [selectedMedia, setSelectedmedia] = useState({});
	const [results, setResults] = useState([]);
	const [smallImage, setSmallImage] = useState(
		`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`
	);
	const delay = useRef(setTimeout(() => {}, 100));

	const watchlist = useLiveQuery(() => db.watchlist.toArray());

	useEffect(() => {
		const fetchWatchlist = async () => {
			const myList = await getWatchlist();
			setResults(myList);
		};
		fetchWatchlist();
	}, [watchlist]);

	useEffect(() => {
		const fetchSmallImage = async () => {
			const smallImage = await fetchImage(
				process.env.IMAGE_PATH_SMALL + selectedMedia.backdrop_path
			);
			setSmallImage(smallImage);
		};
		if (selectedMedia.backdrop_path) {
			fetchSmallImage();
		}
	}, [selectedMedia]);

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const handleMouseEnter = ({
		offset,
		offsetHeight,
		offsetWidth,
		backdrop_path,
		poster_path,
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
			poster_path,
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
	if (results?.length === 0) {
		return (
			<div className="flex justify-center items-center h-[80vh]">
				<h1 className="text-4xl text-gray-400">
					No movies in your list
				</h1>
			</div>
		);
	}
	return (
		<div className="gap-y-[10vh] mx-[2.5vw] mt-40 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{results.map((result, index) => (
				<div
					key={index}
					className="group relative aspect-video overflow-hidden"
				>
					<Image
						src={
							result.media.backdrop_path
								? process.env.IMAGE_PATH +
								  result.media.backdrop_path
								: result.media.poster_path
								? process.env.IMAGE_PATH +
								  result.media.poster_path
								: "/logo/noimage.png"
						}
						width={500}
						height={280}
						alt={result.media.mediaId}
						placeholder="blur"
						blurDataURL={smallImage}
						className="w-full h-auto object-cover rounded-sm"
						onMouseEnter={(e) =>
							handleMouseEnter({
								offset: e.target.getBoundingClientRect(),
								offsetHeight: e.target.offsetHeight,
								offsetWidth: e.target.offsetWidth,
								backdrop_path: result.media.backdrop_path
									? result.media.backdrop_path
									: result.media.poster_path
									? result.media.poster_path
									: "/logo/noimage.png",
								cumulativeOffset: cumulativeOffset(e.target),
								mediaId: result.media.mediaId,
								release_date:
									result.media.release_date ||
									result.media.first_air_date,
								vote_average: result.media.vote_average,
								genre_ids: result.media.genre_ids,
								poster_path: result.media?.poster_path,
								media_type:
									result.media.media_type ||
									(result.media.first_air_date
										? "tv"
										: "movie"),
							})
						}
						onMouseLeave={() => handleMouseLeave()}
					/>
				</div>
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
