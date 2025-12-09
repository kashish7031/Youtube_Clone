// frontend/src/pages/Upload.jsx
import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h3>You must be signed in to upload videos.</h3>
      </div>
    );
  }

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a video file first");
    if (!title.trim()) return alert("Add a title");

    try {
      setLoading(true);
      const form = new FormData();
      form.append("video", file);
      form.append("title", title);
      form.append("description", description);
      form.append("tags", tags);

      const res = await api.post("/videos/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ev) => {
          if (ev.total) {
            setProgress(Math.round((ev.loaded * 100) / ev.total));
          }
        }
      });

      // server should return the created video object (with _id)
      const video = res.data;
      setLoading(false);
      setProgress(0);

      // redirect to video page (adjust path if your route differs)
      navigate(`/video/${video._id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 16 }}>
      <h2>Upload Video</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Video file
          <input type="file" accept="video/*" onChange={onFileChange} />
        </label>

        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a short title"
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description"
            style={{ width: "100%", minHeight: 120, padding: 8 }}
          />
        </label>

        <label>
          Tags (comma separated)
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. music,education"
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <div>
          <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {loading && (
          <div style={{ marginTop: 8 }}>
            <div>Progress: {progress}%</div>
            <progress value={progress} max="100" style={{ width: "100%" }} />
          </div>
        )}
      </form>
    </div>
  );
}
