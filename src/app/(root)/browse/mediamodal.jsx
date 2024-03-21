import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

import { BsHandThumbsUp } from "react-icons/bs";

import dynamic from "next/dynamic";

import YouTubeEmbed from "../components/youtubeembed";

import CollectionGrid from "./collectiongrid";

import { Suspense } from "react";

import { fmtMSS } from "../../../utils/convertTime";
import { getColor } from "../../../utils/getColor";

async function getMovie(mediaid) {
	const res = await fetch(
		process.env.URL + "/api/moviedata?mediaid=" + mediaid
	);
	return res.json();
}

async function getTv(mediaid) {
	const res = await fetch(process.env.URL + "/api/tvdata?mediaid=" + mediaid);
	return res.json();
}

async function MediaModal({ mediaid, type }) {

	const mediaData = type == "tv" ? getTv(mediaid) : getMovie(mediaid);
	const [_media] = await Promise.all([mediaData]);
	const media = _media.data;
	
	return (
		<Dialog defaultOpen={mediaid}>
			<DialogContent className={"overflow-y-scroll max-h-screen"}>
				<DialogHeader>
					<div className="modal-header">
						<YouTubeEmbed
							videoId={
								media.videos.results.find((m) => {
									return (
										m.site == "YouTube" &&
										m.type == "Trailer"
									);
								}).key
							}
							backdrop_path={media.backdrop_path}
						/>

						<div className="header-content">
							<div className="header-title">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={
										process.env.IMAGE_PATH +
										media.images.logos[0]?.file_path
									}
									alt="Tears Of Steel"
								/>

								<div className="header-buttons">
									<button type="button" className="play">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
												fill="currentColor"
											></path>
										</svg>
										Play
									</button>

									<button type="button" className="add">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z"
												fill="currentColor"
											></path>
										</svg>
									</button>
									<button type="button" className="rate">
										<BsHandThumbsUp size={24} />
									</button>
									<button type="button" className="volume">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z"
												fill="currentColor"
											></path>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</DialogHeader>

				<div className="modal">
					<div className="modal-body">
						<div className="modal-content-first">
							<div className="modal-description">
								<div className="description-match">
									<span
										style={{
											color: getColor(
												Math.round(
													media.vote_average * 100
												) / 10
											),
										}}
									>
										{Math.round(media.vote_average * 100) /
											10}
										% Rating
									</span>
								</div>
								<span>{media.release_date?.slice(0, 4)}</span>
								<svg viewBox="0 0 100 100">
									<path
										id="Fill-41"
										fill="#D7262D"
										d="M92.06 0H7.594A7.592 7.592 0 000 7.592V92.06a7.594 7.594 0 007.594 7.594H92.06c4.199 0 7.594-3.4 7.594-7.594V7.592A7.59 7.59 0 0092.06 0"
									></path>
									<path
										id="Shape"
										fill="#FFFEFD"
										d="M30.596 27.01h7.828v46.465h-8.929V38.928a14.121 14.121 0 01-2.52 2.085A14.722 14.722 0 0124 42.477v-8.335c1.595-.913 2.947-1.965 4.058-3.16a12.723 12.723 0 002.538-3.972zm35.248 28.73c0-2.36-.162-3.894-.482-4.603-.32-.708-.904-1.062-1.745-1.062-.844 0-1.428.403-1.76 1.208-.333.804-.502 2.29-.502 4.457v6.373c0 2.36.161 3.895.484 4.602.32.708.914 1.062 1.778 1.062.82 0 1.397-.385 1.73-1.158.332-.772.497-2.274.497-4.506V55.74zm9.605-18.475v.483h-9.605v-.483c0-2.36-.162-3.894-.482-4.602-.32-.708-.904-1.063-1.745-1.063-.844 0-1.428.408-1.76 1.223-.333.817-.502 2.296-.502 4.442v9.302c.844-1.073 1.79-1.867 2.843-2.382 1.054-.516 2.266-.773 3.641-.773 2.659 0 4.602.821 5.833 2.462 1.23 1.642 1.843 4.265 1.843 7.871v4.956c0 5.6-.87 9.463-2.608 11.586-1.74 2.125-4.815 3.188-9.223 3.188-4.434 0-7.517-1.057-9.258-3.17-1.74-2.115-2.608-5.983-2.608-11.604V40.71c0-5.6.868-9.452 2.608-11.555C56.167 27.052 59.25 26 63.684 26c4.453 0 7.527.8 9.223 2.397 1.694 1.6 2.542 4.556 2.542 8.868z"
									></path>
								</svg>
								<span>{fmtMSS(media.runtime)}</span>
								<span className="description-badge">HD</span>
								<svg viewBox="0 0 58.07 24">
									<path
										fill="currentColor"
										d="M18.34,10.7v7.62l-4.73,0ZM.5,26.6h8l2.17-3,7.49,0s0,2.08,0,3.06h5.7V2.77H17C16.3,3.79.5,26.6.5,26.6Z"
										transform="translate(-0.5 -2.62)"
									></path>
									<path
										fill="currentColor"
										d="M30.63,8.91c3.6-.13,6.1,1.8,6.48,4.9.5,4.15-2.43,6.85-6.66,6.56V9.19A.26.26,0,0,1,30.63,8.91ZM25,3V26.56c5.78.11,10.22.32,13.49-1.85a12.2,12.2,0,0,0,5.14-11.36A11.52,11.52,0,0,0,33.38,2.72c-2.76-.23-8.25,0-8.25,0A.66.66,0,0,0,25,3Z"
										transform="translate(-0.5 -2.62)"
									></path>
									<path
										fill="currentColor"
										d="M43.72,3.43c1.45-.4,1.88,1.2,2.51,2.31a18.73,18.73,0,0,1-1.42,20.6h-.92a1.86,1.86,0,0,1,.42-1.11,21.39,21.39,0,0,0,2.76-10.16A22.54,22.54,0,0,0,43.72,3.43Z"
										transform="translate(-0.5 -2.62)"
									></path>
									<path
										fill="currentColor"
										d="M48.66,3.43c1.43-.4,1.87,1.2,2.5,2.31a18.83,18.83,0,0,1-1.42,20.6h-.91c-.07-.42.24-.79.41-1.11A21.39,21.39,0,0,0,52,15.07,22.63,22.63,0,0,0,48.66,3.43Z"
										transform="translate(-0.5 -2.62)"
									></path>
									<path
										fill="currentColor"
										d="M53.57,3.43c1.46-.4,1.9,1.2,2.54,2.31a18.58,18.58,0,0,1-1.44,20.6h-.93c-.07-.42.24-.79.42-1.11A21,21,0,0,0,57,15.07,22.26,22.26,0,0,0,53.57,3.43Z"
										transform="translate(-0.5 -2.62)"
									></path>
								</svg>
							</div>

							<p>{media.overview}</p>
						</div>

						<div className="modal-content-second">
							<div className="cast">
								<span className="title">Cast: </span>
								{media?.credits?.cast
									?.slice(0, 3)
									.map((u) => u.name)
									.join(", ")}
								, more
							</div>

							<div className="genres">
								<span className="title">Genres: </span>
								{media?.genres?.map((u) => u.name).join(", ")}
							</div>
						</div>
					</div>
					<Suspense>
						<CollectionGrid
							collection_id={media?.belongs_to_collection?.id}
							title={media?.belongs_to_collection?.name}
						/>
					</Suspense>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default dynamic(() => Promise.resolve(MediaModal), { ssr: false });
