import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";
import { TbInfoCircle } from "react-icons/tb";

export default function PlayButton() {
	return (
		<>
			<Button variant="moreinfo" className="flex gap-2 text-white">
				<TbInfoCircle className="text-xl" /> More Info
			</Button>
		</>
	);
}
