import localFont from "next/font/local";
import "./globals.css";

import NavBar from "./components/navbar";
import Footer from "./components/footer";


const netflixSans = localFont({
	src: [
	  {
		path: "../../../public/fonts/NetflixSans_W_Th.woff",
		weight: "100",
		style: "normal",
	  },
	  {
		path: "../../../public/fonts/NetflixSans_W_Lt.woff",
		weight: "300",
		style: "normal",
	  },
	  {
		path: "../../../public/fonts/NetflixSans_W_Rg.woff",
		weight: "400",
		style: "normal",
	  },
	  {
		path: "../../../public/fonts/NetflixSans_W_Md.woff",
		weight: "700",
		style: "normal",
	  },
	  {
		path: "../../../public/fonts/NetflixSans_W_Bd.woff",
		weight: "800",
		style: "normal",
	  },
	  {
		path: "../../../public/fonts/NetflixSans_W_Blk.woff",
		weight: "900",
		style: "normal",
	  },
	],
	variable: '--font-netflix-sans',
  });

export const metadata = {
	title: "webflix",
	description: "One month build of Netflix",
	icons: {
		icon: "/logo/logo.png",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${netflixSans.variable} font-netflixsans`}>
				<div className="relative flex min-h-screen flex-col bg-background">
					<NavBar />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
