export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("mediaid");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_API_KEY,
    },
  };

  const dataRequest = await fetch(
    `https://api.themoviedb.org/3/movie/${query}?append_to_response=images%2Ccredits%2Cvideos%2Cexternal_ids%2Crelease_dates&language=en`,
    options
  );
  const data = await dataRequest.json();

  data.media_type = data.media_type
    ? data.media_type
    : data.first_air_date
    ? "tv"
    : "movie";
  const usRelease = data.release_dates.results.find(
    (result) => result.iso_3166_1 === "US"
  );

  if (usRelease) {
    const certification = usRelease.release_dates.find(
      (release_date) => release_date.certification !== ""
    )?.certification;

    data.content_rating = certification ? certification : "TBR";
  } else {
    data.content_rating = "TBR";
  }

  return Response.json({ data });
}
