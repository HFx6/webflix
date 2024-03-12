"use client";

import { useState } from "react";

import YouTube from "react-youtube";

export default function YoutubeEmbed({ videoId }) {
	const [ready, setReady] = useState(false);
	const opts = {
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
			<img
				src="https://image.tmdb.org/t/p/original//ibk375gQlUnEUyqyQpt2rCiHll7.jpg"
				alt=""
				className={`w-full ${
					ready ? "opacity-0" : ""
				} absolute transition duration-700 ease-in-out`}
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
