"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbInfoCircle } from "react-icons/tb";
import { usePathname } from "next/navigation";


export default function MoreInfoButton({ mediaid, media_type }) {
	const pathname = usePathname();
	return (
		<Link
			href={{
				pathname: pathname,
				query: { mediaid, type: media_type },
			}}
			scroll={false}
		>
			<Button variant="moreinfo" className="flex gap-2 text-white">
				<TbInfoCircle className="text-xl" /> More Info
			</Button>
		</Link>
	);
}
