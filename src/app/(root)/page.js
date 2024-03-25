"use client";

import { ImPlus } from "react-icons/im";

import Link from "next/link";

import { useLiveQuery } from "dexie-react-hooks";

import Image from "next/image";

import { db, login } from "../../utils/db";

export default function Page() {
	const users = useLiveQuery(() => db.users.toArray());
	const loginWithUser = async (username) => {
		await login(username);
	};

	return (
		<div className="flex items-center m-auto justify-center h-[100vh] flex-col gap-7">
			<p className="font-normal text-5xl">Who&apos;s Watching?</p>
			<div className="flex gap-7 items-center">
				{users?.map((user) => (
					<div
						key={user.username}
						className="profileblock flex flex-col items-center gap-4"
					>
						<div>
							<Link href="/browse">
								<Image
									src={user.avatarUrl}
									width={150}
									height={150}
									alt="empty"
									onClick={() => loginWithUser(user.username)}
								/>
							</Link>
						</div>
						<p className="text-[#6D6D6D]">{user.username}</p>
					</div>
				))}
				<Link href="/newprofile">
					<div className="flex flex-col items-center gap-4">
						<div className="text-6xl h-[150px] w-[150px] flex">
							<div className="bg-[#7f7f7f] rounded-full m-auto text-[#181818] w-[110px] aspect-square flex items-center justify-center text-6xl">
								<ImPlus />
							</div>
						</div>
						<p className="text-[#6D6D6D]">Add Profile</p>
					</div>
				</Link>
			</div>
		</div>
	);
}
