"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbInfoCircle } from "react-icons/tb";
import { useRouter } from "next/navigation";


export default function MoreInfoButton({ mediaid, media_type }) {
	const router = useRouter();
	return (
		<Link
			href={{
				pathname: router.pathname,
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
