"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addUser, login } from "../../../utils/db";

export default function Page() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [isValid, setIsValid] = useState(true);

	const registerUser = async (event) => {
		event.preventDefault();
		if (!username || username.length < 3) {
			setIsValid(false);
			return;
		}
		setIsValid(true);
		await addUser(username);
		await login(username);
		router.push("/browse");
	};

	return (
		<form onSubmit={registerUser}>
			<div className="flex items-center m-auto justify-center h-[100vh] flex-col gap-7">
				<div className="flex flex-col gap-5">
					<p className="font-normal text-5xl">Add profile</p>
					<p className="text-[grey]">
						Add a profile for another person watching Webflix.
					</p>
					<div className="flex gap-5 items-center">
						<Image
							src="/avatar.png"
							alt="avatar"
							width={100}
							height={100}
						/>
						<input
							className={`h-9 w-80 rounded-sm bg-[#676667] text-white placeholder-white p-3 ${
								!isValid ? "border-red-500 border-[1px]" : ""
							}`}
							placeholder="Name"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<div className="flex gap-1 items-center">
							<input
								type="checkbox"
								className="block profilecheckbox appearance-none h-9 w-9 border-[1px] border-[#676667] bg-[#181818] accent-[#181818]"
							/>
							<p className="text-2xl font-thin">Kid?</p>
						</div>
					</div>
					<div className="flex gap-4">
						<button
							className="bg-white text-[#181818] px-6 py-1 text-base font-medium"
							type="submit"
						>
							Continue
						</button>
						<button className="bg-[#181818] text-[#676667] px-6 py-1 border-[1px] border-[#676667] text-base font-medium">
							Cancel
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
