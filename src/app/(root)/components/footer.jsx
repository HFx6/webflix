import React from "react";

import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export default async function Footer() {
	return (
		<div className="mt-28 mb-4 mx-auto flex flex-col gap-4 w-[60vw]">
			<div className="flex gap-4 m-[10px]">
				<FaFacebookF />
				<FaInstagram />
				<FaYoutube />
			</div>
			<div className="grid grid-cols-4 gap-3 font-normal text-[#686868] text-xs">
				<p>Audio Description</p>
				<p>Help Centre</p>
				<p>Gift cards</p>
				<p>Media Centre</p>
				<p>Investor Relations</p>
				<p>Jobs</p>
				<p>Webflix Shop</p>
				<p>Terms of Use</p>
				<p>Privacy</p>
				<p>Legal noticves</p>
				<p>Cookie preferences</p>
				<p>Corporate information</p>
				<p>Contact us</p>
			</div>
			<p className="font-normal text-[#686868] text-xs mt-5">
				© 2024-{new Date().getFullYear()} Webflix, INC.
			</p>
		</div>
	);
}
