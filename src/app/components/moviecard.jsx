import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ backdrop_path }) {
	return (
		<>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={"https://image.tmdb.org/t/p/original/" + backdrop_path}
				alt={backdrop_path}
				
				className="sdfsdfe3fe"
			/>
			
		</>
	);
}
