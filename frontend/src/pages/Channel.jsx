// frontend/src/pages/Channel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Channel = () => {
  // --- STATE ---
  const [videos, setVideos] = useState([]);
  
  // Form State for Uploading
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: ''
  });

  // State for Editing
  const [editingId, setEditingId] = useState(null); // ID of video being edited
  const [editTitle, setEditTitle] = useState('');

  // HARDCODED USER FOR TESTING (Replace this with: const { user } = useContext(AuthContext);)
  const currentUser = { _id: "user01", name: "My Channel" }; 

  // --- FETCH VIDEOS (READ) ---
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetch videos only for this user
        const res = await axios.get(`http://localhost:5000/api/videos/user/${currentUser._id}`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, [currentUser._id]);

  // --- HANDLERS ---

  // 1. CREATE (Upload)
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/videos", {
        ...uploadData,
        uploader: currentUser._id,
        channelId: "channel01" // Placeholder
      });
      setVideos([...videos, res.data]); // Update UI instantly
      setUploadData({ title: '', description: '', thumbnailUrl: '', videoUrl: '' }); // Reset form
      alert("Video Uploaded Successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  // 2. DELETE
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos(videos.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 3. UPDATE (Start Editing)
  const startEditing = (video) => {
    setEditingId(video._id);
    setEditTitle(video.title);
  };

  // 3. UPDATE (Save Changes)
  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/videos/${id}`, { title: editTitle });
      setVideos(videos.map(v => v._id === id ? { ...v, title: editTitle } : v));
      setEditingId(null); // Exit edit mode
    } catch (err) {
      console.error(err);
    }
  };

  // --- RENDER ---
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* HEADER */}
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
        <h1>{currentUser.name} Dashboard</h1>
        <p>Manage your content here.</p>
      </div>

      {/* UPLOAD SECTION */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
        <h2>Upload New Video</h2>
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Video Title" 
            value={uploadData.title}
            onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
            required 
            style={{ padding: '10px' }}
          />
           <input 
            type="text" 
            placeholder="Thumbnail Image URL" 
            value={uploadData.thumbnailUrl}
            onChange={(e) => setUploadData({...uploadData, thumbnailUrl: e.target.value})}
            required 
            style={{ padding: '10px' }}
          />
          <input 
            type="text" 
            placeholder="Video URL (mp4 or youtube link)" 
            value={uploadData.videoUrl}
            onChange={(e) => setUploadData({...uploadData, videoUrl: e.target.value})}
            required 
            style={{ padding: '10px' }}
          />
          <textarea 
            placeholder="Description" 
            value={uploadData.description}
            onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
            style={{ padding: '10px' }}
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#cc0000', color: 'white', border: 'none', cursor: 'pointer' }}>
            UPLOAD VIDEO
          </button>
        </form>
      </div>

      {/* VIDEO LIST SECTION */}
      <h2>My Videos ({videos.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {videos.map((video) => (
          <div key={video._id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Thumbnail */}
            <img src={video.thumbnailUrl} alt={video.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            
            <div style={{ padding: '10px' }}>
              {/* Edit Mode Logic */}
              {editingId === video._id ? (
                <div>
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)} 
                    style={{ width: '100%', marginBottom: '5px' }}
                  />
                  <button onClick={() => saveEdit(video._id)} style={{ marginRight: '5px', backgroundColor: 'green', color: 'white', border:'none', padding:'5px' }}>Save</button>
                  <button onClick={() => setEditingId(null)} style={{ backgroundColor: 'gray', color: 'white', border:'none', padding:'5px' }}>Cancel</button>
                </div>
              ) : (
                <h4 style={{ margin: '0 0 10px 0' }}>{video.title}</h4>
              )}
              
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => startEditing(video)}
                  style={{ flex: 1, padding: '5px', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(video._id)}
                  style={{ flex: 1, padding: '5px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;