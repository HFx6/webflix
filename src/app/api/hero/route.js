export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	const type = searchParams.get("type");

	const requestOptions = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + process.env.TMDB_API_KEY,
		},
	};

	const trendingRequest = await fetch(
		`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=en&with_watch_providers=8`,
		requestOptions
	);
	const trendingData = await trendingRequest.json();

	let randomMovieIndex = Math.floor(
		Math.random() * trendingData.results?.length
	);
	let selectedMovie = trendingData.results[randomMovieIndex];
	selectedMovie.media_type =
		selectedMovie.media_type ||
		(selectedMovie.first_air_date ? "tv" : "movie");

	const dataRequest = await fetch(
		`https://api.themoviedb.org/3/${selectedMovie.media_type}/${selectedMovie.id}?append_to_response=images%2Ccredits%2Cvideos%2Cexternal_ids&language=en`,
		requestOptions
	);

	const data = await dataRequest.json();

	return Response.json({ movie: selectedMovie, data });
}
