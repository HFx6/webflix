"use client";

import Link from "next/link";
import useScrollPosition from "../hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { FaCaretDown } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { PiPencil } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";

import SearchInput from "./searchinput";

import Mobile from "./mobile";

import { db, logOutCurrentUser, login } from "../../../utils/db";

import { useLiveQuery } from "dexie-react-hooks";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

const pathname = "/docs";
export default function SiteHeader() {
	const current_user = useLiveQuery(() => db.current_user.toArray());
	const users = useLiveQuery(() => db.users.toArray());
	const scrollPosition = useScrollPosition();
	const [user, setUser] = useState("");
	const router = useRouter();
	useEffect(() => {
		setUser(current_user?.length ? current_user[0] : false);
	}, [current_user]);

	async function logOut() {
		logOutCurrentUser();
		router.push("/");
	}

	async function loginUser(username) {
		await login(username);
		router.push("/browse");
		router.refresh();
	}

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-300 bg-background/95 ${
				scrollPosition.pixels > 90 && "bg-black"
			} supports-[backdrop-filter]:bg-background/60`}
		>
			<div className="flex h-10 items-center mx-[2.5vw] my-1.5">
				<div className="mr-4 hidden md:flex">
					<Link
						href="/browse"
						className="mr-6 flex items-center space-x-2"
					>
						<Image
							src="/logo/100.png"
							width={100}
							height={25}
							alt="Picture of the author"
						/>
						<span className="hidden font-bold sm:inline-block"></span>
					</Link>
					<nav className="flex items-center gap-6 text-sm">
						<Link
							href="/browse"
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname === "/docs"
									? "text-foreground"
									: "text-foreground/60"
							)}
						>
							Home
						</Link>
						<Link
							href="/movies"
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname === "/docs"
									? "text-foreground"
									: "text-foreground/60"
							)}
						>
							Movies
						</Link>
						<Link
							href="/series"
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname?.startsWith("/docs/components")
									? "text-foreground"
									: "text-foreground/60"
							)}
						>
							TV Shows
						</Link>
						<Link
							href="/latest"
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname?.startsWith("/themes")
									? "text-foreground"
									: "text-foreground/60"
							)}
						>
							New & Popular
						</Link>
						<Link
							href="/mylist"
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname?.startsWith("/examples")
									? "text-foreground"
									: "text-foreground/60"
							)}
						>
							My list
						</Link>
					</nav>
				</div>
				<Mobile />
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					{user ? (
						<>
							<div className="w-full flex-1 md:w-auto md:flex-none flex gap-4 text-xl items-center">
								<SearchInput />
								<MdOutlineNotificationsNone className="cursor-pointer" />
							</div>
							<nav className="flex items-center">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="navbardropdown"
											className="relative h-8 ml-4 px-0"
										>
											<Avatar className="h-8 w-8 rounded-sm">
												<AvatarImage
													src={user.avatarUrl}
													alt="@shadcn"
												/>
												<AvatarFallback>
													WF
												</AvatarFallback>
											</Avatar>
											<FaCaretDown />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										className="w-56 bg-[#010101] text-white border-none"
										// className=""
										align="end"
										forceMount
									>
										<DropdownMenuGroup>
											{users?.map((user) => (
												<DropdownMenuItem
													key={user.id}
													onClick={() =>
														loginUser(user.username)
													}
													className="flex items-center gap-2 "
												>
													<Image
														src={user.avatarUrl}
														width={30}
														height={30}
														className="rounded-sm"
														alt={user.username}
													/>
													<span>{user.username}</span>
												</DropdownMenuItem>
											))}
											<DropdownMenuItem className="flex items-center gap-4 ">
												<PiPencil className="text-2xl" />
												<span>Manage profiles</span>
											</DropdownMenuItem>

											<DropdownMenuItem className="flex items-center gap-4 ">
												<CiUser className="text-2xl stroke-1" />
												<span>Account</span>
											</DropdownMenuItem>
											<DropdownMenuItem className="flex items-center gap-4 ">
												<GoQuestion className="text-2xl" />
												<span>Help Center</span>
											</DropdownMenuItem>
											<DropdownMenuItem></DropdownMenuItem>
										</DropdownMenuGroup>
										<DropdownMenuSeparator className="bg-gray-600" />
										<DropdownMenuItem
											onClick={() => logOut()}
										>
											Log out
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</nav>
						</>
					) : null}
				</div>
			</div>
		</header>
	);
}
