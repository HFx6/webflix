"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import dynamic from "next/dynamic";

function MediaModal({ mediaid }) {
	return (
		<div className="mt-20">
			<Dialog defaultOpen={mediaid}>
				<DialogTrigger>Open</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently
							delete your account and remove your data from our
							servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default dynamic(() => Promise.resolve(MediaModal), { ssr: false });
