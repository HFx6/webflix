"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Fragment } from "react";

import { FaPlay } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

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
	return (
		<div
			className="hovercard"
			ref={cardRef}
			onMouseLeave={() => cardHandleMouseLeave()}
		>
			<div className="hovercard__image">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src=""
					alt="Image"
					draggable="false"
					ref={imageRef}
					className="aspect-video overflow-hidden"
				/>
			</div>
			<div className="hovercard__content flex flex-col gap-2">
				<div className="flex items-center justify-between text-[0.9rem]">
					<div className="flex gap-1">
						<Cardbutton
							active={true}
							params={{
								pathname: "/watch",
								query: { mediaid: mediaId },
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
							query: { mediaid: mediaId },
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
