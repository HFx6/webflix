import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";

export default function MoreInfoButton() {
	return (
		<Link
			href={{
				pathname: "/watch",
				query: { mediaid: "23423432" },
			}}
			scroll={false}
		>
			<Button variant="secondary" className="flex gap-2">
				<FaPlay className="text-base" /> Play
			</Button>
		</Link>
	);
}
