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

export default function CarouselSize({ title, items }) {
	const cardRef = useRef(null);
	const imageRef = useRef(null);

	let delay = setTimeout(() => {}, 100);

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const handleMouseEnter = ({
		offset,
		offsetHeight,
		offsetWidth,
		backdrop_path,
	}) => {
		console.log(offset, offsetHeight, offsetWidth);
		let size = {
			height: offsetHeight,
			width: offsetWidth,
		};
		clearTimeout(delay);
		delay = setTimeout(async function () {
			imageRef.current.src =
				"https://image.tmdb.org/t/p/original/" + backdrop_path;
			cardRef.current.style.left = `${
				offset.left - (size.width * 1.5 - size.width) / 2
			}px`;
			await sleep(600);

			cardRef.current.classList.add("hovercard--active");
			cardRef.current.style.setProperty(
				"--translateY",
				`${size.width * 0.2}px`
			);
			cardRef.current.style.setProperty("--scale", "1");
			cardRef.current.style.width = `${size.width * 1.5}px`;
		}, 400);
	};

	const handleMouseLeave = async () => {
		clearTimeout(delay);
	};

	const cardHandleMouseLeave = async () => {
		await sleep(50);
		cardRef.current.style.setProperty("--scale", ".66");
		cardRef.current.style.setProperty("--translateY", "0px");
		await sleep(100);
		cardRef.current.classList.remove("hovercard--active");
	};

	const handleHover = ({ offset, height, width }) => {
		console.log(offset, height, width);
	};

	return (
		<>
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
								handleMouseEnter={handleMouseEnter}
								handleMouseLeave={handleMouseLeave}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div
				className="hovercard"
				ref={cardRef}
				onMouseLeave={() => cardHandleMouseLeave()}
			>
				<div className="hovercard__image">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={""}
						alt="Image"
						draggable="false"
						ref={imageRef}
					/>
				</div>
				<div className="hovercard__content">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Ullam doloremque est et recusandae ut facere fugit mollitia
					non eligendi ipsa iusto neque quasi excepturi provident vel
					nulla, aperiam atque cum.
				</div>
			</div>
		</>
	);
}
