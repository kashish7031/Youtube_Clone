// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api.js"; // <-- important path: src/api/api.js
import VideoCard from "../components/VideoCard.jsx";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function loadVideos() {
      setLoading(true);
      setErr(null);
      try {
        // GET /api/videos
        const res = await api.get("/videos");
        // backend sometimes returns { ok: true, videos: [...] } or { videos: [...] }
        const dataVideos = res?.data?.videos ?? res?.data ?? [];
        // If dataVideos is an object with ok property and a videos array nested, handle it
        if (Array.isArray(dataVideos)) {
          setVideos(dataVideos);
        } else if (res?.data?.data && Array.isArray(res.data.data.videos)) {
          setVideos(res.data.data.videos);
        } else {
          // try to be flexible
          const arr = Array.isArray(res.data) ? res.data : [];
          setVideos(arr);
        }
      } catch (error) {
        console.error("GET /videos error:", error);
        setErr(error);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Home</h1>
      </header>

      <section style={styles.container}>
        {loading && <p style={styles.info}>Loading videos…</p>}

        {!loading && err && (
          <div style={styles.errorBox}>
            <h3>Failed to load videos</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {err?.response?.data ? JSON.stringify(err.response.data, null, 2) : String(err)}
            </pre>
            <p>Check backend server, API url and CORS.</p>
          </div>
        )}

        {!loading && !err && videos.length === 0 && (
          <p style={styles.info}>No videos found. Try seeding the backend or upload a video.</p>
        )}

        {!loading && !err && videos.length > 0 && (
          <div style={styles.grid}>
            {videos.map((v) => (
              <VideoCard key={v._id || v.id || Math.random()} video={v} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

const styles = {
  page: { padding: "24px 40px", fontFamily: "system-ui, sans-serif", color: "#222" },
  header: { marginBottom: 12 },
  h1: { margin: 0, fontSize: 28 },
  container: { marginTop: 24 },
  info: { color: "#666" },
  errorBox: { background: "#ffecec", border: "1px solid #f1c0c0", padding: 12, borderRadius: 6 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
};
