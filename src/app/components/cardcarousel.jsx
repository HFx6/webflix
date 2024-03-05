import * as React from "react";

import MovieCard from "./moviecard";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselSize({ items }) {
	return (
		<Carousel
			opts={{
				align: "start",
				loop: "true",
			}}
			className="w-full"
		>
			<CarouselContent>
				{items.map((movie, index) => (
					<CarouselItem
						key={index}
						className="md:basis-1/2 lg:basis-1/6"
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						{/* <img
							src={
								"https://image.tmdb.org/t/p/original/" +
								movie.backdrop_path
							}
							alt={movie.backdrop_path}
							className="sdfsdfe3fe"
						/> */}
            <MovieCard
									key={movie.id}
									backdrop_path={movie.backdrop_path}
								/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
