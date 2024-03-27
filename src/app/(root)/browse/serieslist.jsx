import Episodes from "../components/episodes";

async function getCollection(series_id, seasons) {
	const res = await fetch(
		`${process.env.URL}/api/episodes?series_id=${series_id}&seasons=${seasons}`
	);
	return res.json();
}
export default async function SeriesList({ series_id, seasons }) {
	if (!series_id || !seasons) {
		return null;
	}
	const episodesData = getCollection(series_id, seasons);
	const [_episodes] = await Promise.all([episodesData]);
	const episodes = _episodes.data;

	return (
		<div className="px-12 pb-14">
			<Episodes series={episodes}/>
		</div>
	);
}
