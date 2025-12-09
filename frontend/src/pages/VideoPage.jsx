import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comments from '../components/Comments'; // Import the new component
import '../App.css';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) setUser(JSON.parse(loggedInUser));
    
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    if (!user) return alert("Please login to like");
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/like/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!user) return alert("Please login to dislike");
    try {
      const res = await axios.put(`http://localhost:5000/api/videos/dislike/${id}`);
      setVideo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!video) return <div style={{padding:"20px"}}>Loading...</div>;

  return (
    <div className="video-page-container">
      <div className="video-wrapper">
        <video 
          src={video.videoUrl} 
          controls 
          className="video-player"
          poster={video.thumbnailUrl}
        ></video>
        
        <h1 className="video-title">{video.title}</h1>
        
        <div className="video-info">
          <span>{video.views} views • {new Date(video.uploadDate).toLocaleDateString()}</span>
          <div className="video-actions">
            <button className="action-btn" onClick={handleLike}>👍 {video.likes}</button>
            <button className="action-btn" onClick={handleDislike}>👎 {video.dislikes}</button>
          </div>
        </div>
        
        <div className="channel-desc">
          <p className="uploader-name">{video.uploader}</p>
          <p className="description">{video.description}</p>
        </div>

        <hr />
        
        {/* ADD COMMENTS SECTION */}
        <Comments videoId={video._id} />
      </div>
    </div>
  );
};

export default VideoPage;