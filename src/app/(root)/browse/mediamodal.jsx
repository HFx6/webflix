import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import dynamic from "next/dynamic";

import YouTubeEmbed from "../components/youtubeembed";

async function getMovie() {
	const res = await fetch(process.env.URL + "/api/discover");
	return res.json();
}
function getColor(value) {
	const colors = [
		{ val: 0, color: "red" },
		{ val: 30, color: "orange" },
		{ val: 60, color: "yellow" },
		{ val: 80, color: "#21d07a" },
	];

	let colorToUse = colors[0].color;

	for (let i = 0; i < colors.length; i++) {
		if (value < colors[i].val) {
			break;
		}
		colorToUse = colors[i].color;
	}

	return colorToUse;
}
async function MediaModal({ mediaid }) {
	const movieData = getMovie();
	const [movie] = await Promise.all([movieData]);
	return (
		<Dialog defaultOpen={mediaid}>
			<DialogContent className={"overflow-y-scroll max-h-screen"}>
				<DialogHeader>
					{/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
					<DialogDescription>
						{/* <video src="https://www.youtube.com/embed/tQucjg4-Q6M"></video> */}
						
						<YouTubeEmbed videoId={"tQucjg4-Q6M"} />
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://image.tmdb.org/t/p/original/gOWf4IYBP2m1Q7dhbQJkwxH714x.png"
							alt="movie backdrop"
						/>
						<div className="flex p-6">
							<div className="flex flex-col">
								<div className="flex">
									<div
										className="movierating"
										style={{ color: getColor(84) }}
									>
										<p>84% score</p>
									</div>
									<div className="movieyear text-gray-300">
										<p>2020</p>
									</div>
									<div className="movieruntime text-gray-300">
										<p>1h 30m</p>
									</div>
								</div>

								<div className="flex">M+</div>
								<p>Dune Part two</p>
								<p>
									Follow the mythic journey of Paul Atreides
									as he unites with Chani and the Fremen while
									on a path of revenge against the
									conspirators who destroyed his family.
									Facing a choice between the love of his life
									and the fate of the known universe, Paul
									endeavors to prevent a terrible future only
									he can foresee.
								</p>
							</div>

							<div className="flex flex-col">
								<div className="flex">
									Cast: <p>John Doe, Jane Doe</p>
								</div>
								<div className="flex">
									Genres: <p>Animation</p>
								</div>
								<div className="flex">
									This show is: <p>John Doe, Jane Doe</p>
								</div>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default dynamic(() => Promise.resolve(MediaModal), { ssr: false });
