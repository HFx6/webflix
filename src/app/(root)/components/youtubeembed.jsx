"use client";

import { useState, useEffect, useRef } from "react";

import YouTube from "react-youtube";

export default function YoutubeEmbed({ videoId, shouldPlay }) {
	const [ready, setReady] = useState(false);
	const playerRef = useRef(null);

	useEffect(() => {
		if (shouldPlay) {
			playerRef.current.getInternalPlayer().playVideo();
		} else {
			playerRef.current.getInternalPlayer().pauseVideo();
		}
	}, [shouldPlay]);

	const opts = {
		height: "100%",
		width: "100%",
		playerVars: {
			controls: 0,
			showinfo: 0,
			modestbranding: 1,
			autohide: 1,
			mute: 1,
			iv_load_policy: 3,
		},
	};
	async function onPlayerReady(event) {
		setTimeout(() => {
			event.target.setVolume(0);
			if (shouldPlay) {
				event.target.playVideo();
			} else {
				event.target.pauseVideo();
			}
		}, 2000);
	}
	function onPlayerEnd(event) {
		event.target.setVolume(0);
		event.target.playVideo();
	}
	async function onPlay(event) {
		setTimeout(() => {
			setReady(true);
		}, 500);
	}

	return (
		<>
			<YouTube
				ref={playerRef}
				videoId={videoId}
				opts={opts}
				className={`h-full w-full absolute z-[-1] transition-opacity duration-500 ${
					ready ? "opacity-1" : "opacity-0"
				}`}
				iframeClassName="w-full pointer-events-none scale-150"
				onReady={onPlayerReady}
				onPlay={onPlay}
				onEnd={onPlayerEnd}
			/>
		</>
	);
}
