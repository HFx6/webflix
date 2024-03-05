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

export default async function Page() {
	const movieData = getData();
	const [movies] = await Promise.all([movieData]);

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
					<div className="heroinfo gap-3 mx-20 my-auto">
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
				<div className="flex flex-col moviecardsblock relative ml-20 my-3">
					{/* <Carousel items={movies?.data.results}/> */}
					<div className="scontainer">
						<div className="slider">
							<div className="slider__title">
								Popular On Netflix
							</div>
							<div className="slider__content">
								<div className="swiper">
									<div className="swiper-wrapper">
										{movies?.data.results?.map((movie) => (
											<div className="swiper-slide" key={movie.id}>
												<div className="item">
													<div className="item__inner">
														<MovieCard
															
															backdrop_path={
																movie.backdrop_path
															}
														/>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <div className="moviecards my-3">
						{movies?.data.results?.map((movie) => (
							<MovieCard
								key={movie.id}
								backdrop_path={movie.backdrop_path}
							/>
						))}
					</div> */}
					{/* <p>horror</p>
					<div className="moviecards my-3">
						{movies?.data.results?.map((movie) => (
							<MovieCard
								key={movie.id}
								backdrop_path={movie.backdrop_path}
							/>
						))}
					</div>
					<p>action</p>
					<div className="moviecards my-3">
						{movies?.data.results?.map((movie) => (
							<MovieCard
								key={movie.id}
								backdrop_path={movie.backdrop_path}
							/>
						))}
					</div>
					<p>comedy</p>
					<div className="moviecards my-3">
						{movies?.data.results?.map((movie) => (
							<MovieCard
								key={movie.id}
								backdrop_path={movie.backdrop_path}
							/>
						))}
					</div> */}
				</div>
			</div>
		</>
	);
}
