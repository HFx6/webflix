import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";

export default function MoreInfoButton({ mediaid }) {
	return (
		<Link
			href={{
				pathname: "/watch",
				query: { mediaid },
			}}
			scroll={false}
		>
			<Button
				variant="secondary"
				className="flex gap-2 pointer-events-auto"
			>
				<FaPlay className="text-base" /> Play
			</Button>
		</Link>
	);
}
