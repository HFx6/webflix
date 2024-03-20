export async function GET() {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + process.env.TMDB_API_KEY,
		},
	};

	const dataRequest = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?language=en-US`,
		options
	);
	const data = await dataRequest.json();

	// loop through the results and remove any that dont have media_type of movie or tv
	data.results = data.results.filter(
		(result) => result.media_type === "movie" || result.media_type === "tv"
	);

	return Response.json({ data });
}
