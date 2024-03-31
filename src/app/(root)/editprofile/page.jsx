import React, { Suspense } from "react";

import EditProfile from "./editprofile";

export default async function Search() {
	return (
		<Suspense>
			<EditProfile />
		</Suspense>
	);
}
