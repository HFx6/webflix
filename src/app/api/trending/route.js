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

	return Response.json({ data });
}
