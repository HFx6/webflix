"use client";

// import { Input } from "@/components/ui/input";

import useScrollPosition from "../hooks/useScrollPosition";

import { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function SearchInput() {
	const router = useRouter();
	const scrollPosition = useScrollPosition();
	const [show, setShow] = useState(false);
	const inputRef = useRef(null);
	const buttonRef = useRef(null);

	function handleFocus() {
		setShow(true);
		inputRef.current.focus();
	}

	function handleBlur(e) {
		setShow(false);
	}

	function handleSubmit(e) {
		e.preventDefault();
		router.push(`/search?q=${inputRef.current.value}`);
	}

	return (
		<form onSubmit={handleSubmit} autoComplete="off">
			<div
				className={`flex items-center p-1 ${
					scrollPosition.pixels > 90 && show
						? "border-white border-[1px]"
						: ""
				} ${show ? "gap-2" : ""} `}
				onBlur={handleBlur}
			>
				<FiSearch
					className="cursor-pointer"
					onClick={handleFocus}
				/>
				<input
					className={`${
						show ? "w-52" : "w-0"
					} searchinput text-base bg-transparent transition-[width] duration-300 border-transparent focus:outline-none focus:border-transparent focus:ring-0 focus:shadow-transparent`}
					ref={inputRef}
					name="q"
				/>
				<button type="submit" style={{ display: "none" }}>
					Submit
				</button>
			</div>
		</form>
	);
}
