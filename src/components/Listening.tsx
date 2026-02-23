import { useEffect, useState } from "react";
import "../styles/currently.scss";

type TrackState = {
  image: string;
  link: string;
  title: string;
  artist: string;
  listening: string;
};

const CACHE_KEY = "lastfm_nowplaying_v2";
const CACHE_TTL = 5 * 60 * 1000; // 5 min

const ListeningTo = () => {
  const [track, setTrack] = useState<TrackState>({
    image:
      "https://yihui-work.s3.us-east-2.amazonaws.com/placeholder-track-art.png",
    link: "https://music.apple.com/profile/adarzh",
    title: "Loading...",
    artist: "",
    listening: "",
  });

  useEffect(() => {
    const load = async () => {
      // ---- cache ----
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setTrack(parsed.data);
          return;
        }
      }

      // ---- fetch ----
      const res = await fetch(
        "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=adarzh-fm&api_key=b13db7190188f721828ec1ad92c30da3&format=json&limit=1"
      );
      const data = await res.json();
      const t = data.recenttracks.track[0];

      const artist = t.artist["#text"];
      const image = t.image?.[2]?.["#text"] || track.image;
      const title = t.name;
      const link = t.url;

      let listening: string;
      if (t["@attr"]?.nowplaying === "true") {
        listening = "🎵 Now Listening";
      } else {
        const d = new Date(Number(t.date.uts) * 1000);
        listening = `${d.getHours()}:${String(d.getMinutes()).padStart(
          2,
          "0"
        )}, ${d.toDateString()}`;
      }

      const next = { image, link, title, artist, listening };
      setTrack(next);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: next })
      );
    };

    load();
  }, []);

  return (
    <div>
      <span className="currently-header">I'm listening to:</span>

      <div id="currently-container">
        <a id="track-link" href={track.link} target="_blank" rel="noreferrer">
          <img
            id="currently-image"
            src={track.image}
            className="sidebar_asset"
          />
        </a>

        <div id="currently-info">
          <span id="track-title">{track.title}</span>
          <span id="track-artist">by {track.artist}</span>
          <span id="track-listening" style={{ opacity: 0.4 }}>
            {track.listening}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListeningTo;
