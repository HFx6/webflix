"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

import { useState } from "react";

import { fmtMSS } from "../../../utils/convertTime";

export default function Episodes({ series }) {
	const [season, setSeason] = useState(1);
	if (!series) {
		return null;
	}

	const handleSeasonChange = (season) => {
		setSeason(season);
	};

	return (
		<>
			<div className="w-full flex justify-between">
				<p className="font-medium text-2xl">Episodes</p>
				<Select onValueChange={handleSeasonChange} defaultValue={1}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Season 1" />
					</SelectTrigger>
					<SelectContent>
						{Array.from(
							{ length: series.number_of_seasons },
							(_, i) => (
								<SelectItem key={i} value={i + 1}>
									Season {i + 1}
								</SelectItem>
							)
						)}
					</SelectContent>
				</Select>
			</div>
			<p className="text-sm">Season {season}</p>
			<div className="flex flex-col w-full">
				{series["season/" + season].episodes.map((episode, index) => (
					<div
						key={episode.season_number + episode.episode_number}
						className="flex items-center gap-5 p-9 w-full border-b-2 border-[#353535] hover:bg-[#333333]"
					>
						<div className="text-2xl text-[#a5a5a5]">
							{episode.episode_number}
						</div>
						<div>
							<Image
								src={
									process.env.IMAGE_PATH + episode.still_path
								}
								alt={episode.name}
								width={200}
								height={100}
								className="max-w-32 min-w-32 w-32"
							/>
						</div>
						<div className="flex flex-col flex-auto">
							<div className="flex justify-between font-bold">
								<p>{episode.name}</p>

								<p>{fmtMSS(episode.runtime)}</p>
							</div>
							<div className="text-[#a5a5a5] text-sm">
								<p>{episode.overview}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
