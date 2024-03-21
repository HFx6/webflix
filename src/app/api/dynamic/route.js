import { NextResponse } from "next/server";

export async function POST(request, res) {
	const { apiParams, endpoint } = await request.json();
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + process.env.TMDB_API_KEY,
		},
	};
	console.log("apiParams", apiParams);
	const dataRequest = await fetch(
		`https://api.themoviedb.org/3${endpoint}?${new URLSearchParams(
			apiParams
		)}`,
		options
	);
	const data = await dataRequest.json();
	console.log("data", data);
	return NextResponse.json({ data });
}
