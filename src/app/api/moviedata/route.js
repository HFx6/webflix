export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("mediaid");


	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWZiYTVjNDU5Mzc0NDE3MjAwM2ZiOWZiZDQ4NDgzZCIsInN1YiI6IjY1ZTMxMDQ0NDk4ZWY5MDE0YmVjOGUxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qTx2nWz1LRzDohr6fKBONGiceiDkoqTfUxK0e6R6uYU",
		},
	};

	const dataRequest = await fetch(
		"https://api.themoviedb.org/3/movie/792307?append_to_response=credits%2Cvideos&language=en-US",
		options
	);
	const data = await dataRequest.json();
	console.log(data);

	return Response.json({ data });
}
