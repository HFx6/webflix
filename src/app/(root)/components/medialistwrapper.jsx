import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import MediaListContent from "./medialistcontent";

export const revalidate = 1800;

export default async function MediaListWrapper({ curatedLists }) {
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
