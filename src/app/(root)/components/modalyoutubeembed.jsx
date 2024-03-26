"use client";

import { useState } from "react";

import YouTube from "react-youtube";

export default function YoutubeEmbed({ videoId, backdrop_path }) {
	const [ready, setReady] = useState(false);
	const opts = {
		height: "100%",
		width: "100%",
		playerVars: {
			autoplay: 1,
			controls: 0,
			showinfo: 0,
			modestbranding: 1,
			autohide: 1,
			mute: 1,
			iv_load_policy: 3,
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
		<div className="max-h-[720px] aspect-video relative">
			<div
				className="flex items-end px-8 py-4 gap-2 pointer-events-none"
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
				}}
			></div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={process.env.IMAGE_PATH + backdrop_path}
				alt="youtube embed placeholder"
				className={`w-full ${
					ready ? "opacity-0" : ""
				} absolute transition duration-700 ease-in-out`}
			/>
			{videoId ? (
				<YouTube
					videoId={videoId}
					opts={opts}
					className="h-[100%]"
					iframeClassName="w-full pointer-events-none scale-150"
					onReady={onPlayerReady}
					onEnd={onPlayerEnd}
					onPlay={() => setReady(true)}
				/>
			) : null}
		</div>
	);
}
