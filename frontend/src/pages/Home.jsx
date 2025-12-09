import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';
import Filters from '../components/Filters';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Make sure this matches your backend port (5000)
        const res = await axios.get('http://localhost:5000/api/videos');
        setVideos(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Check backend connection.");
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const filteredVideos = selectedCategory === "All"
    ? videos
    : videos.filter((video) => video.category === selectedCategory);

  if (loading) return <div style={{padding: "20px"}}>Loading videos...</div>;
  if (error) return <div style={{padding: "20px", color: "red"}}>{error}</div>;

  return (
    <div className="home-container">
      <Filters 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      <div className="video-grid">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <p style={{padding: "20px"}}>No videos found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Home;