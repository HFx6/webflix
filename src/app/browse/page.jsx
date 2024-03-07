import MediaModal from "./mediamodal";
export default function Page({ searchParams }) {
	// const router = useRouter();
	const { mediaid } = searchParams;
	console.log(searchParams);
	return (
		<div className="mt-20">
			<MediaModal mediaid={mediaid} />
		</div>
	);
}
