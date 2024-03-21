import { ImPlus } from "react-icons/im";

import Link from "next/link";

import Image from "next/image";

export default function Page() {
	return (
		<div className="flex items-center m-auto justify-center h-[100vh] flex-col gap-7">
			<p className="font-normal text-5xl">Who&apos;s Watching?</p>
			<div className="flex gap-7 items-center">
				<div className="profileblock  flex flex-col items-center gap-4">
					<div>
						<Link href="/browse">
							<Image
								src="/bouba.png"
								width={150}
								height={150}
								alt="empty"
							/>
						</Link>
					</div>
					<p className="text-[#6D6D6D]">Bouba</p>
				</div>
				<div className="profileblock flex flex-col items-center gap-4">
					<div>
						<Link href="/browse">
							<Image
								src="/kiki.png"
								width={150}
								height={150}
								alt="empty"
							/>
						</Link>
					</div>
					<p className="text-[#6D6D6D]">Kiki</p>
				</div>
				<div className="flex flex-col items-center gap-4">
					<div className="text-6xl h-[150px] w-[150px] flex">
						<div className="bg-[#7f7f7f] rounded-full m-auto text-[#181818] w-[110px] aspect-square flex items-center justify-center text-6xl">
							<ImPlus />
						</div>
					</div>
					<p className="text-[#6D6D6D]">Add Profile</p>
				</div>
			</div>
		</div>
	);
}
