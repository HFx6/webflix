'use client';

import { useState, useEffect } from "react";

const useScrollPosition = () => {
	const [scrollPercentage, setScrollPercentage] = useState({
		percentage: 0,
		pixels: 0,
	});
	let rafId = null;

	const handleScroll = () => {
		const windowHeight = window.innerHeight;
		const fullHeight = document.documentElement.scrollHeight;
		const currentPosition = window.scrollY;

		const _scrollPercentage =
			fullHeight - windowHeight === 0
				? 0
				: (currentPosition / (fullHeight - windowHeight)) * 100;

		setScrollPercentage({
			percentage: Math.abs(_scrollPercentage),
			pixels: currentPosition,
		});
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

	return scrollPercentage;
};

export default useScrollPosition;
