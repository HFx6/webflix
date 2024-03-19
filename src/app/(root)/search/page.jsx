import React, { Suspense } from "react";

import SearchResults from "./searchresults";

export default async function Search() {
	return (
		<Suspense>
			<SearchResults />
		</Suspense>
	);
}
