import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments"; // <--- IMPORT THIS

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [subscribed, setSubscribed] = useState(false); 

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/find/${id}`);
        setVideo(res.data);
        await axios.put(`http://localhost:5000/api/videos/view/${id}`);
      } catch (err) { console.error("Error fetching video:", err); }
    };
    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/like/${id}`);
      setVideo({ ...video, likes: res.data.likes }); 
    } catch (err) { console.error(err); }
  };

  const handleDislike = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/dislike/${id}`);
      setVideo({ ...video, dislikes: res.data.dislikes }); 
    } catch (err) { console.error(err); }
  };

  const handleSubscribe = () => { setSubscribed(!subscribed); };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/")) return url.replace("youtu.be/", "youtube.com/embed/");
    return url; 
  };

  if (!video) return <div style={{padding:'20px'}}>Loading video...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      
      <div style={{ borderRadius: "10px", overflow: "hidden", backgroundColor: "black", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
        {video.videoUrl && video.videoUrl.includes("uploads") ? (
          <video controls autoPlay width="100%" height="500px" style={{ display: "block" }}>
             <source key={video.videoUrl} src={video.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <iframe width="100%" height="500px" src={getEmbedUrl(video.videoUrl)} title="Video Player" frameBorder="0" allowFullScreen></iframe>
        )}
      </div>

      <h1 style={{ marginTop: "20px", fontSize: "24px" }}>{video.title}</h1>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
        <p style={{ color: "#555" }}>{video.views || 0} views</p>
        <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleLike} style={{cursor:'pointer', padding:'8px 15px'}}>👍 {video.likes || 0}</button>
            <button onClick={handleDislike} style={{cursor:'pointer', padding:'8px 15px'}}>👎 {video.dislikes || 0}</button>
            <button onClick={handleSubscribe} style={{ padding: "10px 20px", backgroundColor: subscribed ? "#ccc" : "#cc0000", color: subscribed ? "black" : "white", border: "none", cursor: "pointer", fontWeight: 'bold' }}>
                {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
            </button>
        </div>
      </div>

      <div style={{ marginTop: "20px", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
        <h3>Description</h3>
        <p>{video.description}</p>
      </div>

      {/* --- NEW COMMENTS SECTION --- */}
      <hr style={{margin: '30px 0', border: '0', borderTop: '1px solid #ccc'}} />
      <h3>Comments</h3>
      <Comments videoId={video._id} />

    </div>
  );
};

export default VideoPage;