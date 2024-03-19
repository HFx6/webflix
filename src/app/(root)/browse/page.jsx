import MediaModal from "./mediamodal";

import Link from "next/link";

import MovieCard from "../components/moviecard";
import PlayButton from "../components/playbutton";
import MoreInfoButton from "../components/moreinfobutton";

import MediaListWrapper from "../components/medialistwrapper";

import Image from "next/image";

async function getHero() {
	const res = await fetch(process.env.URL + "/api/hero", {
		next: { revalidate: 86400 },
	});
	return res.json();
}

export default async function Page({ searchParams }) {
	const { mediaid } = searchParams;
	const movieData = getHero();
	const [_movie] = await Promise.all([movieData]);
	const { movie, image } = _movie;
	return (
		<>
			<div>
				{mediaid ? <MediaModal mediaid={mediaid} /> : null}
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
					/>
					<div className="heroinfo gap-3 mx-[2.5vw] my-auto">
						<Image
							src={process.env.IMAGE_PATH + image.file_path}
							alt="Picture of the author"
							width="0"
							height="0"
							sizes="100dvw"
							className="w-[37%]"
						/>
						<p className="text-[1vw]">{movie.overview}</p>
						<p>{movie.release_date.slice(0, 4)}</p>
						<div className="flex gap-3">
							<PlayButton mediaid={movie.id} />
							<MoreInfoButton mediaid={movie.id} />
						</div>
					</div>
				</div>

				<MediaListWrapper />
			</div>
		</>
	);
}
