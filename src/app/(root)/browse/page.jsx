import MediaModal from "./mediamodal";

import Link from "next/link";

import MovieCard from "../components/moviecard";
import PlayButton from "../components/playbutton";
import MoreInfoButton from "../components/moreinfobutton";

import MediaListWrapper from "../components/medialistwrapper";

import YoutubeEmbed from "../components/youtubeembed";

import Image from "next/image";

async function getHero() {
	const res = await fetch(process.env.URL + "/api/hero", {
		next: { revalidate: 3600 },
	});
	return res.json();
}

const toBase64 = (str) =>
	typeof window === "undefined"
		? Buffer.from(str).toString("base64")
		: window.btoa(str);

async function fetchImage(src) {
	const response = await fetch(src);
	const buffer = await response.arrayBuffer();
	const base64Image = `data:image/jpeg;base64,${Buffer.from(buffer).toString(
		"base64"
	)}`;
	return base64Image;
}

export default async function Page({ searchParams }) {
	const { mediaid, type } = searchParams;
	const movieData = getHero();
	const [_movie] = await Promise.all([movieData]);
	const { movie, data } = _movie;

	const smallImage = await fetchImage(
		process.env.IMAGE_PATH_SMALL + movie.backdrop_path
	);

	return (
		<>
			<div>
				{mediaid && type ? (
					<MediaModal mediaid={mediaid} type={type} />
				) : null}
				<div className="imagepage h-full w-full aspect-video">
					<Image
						src={process.env.IMAGE_PATH + movie.backdrop_path}
						alt="Picture of the author"
						width={0}
						height={0}
						sizes="100dvw"
						style={{
							width: "100%",
							height: "auto",
							position: "absolute",
							zIndex: "-1",
						}}
						placeholder="blur"
						blurDataURL={smallImage}
					/>
					<YoutubeEmbed
						videoId={
							data.videos.results.find((m) => {
								return (
									m.site == "YouTube" && m.type == "Trailer"
								);
							}).key
						}
						shouldPlay={!(mediaid && type)}
					/>
					<div className="heroinfo gap-3 mx-[2.5vw] my-auto">
						<Image
							src={
								process.env.IMAGE_PATH +
								data.images.logos[0]?.file_path
							}
							alt="Picture of the author"
							width="0"
							height="0"
							sizes="100dvw"
							className="w-[37%]"
						/>
						<p className="text-[1vw]">{movie.overview}</p>
						<p>
							{movie.release_date?.slice(0, 4) ||
								movie.first_air_date?.slice(0, 4)}
						</p>
						<div className="flex gap-3">
							<PlayButton mediaid={movie.id} />
							<MoreInfoButton
								mediaid={movie.id}
								media_type={movie.media_type}
							/>
						</div>
					</div>
				</div>

				<MediaListWrapper />
			</div>
		</>
	);
}
