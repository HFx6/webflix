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

async function getMovie(mediaid) {
	const res = await fetch(
		process.env.URL + "/api/moviedata?mediaid=" + mediaid
	);
	return res.json();
}
function getColor(value) {
	const colors = [
		{ val: 0, color: "red" },
		{ val: 30, color: "orange" },
		{ val: 60, color: "yellow" },
		{ val: 75, color: "#21d07a" },
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

function fmtMSS(s) {
	let minutes = s % 60;
	let hours = (s - minutes) / 60;
	let result = "";
	if (hours > 0) {
		result += hours + "h ";
	}
	if (minutes > 0) {
		result += minutes + "m";
	}
	return result.trim();
}

async function MediaModal({ mediaid }) {
	const movieData = getMovie(mediaid);
	const [_movie] = await Promise.all([movieData]);
	const movie = _movie.data;

	return (
		<Dialog defaultOpen={mediaid}>
			<DialogContent className={"overflow-y-scroll max-h-screen"}>
				<DialogHeader>
					{/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
					<DialogDescription></DialogDescription>
				</DialogHeader>
				{/* <video src="https://www.youtube.com/embed/tQucjg4-Q6M"></video> */}

				<YouTubeEmbed
					videoId={
						movie.videos.results.find((m) => {
							return m.site == "YouTube" && m.type == "Trailer";
						}).key
					}
					backdrop_path={movie.backdrop_path}
				/>
				{/* eslint-disable-next-line @next/next/no-img-element */}

				<div className="flex p-12">
					<div className="flex flex-col basis-[70%] gap-3 leading-none lg:text-3xl md:text-base text-sm ">
						<div className="flex gap-3">
							<div
								className="movierating"
								style={{
									color: getColor(
										Math.round(movie.vote_average * 100) /
											10
									),
								}}
							>
								<p>
									{Math.round(movie.vote_average * 100) / 10}%
									rating
								</p>
							</div>
							<div className="movieyear text-[#8e8e8e] font-semibold">
								<p>{movie.release_date.slice(0, 4)}</p>
							</div>
							<div className="movieruntime text-[#8e8e8e] font-semibold">
								<p>{fmtMSS(movie.runtime)}</p>
							</div>
						</div>

						<p>{movie.overview}</p>
					</div>

					<div className="flex flex-col basis-[30%] gap-3 leading-none lg:text-3xl md:text-base text-sm">
						<p>
							<span className="text-[#595959]">Cast: </span>
							{movie?.credits?.cast
								?.slice(0, 3)
								.map((u) => u.name)
								.join(", ")}
							, more
						</p>

						<p>
							<span className="text-[#595959]">Genres: </span>
							{movie?.genres?.map((u) => u.name).join(", ")}
						</p>

						{/* <div>
							This show is: <p>John Doe, Jane Doe</p>
						</div> */}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default dynamic(() => Promise.resolve(MediaModal), { ssr: false });
