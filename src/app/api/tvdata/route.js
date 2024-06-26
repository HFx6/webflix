export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("mediaid");
	const type = searchParams.get("type");

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + process.env.TMDB_API_KEY,
		},
	};

	const dataRequest = await fetch(
		`https://api.themoviedb.org/3/tv/${query}?append_to_response=images%2Ccredits%2Cvideos%2Cexternal_ids%2Ccontent_ratings&language=en`,
		options
	);
	const data = await dataRequest.json();
	data.media_type = type;
	const usRelease = data.content_ratings.results.find(
		(result) => result.iso_3166_1 === "US"
	);	
	data.content_rating = usRelease ? usRelease.rating : "TBR";



	return Response.json({ data });
}
