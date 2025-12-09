import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; 

const Home = () => {
  const [videos, setVideos] = useState([]);
  const path = useLocation().search; 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos${path}`);
        setVideos(res.data);
      } catch (err) {
        console.log("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, [path]);

  return (
    <div style={{ padding: '20px' }}>
      
      {/* Grid Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {videos.map((video) => (
          <Link to={`/video/${video._id}`} key={video._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', backgroundColor: 'white' }}>
              
              {/* Thumbnail */}
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                onError={(e) => { e.target.src = "https://via.placeholder.com/300x180?text=No+Thumbnail"; }} 
              />
              
              {/* Info */}
              <div style={{ padding: '12px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>{video.title}</h3>
                <p style={{ margin: 0, color: '#606060', fontSize: '14px' }}>{video.uploader}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#606060', marginTop: '8px' }}>
                   <span>{video.views || 0} views</span>
                   <span>• Just now</span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {videos.length === 0 && (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h3>No videos found.</h3>
            <p>Go to "My Channel" to upload your first video!</p>
        </div>
      )}
    </div>
  );
};

export default Home;