import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; 

const Home = () => {
  const [videos, setVideos] = useState([]);
  const path = useLocation().search; 

  // CATEGORIES LIST
  const categories = ["All", "Music", "Gaming", "Tech", "Movies", "Education"];

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
      
      {/* FILTER BUTTONS (Scrollable on Mobile) */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        {categories.map((cat) => (
            <Link to={cat === "All" ? "/" : `/?tags=${cat}`} key={cat}>
                <button style={{
                    padding: '8px 15px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#e5e5e5',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap' // Prevents text from breaking lines
                }}>
                    {cat}
                </button>
            </Link>
        ))}
      </div>

      {/* RESPONSIVE VIDEO GRID */}
      <div style={{ 
        display: 'grid', 
        // This makes it Responsive: Cards are min 250px wide, max 1 fraction of space
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        {videos.map((video) => (
          <Link to={`/video/${video._id}`} key={video._id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', overflow: 'hidden', backgroundColor: 'white', display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              {/* Aspect Ratio 16/9 for Thumbnail */}
              <img 
                src={video.imgUrl || video.thumbnailUrl} 
                alt={video.title} 
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} 
                onError={(e) => { e.target.src = "https://via.placeholder.com/300x180?text=No+Thumbnail"; }} 
              />
              
              <div style={{ padding: '12px', flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {video.title}
                </h3>
                <p style={{ margin: 0, color: '#606060', fontSize: '14px' }}>{video.userId || video.uploader}</p>
                <div style={{ marginTop: '5px', fontSize: '12px', color: '#606060' }}>
                    {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;