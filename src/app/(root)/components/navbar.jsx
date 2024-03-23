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

import SearchInput from "./searchinput";

import Mobile from "./mobile";

import { db, logOutCurrentUser } from "../../../utils/db";

import { useLiveQuery } from "dexie-react-hooks";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

const pathname = "/docs";
export default function SiteHeader() {
	const current_user = useLiveQuery(() => db.current_user.toArray());
	const watchlist = useLiveQuery(() => db.watchlist.toArray());
	const liked = useLiveQuery(() => db.liked.toArray());
	const scrollPosition = useScrollPosition();
	const [user, setUser] = useState("");
	const router = useRouter();
	useEffect(() => {
		if (current_user?.length > 0) {
			setUser(current_user[0].username);
		}
	}, [current_user]);

	useEffect(() => {
		console.log("watchlist", watchlist);
		console.log("liked", liked);
	}, [watchlist, liked]);

	async function logOut() {
		logOutCurrentUser();
		router.push("");
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
							Series
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
							Latest
						</Link>
						<Link
							href="/trending"
							className={cn(
								"transition-colors hover:text-foreground/80",
								pathname?.startsWith("/examples")
									? "text-foreground"
									: "text-foreground/60"
							)}
						>
							Trending
						</Link>
					</nav>
				</div>
				<Mobile />
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
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
											src={`/${user}.png`}
											alt="@shadcn"
										/>
										<AvatarFallback>WF</AvatarFallback>
									</Avatar>
									<FaCaretDown />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-56"
								align="end"
								forceMount
							>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">
											{user}
										</p>
										<p className="text-xs leading-none text-muted-foreground">
											{user}@webflix.com
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										Profile
										<DropdownMenuShortcut>
											⇧⌘P
										</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										Billing
										<DropdownMenuShortcut>
											⌘B
										</DropdownMenuShortcut>
									</DropdownMenuItem>
									<DropdownMenuItem>
										Settings
										<DropdownMenuShortcut>
											⌘S
										</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => logOut()}>
									Log out
									<DropdownMenuShortcut>
										⇧⌘Q
									</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</nav>
				</div>
			</div>
		</header>
	);
}
