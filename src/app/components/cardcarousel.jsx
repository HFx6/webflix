"use client";

import { useRef } from "react";

import MovieCard from "./moviecard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselSize({
	title,
	items,
	handleMouseEnter,
	handleMouseLeave,
}) {
	return (
		<div>
			<p>{title}</p>
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
							<MovieCard
								key={movie.id}
								backdrop_path={movie.backdrop_path}
								handleMouseEnter={handleMouseEnter}
								handleMouseLeave={handleMouseLeave}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
