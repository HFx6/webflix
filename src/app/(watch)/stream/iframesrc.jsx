"use client";

import { useState, useRef, useEffect } from "react";

const sources = {
  smashystream: "https://embed.smashystream.com/playere.php?tmdb=",
  superembed: "https://multiembed.mov/?video_id=",
};

export default function IFrameSrc({ movie }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        {Object.keys(sources).map((source) => (
          <iframe
            key={sources[source] + movie.external_ids.imdb_id}
            src={sources[source] + movie.external_ids.imdb_id}
          ></iframe>
        ))}
      </div>
    </div>
  );
}
