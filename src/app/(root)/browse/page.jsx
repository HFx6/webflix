import MediaModal from "./mediamodal";

import Link from "next/link";

import MovieCard from "../components/moviecard";
import PlayButton from "../components/playbutton";
import MoreInfoButton from "../components/moreinfobutton";

import MediaListWrapper from "../components/medialistwrapper";

import Image from "next/image";

export default function Page({ searchParams }) {
	const { mediaid } = searchParams;
	return (
		<>
			<div>
				{mediaid ? <MediaModal mediaid={mediaid} /> : null}
				<div className="imagepage h-[100vh]">
					<Image
						src={
							"https://image.tmdb.org/t/p/original/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg"
						}
						alt="Picture of the author"
						width={0}
						height={0}
						sizes="100dvw"
						style={{
							width: "100%",
							height: "auto",
							position: "absolute",
							zIndex: "-1",
						}}
					/>
					<div className="heroinfo gap-3 mx-[2rem] my-auto">
						<Image
							src={
								"https://image.tmdb.org/t/p/original/6tpiiM1i862oS2tjSwqmjv4dKGD.png"
							}
							alt="Picture of the author"
							width="0"
							height="0"
							sizes="100dvw"
							className="w-[37%]"
						/>
						<p className="text-[0.75rem]">
							Follow the mythic journey of Paul Atreides as he
							unites with Chani and the Fremen while on a path of
							revenge against the conspirators who destroyed his
							family. Facing a choice between the love of his life
							and the fate of the known universe, Paul endeavors
							to prevent a terrible future only he can foresee.
						</p>
						<p>2024</p>
						<div className="flex gap-3">
							<PlayButton mediaid={"792307"}/>
							<MoreInfoButton mediaid={"792307"}/>
						</div>
					</div>
				</div>

				<MediaListWrapper />
			</div>
		</>
	);
}
