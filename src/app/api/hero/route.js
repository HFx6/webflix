export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	const mediaId = searchParams.get("mediaid");

	const requestOptions = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + process.env.TMDB_API_KEY,
		},
	};

	const trendingRequest = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?language=en-US`,
		requestOptions
	);
	const trendingData = await trendingRequest.json();

	let randomMovieIndex = Math.floor(
		Math.random() * trendingData.results.length
	);
	let selectedMovie = trendingData.results[randomMovieIndex];

	selectedMovie.media_type =
		selectedMovie.media_type || selectedMovie.first_air_date
			? "tv"
			: "movie";


	const imagesRequest = await fetch(
		`https://api.themoviedb.org/3/${selectedMovie.media_type}/${selectedMovie.id}/images?include_image_language=en&language=en`,
		requestOptions
	);
	const imagesData = await imagesRequest.json();

	return Response.json({ movie: selectedMovie, image: imagesData.logos[0] });
}
