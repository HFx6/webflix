"use client";
import { useEffect, useState } from "react";
import useScrollPosition from "../hooks/useScrollPosition";

export default function Scrollbar() {
	const scrollPosition = useScrollPosition();

	return (
		<div
			className="scrollred"
			style={{ height: scrollPosition.percentage + "dvh" }}
		></div>
	);
}
