export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	const collectionid = searchParams.get("collectionid");

	const requestOptions = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + process.env.TMDB_API_KEY,
		},
	};

	const collectionReponse = await fetch(
		`https://api.themoviedb.org/3/collection/${collectionid}?language=en`,
		requestOptions
	);

	const collectionData = await collectionReponse.json();

	return Response.json({ data: collectionData });
}
