import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import MediaListContent from "./medialistcontent";

export const revalidate = 3600;

const curatedLists = [
	{
		title: "Trending",
		endpoint: "/trending/all/day",
		apiParams: {
			language: "en",
		},
	},
	{
		title: "Popular movies on Netflix",
		endpoint: "/discover/movie",
		apiParams: {
			language: "en",
			sort_by: "popularity.desc",
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
			language: "en",
			include_null_first_air_dates: false,
			sort_by: "popularity.desc",
			watch_region: "US",
			with_original_language: "en",
			with_watch_providers: 8,
		},
	},
	{
		title: "We Think You'll Love These",
		endpoint: "/discover/movie",
		apiParams: {
			language: "en",
			sort_by: "popularity.desc",
			include_video: false,
			with_watch_providers: 8,
			with_original_language: "en",
			watch_region: "US",
			with_genres: 16,
		},
	},
	{
		title: "Documentaries",
		endpoint: "/discover/movie",
		apiParams: {
			language: "en",
			sort_by: "popularity.desc",
			include_video: false,
			with_watch_providers: 8,
			with_original_language: "en",
			watch_region: "US",
			with_genres: 99,
		},
	},
];

export default async function MediaListWrapper() {
	const listOfData = curatedLists.map((list) =>
		fetch(process.env.URL + `/api/dynamic`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				apiParams: list.apiParams,
				endpoint: list.endpoint,
			}),
		}).then((res) => res.json())
	);
	const results = await Promise.all(listOfData);
	
	return (
		<MediaListContent
			results={results}
			titles={curatedLists.map((list) => list.title)}
		/>
	);
}
