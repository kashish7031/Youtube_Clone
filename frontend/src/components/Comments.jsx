import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comment';

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // --- EDIT STATE ---
  const [editingId, setEditingId] = useState(null);
  const [editDesc, setEditDesc] = useState("");

  const currentUser = { _id: "653c29926345678912345678", name: "My Channel" }; 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) { console.log(err); }
    };
    fetchComments();
  }, [videoId]);

  // --- ADD COMMENT ---
  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment) return;
    try {
      const res = await axios.post("http://localhost:5000/api/comments", {
        desc: newComment,
        videoId,
        userId: currentUser._id,
      });
      setComments([...comments, res.data]); 
      setNewComment(""); 
    } catch (err) { console.log(err); }
  };

  // --- DELETE COMMENT ---
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/comments/${id}`);
        setComments(comments.filter(c => c._id !== id));
    } catch (err) { console.log(err); }
  };

  // --- START EDITING ---
  const handleEditStart = (comment) => {
    setEditingId(comment._id);
    setEditDesc(comment.desc);
  };

  // --- SAVE EDIT ---
  const handleEditSave = async (id) => {
    try {
        const res = await axios.put(`http://localhost:5000/api/comments/${id}`, {
            desc: editDesc
        });
        // Update the list locally to reflect changes immediately
        setComments(comments.map(c => c._id === id ? res.data : c));
        setEditingId(null); // Exit edit mode
    } catch (err) { console.log(err); }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      {/* New Comment Input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="" />
        <input 
            style={{ border: 'none', borderBottom: '1px solid #ccc', width: '100%', padding: '10px', outline: 'none' }} 
            placeholder="Add a public comment..." 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
        />
        <button onClick={handleComment} style={{ padding: '8px 12px', backgroundColor: '#3ea6ff', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Comment</button>
      </div>

      {/* List of Comments */}
      {comments.map(comment => (
        <div key={comment._id} style={{position: 'relative', borderBottom:'1px solid #f0f0f0'}}>
            
            {/* CONDITIONAL: Are we editing this specific comment? */}
            {editingId === comment._id ? (
                // --- EDIT MODE ---
                <div style={{ padding: '20px 0', display:'flex', gap:'10px', width:'100%', alignItems: 'center' }}>
                    <input 
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button onClick={() => handleEditSave(comment._id)} style={{ backgroundColor: '#28a745', color: 'white', padding: '5px 10px', cursor: 'pointer', border: 'none', borderRadius: '3px' }}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#6c757d', color: 'white', padding: '5px 10px', cursor: 'pointer', border: 'none', borderRadius: '3px' }}>Cancel</button>
                </div>
            ) : (
                // --- VIEW MODE ---
                <>
                    <Comment comment={comment} />
                    {/* Action Buttons (Edit/Delete) */}
                    <div style={{ position: 'absolute', right: 0, top: '10px', display:'flex', gap:'10px' }}>
                        <button 
                            onClick={() => handleEditStart(comment)}
                            style={{ color: '#065fd4', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => handleDelete(comment._id)}
                            style={{ color: '#ff0000', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
      ))}
    </div>
  );
};

export default Comments;