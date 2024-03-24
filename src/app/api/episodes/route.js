export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	const series_id = searchParams.get("series_id");
	const seasons = searchParams.get("seasons");

	const requestOptions = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + process.env.TMDB_API_KEY,
		},
	};

	const collectionReponse = await fetch(
		`https://api.themoviedb.org/3/tv/${series_id}?append_to_response=${Array.from(
			{ length: seasons },
			(_, i) => `season/${i + 1}`
		).join(",")}&language=en`,
		requestOptions
	);

	const collectionData = await collectionReponse.json();

	return Response.json({ data: collectionData });
}
