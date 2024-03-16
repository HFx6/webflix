"use client";

import React, { useRef, useEffect, useCallback } from "react";

function InfiniteGrid({ load, hasMore, children }) {
	const sentinelRef = useRef(null);
	const observerRef = useRef(null);

	const handleIntersect = useCallback(
		(entries) => {
			console.log("intersecting");
			if (entries[0].isIntersecting && hasMore) {
				load();
			}
		},
		[load, hasMore]
	);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(handleIntersect, {
			root: null,
			rootMargin: "0px",
			threshold: 1.0,
		});

		if (sentinelRef.current) {
			observerRef.current.observe(sentinelRef.current);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, [handleIntersect]);

	useEffect(() => {
		if (observerRef.current && sentinelRef.current) {
			observerRef.current.disconnect();
			observerRef.current.observe(sentinelRef.current);
		}
	}, [hasMore]);

	return (
		<>
			{children}
			<div ref={sentinelRef} style={{ marginBottom: "280px" }}></div>
		</>
	);
}

export default InfiniteGrid;
