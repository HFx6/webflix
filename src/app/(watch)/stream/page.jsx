import IFrameSrc from "./iframesrc.jsx";

async function getMovie(mediaid) {
  const res = await fetch(
    process.env.URL + "/api/moviedata?mediaid=" + mediaid
  );
  return res.json();
}

export default async function WatchMedia({ searchParams }) {
  const { mediaid } = searchParams;

  const movieData = getMovie(mediaid);
  const [_movie] = await Promise.all([movieData]);
  const movie = _movie.data;

  return (
    <>
      <IFrameSrc movie={movie} />
    </>
  );
}
