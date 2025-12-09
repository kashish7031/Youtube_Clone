// frontend/src/pages/VideoPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const res = await api.get(`/videos/${id}`);
        const v = res.data;
        setVideo(v);

        // v.url should be filename saved in DB (e.g. "167..._my.mp4")
        if (v.url) {
          // Use streaming endpoint
          setStreamUrl(`${import.meta.env.VITE_API_URL || ""}/videos/stream/${v.url}`);
        } else {
          setStreamUrl("");
        }
      } catch (err) {
        console.error("Failed to load video:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div style={{ padding: 20 }}>Loading video...</div>;
  if (!video) return <div style={{ padding: 20 }}>Video not found.</div>;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 20 }}>
      <div>
        {streamUrl ? (
          <video controls style={{ width: "100%", maxHeight: 420 }} src={streamUrl}>
            Your browser does not support the video tag.
          </video>
        ) : (
          <div style={{ padding: 20, border: "1px solid #eee" }}>
            No video file attached.
          </div>
        )}
      </div>

      <h2 style={{ marginTop: 20 }}>{video.title}</h2>
      <p>{video.description}</p>
      <p><small>Views: {video.views}</small></p>
    </div>
  );
}
