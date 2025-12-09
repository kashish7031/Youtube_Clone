import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Channel() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const ch = await api.get(`/channels/${id}`);
      setChannel(ch.data);

      const vid = await api.get(`/channels/${id}/videos`);
      setVideos(vid.data);
    })();
  }, [id]);

  const subscribe = async () => {
    const res = await api.put(`/channels/${id}/subscribe`);
    setChannel(res.data);
  };

  if (!channel) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 1200, margin: "2rem auto" }}>
      <h1>{channel.name}</h1>
      <p>{channel.description}</p>

      <p>{channel.subscribers.length} subscribers</p>

      {user && (
        <button onClick={subscribe}>
          {channel.subscribers.includes(user.id) ? "Unsubscribe" : "Subscribe"}
        </button>
      )}

      <hr />

      <h2>Videos</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 240px)", gap: 20 }}>
        {videos.map((v) => (
          <a href={`/video/${v._id}`} key={v._id} style={{ textDecoration: "none", color: "black" }}>
            <img src={v.thumbnail} style={{ width: "100%" }} />
            <p>{v.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
