import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Channel = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  
  // State for Texts
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(''); // Text Input
  const [videoUrl, setVideoUrl] = useState('');         // Text Input
  
  // State for Files
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // AUTH CHECK
  useEffect(() => {
    const user = localStorage.getItem("user"); 
    if (!user) { navigate('/login'); } // Kick out if not logged in
  }, [navigate]);

  const currentUser = { _id: "653c29926345678912345678", name: "My Channel" }; 

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/user/${currentUser._id}`);
        setVideos(res.data);
      } catch (err) { console.error(err); }
    };
    fetchVideos();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("uploader", currentUser._id);
    formData.append("channelId", "channel01");
    
    // Append Text URLs (if typed)
    formData.append("thumbnailUrl", thumbnailUrl);
    formData.append("videoUrl", videoUrl);
    
    // Append Files (if selected)
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    if (videoFile) formData.append("video", videoFile);

    try {
      const res = await axios.post("http://localhost:5000/api/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideos([...videos, res.data]);
      alert("Uploaded Successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Upload Failed! Check console.");
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this video?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos(videos.filter((v) => v._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{currentUser.name} Dashboard</h1>

      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h2>Upload Content</h2>
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <input type="text" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '8px' }} />

          {/* HYBRID THUMBNAIL INPUT */}
          <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: 'white' }}>
            <label style={{fontWeight:'bold'}}>Thumbnail (File OR URL):</label>
            <div style={{display:'flex', gap:'10px', marginTop:'5px'}}>
               <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files[0])} />
               <span style={{alignSelf:'center'}}>OR</span>
               <input type="text" placeholder="Paste Image URL..." value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} style={{flex:1, padding:'5px'}} />
            </div>
          </div>

          {/* HYBRID VIDEO INPUT */}
          <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: 'white' }}>
            <label style={{fontWeight:'bold'}}>Video (File OR URL):</label>
            <div style={{display:'flex', gap:'10px', marginTop:'5px'}}>
               <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
               <span style={{alignSelf:'center'}}>OR</span>
               <input type="text" placeholder="Paste YouTube URL..." value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} style={{flex:1, padding:'5px'}} />
            </div>
          </div>

          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '8px' }} />

          <button type="submit" style={{ padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>UPLOAD</button>
        </form>
      </div>

      <div>
        {videos.map((video) => (
          <div key={video._id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', border: '1px solid #ddd', padding: '10px' }}>
            <img src={video.thumbnailUrl} alt={video.title} style={{ width: '120px', height: '80px', objectFit: 'cover' }} onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} />
            <div style={{ flex: 1 }}>
              <h3>{video.title}</h3>
              <button onClick={() => handleDelete(video._id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;