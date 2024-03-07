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
export default async function MediaListWrapper() {
	const movieData = getData();
	const genreData = getGenre();
	const [movies, genre] = await Promise.all([movieData, genreData]);
	return <MediaListContent movies={movies} genre={genre} />;
}
