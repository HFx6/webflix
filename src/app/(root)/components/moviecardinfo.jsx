"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { FaPlay } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { FaStar } from "react-icons/fa";

import Cardbutton from "./cardbutton";


function getColor(value) {
	const colors = [
		{ val: 0, color: "red" },
		{ val: 30, color: "orange" },
		{ val: 60, color: "yellow" },
		{ val: 80, color: "#21d07a" },
	];

	let colorToUse = colors[0].color;

	for (let i = 0; i < colors.length; i++) {
		if (value < colors[i].val) {
			break;
		}
		colorToUse = colors[i].color;
	}

	return colorToUse;
}

export default function MovieCardInfo({
	cardRef,
	imageRef,
	cardHandleMouseLeave,
	mediaId
}) {
	return (
		<div
			className="hovercard"
			ref={cardRef}
			onMouseLeave={() => cardHandleMouseLeave()}
		>
			<div className="hovercard__image">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src="" alt="Image" draggable="false" ref={imageRef} />
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
					<div
						className="movierating"
						style={{ color: getColor(84) }}
					>
						<p>84% score</p>
					</div>
					<div className="movieyear text-gray-300">
						<p>2020</p>
					</div>
					<div className="movieruntime text-gray-300">
						<p>1h 30m</p>
					</div>
				</div>
				<div className="flex items-center">
					<p>Drama</p>
					<span className="text-gray-500">
						<LuDot />
					</span>
					<p>Comedy</p>
					<span className="text-gray-500">
						<LuDot />
					</span>
					<p>Thriller</p>
				</div>
			</div>
		</div>
	);
}
