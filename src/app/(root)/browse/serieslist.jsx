async function getCollection(collectionid) {
	const res = await fetch(
		process.env.URL + "/api/collection?collectionid=" + collectionid
	);
	return res.json();
}
export default async function SeriesList({ title, collection_id }) {
  if (!collection_id || !title) {
    return null;
  }
	const collectionData = getCollection(collection_id);
	const [_collection] = await Promise.all([collectionData]);
	const collection = _collection.data;
	return (
		<div className="px-12 pb-14">
			<p>{title}</p>
			<div className="grid grid-cols-3 gap-4">
				{collection?.parts.map((movie) => {
					return (
						<div
							key={movie.id}
							className="group relative aspect-video"
						>
							<img
								src={
									process.env.IMAGE_PATH + movie.backdrop_path
								}
								alt={movie.title}
								className="w-full "
							/>
							<div className="bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
								<h1 className="text-xl font-bold">
									{movie.title}
								</h1>
								<p>{movie.overview.slice(0, 200)}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
