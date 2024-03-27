"use client";

import Image from "next/image";

import { useEffect, useRef, useState, useCallback } from "react";

import { Fragment } from "react";

import { FaPlay } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { LuDot } from "react-icons/lu";

import Cardbutton from "./cardbutton";

import { getColor } from "../../../utils/getColor";

import { getGenres } from "../../../utils/getGenres";

import {
	db,
	updateLikedMedia,
	updateWatchlistMedia,
	isMovieLiked,
	isMovieInWatchlist,
} from "../../../utils/db";

import { useLiveQuery } from "dexie-react-hooks";

async function fetchImage(src) {
	const response = await fetch(src);
	const arrayBuffer = await response.arrayBuffer();
	const base64Image = `data:image/jpeg;base64,${Buffer.from(
		arrayBuffer
	).toString("base64")}`;
	return base64Image;
}

export default function MovieCardInfo({
	cardRef,
	imageRef,
	cardHandleMouseLeave,
	selectedMedia,
}) {
	const {
		mediaId,
		release_date,
		vote_average,
		genre_ids,
		media_type,
		backdrop_path,
		poster_path,
	} = selectedMedia;

	const [liked, setLiked] = useState(false);
	const [watched, setWatched] = useState(false);
	const [user, setUser] = useState("");
	const current_user = useLiveQuery(() => db.current_user.toArray());

	useEffect(() => {
		if (mediaId !== undefined && current_user?.length) {
			setUser(current_user[0]);
		}
	}, [mediaId, current_user]);

	useEffect(() => {
		async function checkRecords() {
			const isLiked = await isMovieLiked(mediaId, user.username);
			const isInWatchlist = await isMovieInWatchlist(
				mediaId,
				user.username
			);
			setLiked(isLiked);
			setWatched(isInWatchlist);
		}
		if (user) {
			checkRecords();
		}
	}, [mediaId, user]);

	useEffect(() => {
		const loadSmallImage = async () => {
			const smallImage = await fetchImage(
				process.env.IMAGE_PATH_SMALL + backdrop_path
			);
			setSrc(smallImage);
		};

		loadSmallImage();
	}, [backdrop_path]);

	const addMoveToWatchlist = async (mediaId) => {
		setWatched(await updateWatchlistMedia(mediaId, selectedMedia));
	};

	const addMovieToLiked = async (mediaId) => {
		setLiked(await updateLikedMedia(mediaId));
	};

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
	const [src, setSrc] = useState(
		`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`
	);

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
				<Image
					src={
						backdrop_path
							? process.env.IMAGE_PATH + backdrop_path
							: poster_path
							? process.env.IMAGE_PATH + poster_path
							: "/logo/noimage.png"
					}
					alt="Image"
					draggable="false"
					ref={imageRef}
					loading="eager"
					className="aspect-video overflow-hidden"
					width={300}
					height={150}
					placeholder="blur"
					blurDataURL={src}
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
						<Cardbutton active={watched}>
							<LuPlus
								onClick={() => addMoveToWatchlist(mediaId)}
							/>
						</Cardbutton>
						<Cardbutton active={liked}>
							<BsHandThumbsUp
								onClick={() => addMovieToLiked(mediaId)}
							/>
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
						<p>{release_date?.slice(0, 4)}</p>
					</div>
				</div>
				<div className="flex items-center flex-wrap">
					{genres.map((genre, index) => (
						<Fragment key={index}>
							<p>{genre}</p>
							{index !== genres?.length - 1 && (
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
