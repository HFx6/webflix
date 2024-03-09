"use client";
import { useEffect, useState } from "react";

export default function Scrollbar() {
	const [scrollPercentage, setScrollPercentage] = useState(0);
	let rafId = null;

	const handleScroll = () => {
		const windowHeight = window.innerHeight;
		const fullHeight = document.documentElement.scrollHeight;
		const currentPosition = window.scrollY;

		const scrollPercentage =
			fullHeight - windowHeight === 0
				? 0
				: (currentPosition / (fullHeight - windowHeight)) * 100;

		setScrollPercentage(Math.abs(scrollPercentage));
	};

	const handleScrollThrottled = () => {
		if (rafId !== null) {
			window.cancelAnimationFrame(rafId);
		}
		rafId = window.requestAnimationFrame(handleScroll);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScrollThrottled);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScrollThrottled);
			if (rafId !== null) {
				window.cancelAnimationFrame(rafId);
			}
		};
	}, []);

	return (
		<div
			className="scrollred"
			style={{ height: scrollPercentage + "dvh" }}
		></div>
	);
}
