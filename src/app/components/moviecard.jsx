"use client";

import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ backdrop_path }) {
	let delay = setTimeout(() => {}, 100);

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	const handleHover = async (e) => {
		let active = false;
		let offset = e.target.getBoundingClientRect();
		let size = {
			height: e.target.offsetHeight,
			width: e.target.offsetWidth,
		};
		document
			.querySelectorAll(".hovercard")
			.forEach((card) => card.classList.remove("card--active"));
		clearTimeout(delay);
		delay = setTimeout(async function () {
			document.querySelector(".hovercard").querySelector("img").src =
				"https://image.tmdb.org/t/p/original/" + backdrop_path;
			document.querySelector(
				".hovercard"
			).style.cssText = `--scale: .66; width: ${
				size.width * 1.5
			}px; left: ${
				offset.left - (size.width * 1.5 - size.width) / 2
			}px; top: ${offset.top}px;`;
			await sleep(600);

			document.querySelector(".hovercard").classList.add("card--active");
			document.querySelector(
				".hovercard"
			).style.cssText += `--translateY: -${
				size.width * 0.2
			}px; --scale: 1; width: ${size.width * 1.5}px;`;
		}, 400);
	};
	return (
		<>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={"https://image.tmdb.org/t/p/original/" + backdrop_path}
				alt={backdrop_path}
				className="sdfsdfe3fe"
				onMouseOver={handleHover}
				onMouseOut={async () => {
					clearTimeout(delay);
				}}
			/>
			<div
				className="hovercard"
				onMouseOut={async (e) => {
					await sleep(50);
					e.target.style.cssText +=
						"--scale: .66; --translateY: 0px;";
					await sleep(100);
					e.target.classList.remove("card--active");
				}}
			>
				<div className="card__image">
					<img src="" alt="Image" draggable="false" />
				</div>
				<div className="card__content">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Ullam doloremque est et recusandae ut facere fugit mollitia
					non eligendi ipsa iusto neque quasi excepturi provident vel
					nulla, aperiam atque cum.
				</div>
			</div>
		</>
	);
}
