import Link from "next/link";

import MovieCard from "./components/moviecard";
import PlayButton from "./components/playbutton";
import MoreInfoButton from "./components/moreinfobutton";

import Carousel from "./components/cardcarousel";


import Image from "next/image";

export const revalidate = 3600;

async function getData() {
	const res = await fetch(process.env.URL + "/api/movies");
	return res.json();
}

async function getGenre() {
	const res = await fetch(process.env.URL + "/api/discover");
	return res.json();
}

export default async function Page() {
	const movieData = getData();
	const genreData = getGenre();
	const [movies, genre] = await Promise.all([movieData, genreData]);

	return (
		<>
			<div>
				<div className="imagepage mt-[52px]">
					<Image
						src={
							"https://image.tmdb.org/t/p/original/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg"
						}
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
					<div className="heroinfo gap-3 mx-[4rem] my-auto">
						<Image
							src={
								"https://image.tmdb.org/t/p/original/6tpiiM1i862oS2tjSwqmjv4dKGD.png"
							}
							alt="Picture of the author"
							width="0"
							height="0"
							sizes="100dvw"
							className="w-[65%]"
						/>
						<p>
							Follow the mythic journey of Paul Atreides as he
							unites with Chani and the Fremen while on a path of
							revenge against the conspirators who destroyed his
							family. Facing a choice between the love of his life
							and the fate of the known universe, Paul endeavors
							to prevent a terrible future only he can foresee.
						</p>
						<p>2024</p>
						<div className="flex gap-3">
							<PlayButton />
							<MoreInfoButton />
						</div>
					</div>
				</div>
				<div className="flex flex-col moviecardsblock relative mx-[4rem] my-3">
					<Carousel title={"Trending"} items={movies?.data.results}/>
					<Carousel title={"Animation"} items={genre?.data.results}/>
				</div>
			</div>
		</>
	);
}
