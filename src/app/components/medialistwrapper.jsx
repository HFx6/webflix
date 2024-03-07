import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import MediaListContent from "./medialistcontent";

export const revalidate = 3600;

async function getData() {
	const res = await fetch(process.env.URL + "/api/movies");
	return res.json();
}

async function getGenre() {
	const res = await fetch(process.env.URL + "/api/discover");
	return res.json();
}

const curatedLists = [
	{
		title: "Trending",
		endpoint: "/trending/all/week",
		apiParams: {
			language: "en-US",
		},
	},
	{
		title: "Popular movies on Netflix",
		endpoint: "/discover/movie",
		apiParams: {
			language: "en-US",
			primary_release_year: 2024,
			sort_by: "popularity.desc",
			include_adult: true,
			include_video: false,
			with_watch_providers: 8,
			with_original_language: "en",
			watch_region: "US",
		},
	},
	{
		title: "Popular shows on Netflix",
		endpoint: "/discover/tv",
		apiParams: {
			language: "en-US",
			first_air_date: "2024-01-01",
			include_adult: true,
			include_null_first_air_dates: false,
			sort_by: "popularity.desc",
			watch_region: "US",
			with_original_language: "en",
			with_watch_providers: 8,
		},
	},
	{
		title: "We Think You'll Love These",
		endpoint: "",
		apiParams: {},
	},
	{
		title: "Suspenseful Movies",
		endpoint: "",
		apiParams: {},
	},
	{
		title: "K-Dramas",
		endpoint: "",
		apiParams: {},
	},
	{
		title: "US TV Shows",
		endpoint: "",
		apiParams: {},
	},
	{
		title: "Documentaries",
		endpoint: "",
		apiParams: {},
	},
];

export default async function MediaListWrapper() {
	const movieData = getData();
	const genreData = getGenre();
	const [movies, genre] = await Promise.all([movieData, genreData]);
	return <MediaListContent movies={movies} genre={genre} />;
}
