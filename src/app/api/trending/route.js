export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("mediaid");

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer "+process.env.TMDB_API_KEY,
		},
	};

	const dataRequest = await fetch(
		`https://api.themoviedb.org/3/trending/all/day?language=en-US`,
		options
	);
	const data = await dataRequest.json();

	const dataRequest2 = await fetch(
		`https://api.themoviedb.org/3/movie/${data.results[0].id}/images?include_image_language=en&language=en`,
		options
	);
	const data2 = await dataRequest2.json();


	

	return Response.json({ movie: data.results[0], image: data2.logos[0] });
}
