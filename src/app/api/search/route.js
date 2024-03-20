export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("q");
	const page = searchParams.get("page");
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + process.env.TMDB_API_KEY,
		},
	};

	const dataRequest = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
			query
		)}&include_adult=true&with_watch_providers=8&language=en-US&page=${encodeURIComponent(page)}`,
		options
	);
	const data = await dataRequest.json();

	return Response.json({ data });
}
