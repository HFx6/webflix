"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const useScrollPosition = () => {
	const [scrollPercentage, setScrollPercentage] = useState({
		percentage: 0,
		pixels: 0,
	});
	const rafId = useRef(null);

	const handleScroll = useCallback(() => {
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
	}, []);

	const handleScrollThrottled = useCallback(() => {
		if (rafId.current !== null) {
			window.cancelAnimationFrame(rafId.current);
		}
		rafId.current = window.requestAnimationFrame(handleScroll);
	}, [handleScroll]);

	useEffect(() => {
		window.addEventListener("scroll", handleScrollThrottled);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScrollThrottled);
			if (rafId.current !== null) {
				window.cancelAnimationFrame(rafId.current);
			}
		};
	}, [handleScroll, handleScrollThrottled]);

	return scrollPercentage;
};

export default useScrollPosition;
