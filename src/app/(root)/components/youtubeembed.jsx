"use client";

import { useState } from "react";
import PlayButton from "../components/playbutton";
import { BsHandThumbsUp } from "react-icons/bs";
import { LuCheck } from "react-icons/lu";
import Cardbutton from "../components/cardbutton";

import YouTube from "react-youtube";

export default function YoutubeEmbed({ videoId, backdrop_path }) {
	const [ready, setReady] = useState(false);
	const opts = {
		height: "351",
		width: "640",
		playerVars: {
			autoplay: 1,
			controls: 0,
			showinfo: 0,
			modestbranding: 1,
			autohide: 1,
			mute: 1,
		},
	};
	async function onPlayerReady(event) {
		event.target.setVolume(0);
		event.target.playVideo();
	}
	function onPlayerEnd(event) {
		event.target.setVolume(0);
		event.target.playVideo();
	}

	return (
		<div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<div
				className="flex items-end px-8 py-4 gap-2 pointer-events-none"
				style={{
					background:
						"linear-gradient(0deg, #181818 0.15%, #181818 -17.5%, rgba(0, 0, 0, 0) 23%)",
					width: "100%",
					height: "352px",
					position: "absolute",
					zIndex: 3,
				}}
			>
				<PlayButton mediaid={"792307"} />
				<Cardbutton classNames={"border-[grey] bg-[#181818bf] pointer-events-auto"}>
					<LuCheck />
				</Cardbutton>
				<Cardbutton classNames={"border-[grey] bg-[#181818bf] pointer-events-auto"}>
					<BsHandThumbsUp />
				</Cardbutton>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={"https://image.tmdb.org/t/p/original/" + backdrop_path}
				alt="youtube embed placeholder"
				className={`w-full ${
					ready ? "opacity-0" : ""
				} absolute transition duration-700 ease-in-out h-[352px]`}
			/>

			<YouTube
				videoId={videoId}
				opts={opts}
				iframeClassName="w-full pointer-events-none"
				onReady={onPlayerReady}
				onEnd={onPlayerEnd}
				onPlay={() => setReady(true)}
			/>
		</div>
	);
}
