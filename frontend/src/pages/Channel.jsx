import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Channel = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  
  // --- UPLOAD STATE ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState("Music");
  const [thumbnailUrl, setThumbnailUrl] = useState(''); 
  const [videoUrl, setVideoUrl] = useState('');         
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // --- EDIT STATE (NEW) ---
  const [editingId, setEditingId] = useState(null); // ID of video being edited
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // AUTH CHECK
  useEffect(() => {
    const user = localStorage.getItem("user"); 
    if (!user) { navigate('/login'); }
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

  // --- HANDLE UPLOAD ---
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description); // Backend might expect 'desc' or 'description'
    formData.append("desc", description);        // Sending both to be safe
    formData.append("tags", category);
    formData.append("uploader", currentUser._id);
    formData.append("channelId", "channel01");
    
    formData.append("thumbnailUrl", thumbnailUrl);
    formData.append("videoUrl", videoUrl);
    
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

  // --- HANDLE DELETE ---
  const handleDelete = async (id) => {
    if(!window.confirm("Delete this video?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos(videos.filter((v) => v._id !== id));
    } catch (err) { console.error(err); }
  };

  // --- HANDLE EDIT (START) ---
  const startEditing = (video) => {
    setEditingId(video._id);
    setEditTitle(video.title);
    setEditDesc(video.desc || video.description || ""); // Handle both field names
  };

  // --- HANDLE EDIT (SAVE) ---
  const saveEdit = async (id) => {
    try {
      // API Call to Update
      await axios.put(`http://localhost:5000/api/videos/${id}`, {
        title: editTitle,
        desc: editDesc,
        description: editDesc
      });

      // Update UI locally without reload
      setVideos(videos.map(v => 
        v._id === id ? { ...v, title: editTitle, desc: editDesc, description: editDesc } : v
      ));
      
      setEditingId(null); // Exit edit mode
      alert("Video Updated!");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{currentUser.name} Dashboard</h1>

      {/* Upload Form */}
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h2>Upload Content</h2>
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <input type="text" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '8px' }} />

          <div style={{ display:'flex', flexDirection:'column' }}>
            <label style={{fontWeight:'bold'}}>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px' }}>
                <option value="Music">Music</option>
                <option value="Gaming">Gaming</option>
                <option value="Tech">Tech</option>
                <option value="Movies">Movies</option>
                <option value="Education">Education</option>
            </select>
          </div>

          {/* Hybrid Inputs */}
          <div style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: 'white' }}>
            <label style={{fontWeight:'bold'}}>Thumbnail (File OR URL):</label>
            <div style={{display:'flex', gap:'10px', marginTop:'5px'}}>
               <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files[0])} />
               <span style={{alignSelf:'center'}}>OR</span>
               <input type="text" placeholder="Paste Image URL..." value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} style={{flex:1, padding:'5px'}} />
            </div>
          </div>

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

      {/* Video List with Edit Functionality */}
      <div>
        <h2>My Videos ({videos.length})</h2>
        {videos.map((video) => (
          <div key={video._id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', border: '1px solid #ddd', padding: '10px', backgroundColor: 'white' }}>
            
            <img src={video.thumbnailUrl} alt={video.title} style={{ width: '120px', height: '80px', objectFit: 'cover' }} onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} />
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              
              {/* CONDITIONAL RENDERING: Display Mode vs Edit Mode */}
              {editingId === video._id ? (
                // --- EDIT MODE ---
                <>
                    <input 
                        type="text" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)} 
                        style={{ padding: '5px', fontSize: '16px', fontWeight: 'bold' }}
                    />
                    <textarea 
                        value={editDesc} 
                        onChange={(e) => setEditDesc(e.target.value)} 
                        style={{ padding: '5px' }}
                    />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                        <button onClick={() => saveEdit(video._id)} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', cursor:'pointer' }}>
                            Save
                        </button>
                        <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', cursor:'pointer' }}>
                            Cancel
                        </button>
                    </div>
                </>
              ) : (
                // --- DISPLAY MODE ---
                <>
                    <h3 style={{ margin: 0 }}>{video.title}</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>
                        {video.desc || video.description}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                        <button onClick={() => startEditing(video)} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(video._id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                            Delete
                        </button>
                    </div>
                </>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;