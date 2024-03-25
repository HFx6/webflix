"use client";

import Link from "next/link";

import Image from "next/image";

import { db, login } from "../../../utils/db";

export default function Page() {
	const loginWithUser = async (username) => {
		await login(username);
	};
	return (
		<div className="flex items-center m-auto h-[100vh] flex-col gap-7">
			<p className="font-normal text-5xl">WAdd profile</p>
			<p>Add a profile for another person watching Webflix.</p>
			<div className="flex">
				<Image
					src="/avatar.png"
					alt="avatar"
					width={100}
					height={100}
				/>
        <input />
        {/* check box */}
        <input type="checkbox" />
			</div>
      <div className="flex">
        <button>Continue</button>
        <button>Cancel</button>
      </div>
		</div>
	);
}
