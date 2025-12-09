// frontend/src/pages/Home.jsx (example)
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await api.get("/videos");
        // if your backend wraps result e.g. { videos: [...] } adjust accordingly
        if (Array.isArray(res.data)) setVideos(res.data);
        else if (res.data.videos) setVideos(res.data.videos);
        else setVideos(res.data); // try fallback
      } catch (err) {
        console.error("GET /api/videos failed:", err);
        setError(err.response?.data?.message || err.message || "Failed to load videos");
      }
    }
    loadVideos();
  }, []);

  if (error) return <div style={{color: 'darkred'}}>Failed to load videos: {String(error)}</div>;
  if (!videos.length) return <div>No videos yet</div>;

  return (
    <div>
      <h1>Home</h1>
      <div>
        {videos.map(v => (
          <div key={v._id} style={{ marginBottom: 20 }}>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
            <a href={v.url} target="_blank" rel="noreferrer">Watch</a>
          </div>
        ))}
      </div>
    </div>
  );
}
