"use client";

import Image from "next/image";

import { Fragment } from "react";

import { FaPlay } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { LuDot } from "react-icons/lu";

import Cardbutton from "./cardbutton";

import { getColor } from "../../../utils/getColor";

import { getGenres } from "../../../utils/getGenres";

export default function MovieCardInfo({
	cardRef,
	imageRef,
	cardHandleMouseLeave,
	selectedMedia,
}) {
	const { mediaId, release_date, vote_average, genre_ids, media_type } =
		selectedMedia;

	if (mediaId === undefined) {
		return null;
	}
	const genres = getGenres(media_type, genre_ids);
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
		<div
			className="hovercard"
			ref={cardRef}
			onMouseLeave={() => cardHandleMouseLeave()}
		>
			<div className="hovercard__image">
				<Image
					src=""
					alt="Image"
					draggable="false"
					ref={imageRef}
					className="aspect-video overflow-hidden"
					width={300}
					placeholder={`data:image/svg+xml;base64,${toBase64(
						shimmer(300, 165)
					)}`}
				/>
			</div>
			<div className="hovercard__content flex flex-col gap-2">
				<div className="flex items-center justify-between text-[0.9rem]">
					<div className="flex gap-1">
						<Cardbutton
							active={true}
							params={{
								pathname: "/watch",
								query: { mediaid: mediaId, type: media_type },
							}}
						>
							<FaPlay />
						</Cardbutton>
						<Cardbutton>
							<LuPlus />
						</Cardbutton>
						<Cardbutton>
							<BsHandThumbsUp />
						</Cardbutton>
					</div>
					<Cardbutton
						params={{
							pathname: "/browse",
							query: { mediaid: mediaId, type: media_type },
						}}
					>
						<BsChevronDown />
					</Cardbutton>
				</div>
				<div className="flex gap-3">
					<div className="movierating">
						<p
							style={{
								color: getColor(
									Math.round(vote_average * 100) / 10
								),
							}}
						>
							{Math.round(vote_average * 100) / 10}% Rating
						</p>
					</div>
					<div className="movieyear text-gray-300">
						<p>{release_date.slice(0, 4)}</p>
					</div>
				</div>
				<div className="flex items-center">
					{genres.map((genre, index) => (
						<Fragment key={index}>
							<p>{genre}</p>
							{index !== genres.length - 1 && (
								<span className="text-gray-500">
									<LuDot />
								</span>
							)}
						</Fragment>
					))}
				</div>
			</div>
		</div>
	);
}
