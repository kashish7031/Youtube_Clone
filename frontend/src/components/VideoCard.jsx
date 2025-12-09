// frontend/src/components/VideoCard.jsx
import React from "react";

export default function VideoCard({ video }) {
  // backend may return user as id string or object; safe-guard accesses
  const title = video?.title || "Untitled";
  const desc = video?.description || "";
  const url = video?.url || "";
  const createdAt = video?.createdAt ? new Date(video.createdAt).toLocaleString() : "";

  return (
    <article style={styles.card}>
      <div style={styles.thumb}>
        {/* if url is an external video, we show a placeholder thumbnail */}
        <div style={styles.videoBox}>
          <a href={url} target="_blank" rel="noreferrer" style={styles.link}>
            {url ? "Open" : "No video URL"}
          </a>
        </div>
      </div>

      <div style={styles.meta}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.desc}>{desc}</p>
        <div style={styles.footer}>
          <small>{createdAt}</small>
        </div>
      </div>
    </article>
  );
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eee",
    borderRadius: 6,
    padding: 12,
    background: "#fff",
    minWidth: 240,
    maxWidth: 360,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  thumb: {
    height: 160,
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f6f6f6",
    borderRadius: 6,
  },
  videoBox: {
    padding: 8,
  },
  link: {
    textDecoration: "none",
    color: "#0d6efd",
    fontWeight: 600,
  },
  meta: {
    paddingTop: 6,
  },
  title: {
    margin: 0,
    fontSize: 18,
  },
  desc: {
    margin: "6px 0",
    color: "#555",
    fontSize: 14,
  },
  footer: {
    marginTop: 8,
    color: "#888",
  },
};
