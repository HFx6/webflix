import { LuPlus } from "react-icons/lu";

import Link from "next/link";

async function getCollection(collectionid) {
	const res = await fetch(
		process.env.URL + "/api/collection?collectionid=" + collectionid
	);
	return res.json();
}
export default async function CollectionGrid({ title, collection_id }) {
	if (!collection_id || !title) {
		return null;
	}
	const collectionData = getCollection(collection_id);
	const [_collection] = await Promise.all([collectionData]);
	const collection = _collection.data;
	return (
		<div className="px-12 pb-14">
			<p className="text-xl mb-4 font-semibold">{title}</p>
			<div className="grid grid-cols-3 gap-5">
				{collection?.parts.map((movie) => {
					return (
						<div
							key={movie.id}
							className="h-full rounded-sm overflow-hidden flex flex-col "
						>
							<Link href={`/browse?mediaid=${movie.id}`} passHref>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={
										movie.backdrop_path
											? process.env.IMAGE_PATH +
											  movie.backdrop_path
											: "/logo/noimage.png"
									}
									alt={movie.title}
									className="w-full aspect-video"
								/>
							</Link>
							<div className="bg-[#2F2F2E] text-[#808080] p-3 flex-1">
								<div className="flex justify-between">
									<div className="flex items-center gap-2">
										<span>
											{movie.release_date?.slice(0, 4) ||
												movie.first_air_date?.slice(
													0,
													4
												) ||
												"tba"}
										</span>

										<span className="description-badge">
											HD
										</span>
										<svg
											viewBox="0 0 58.07 24"
											className="w-8"
										>
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
									<div className="cursor-pointer w-9 h-9 bg-opacity-60 border border-white border-opacity-70 rounded-full flex items-center justify-center text-white">
										<LuPlus size={30} />
									</div>
								</div>
								<h1 className="font-bold">{movie.title}</h1>
								<p className="text-sm">
									{movie.overview?.slice(0, 100)}...
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
