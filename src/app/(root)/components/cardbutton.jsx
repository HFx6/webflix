"use client";
import Link from "next/link";

export default function Cardbutton({ children, active, params, classNames }) {
	return (
		<Link href={params || "#"} scroll={false}>
			<div
				className={`${
					active ? "!text-black bg-white" : "border-zinc-50 border-2 "
				} border-zinc-50 border-2 rounded-full p-2 ${classNames}`}
			>
				{children}
			</div>
		</Link>
	);
}
