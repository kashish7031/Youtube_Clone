import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comment';

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment) return;
    try {
      const res = await axios.post("http://localhost:5000/api/comments", {
        desc: newComment, videoId, userId: currentUser._id,
      });
      setComments([...comments, res.data]);
      setNewComment(""); 
    } catch (err) { console.log(err); }
  };

  // --- NEW DELETE FUNCTION ---
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/comments/${id}`);
        setComments(comments.filter(c => c._id !== id));
    } catch (err) { console.log(err); }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        <input style={{ border: 'none', borderBottom: '1px solid #ccc', width: '100%', padding: '10px', outline: 'none' }} placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button onClick={handleComment} style={{ padding: '10px 15px', backgroundColor: '#cc0000', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}>Comment</button>
      </div>

      {comments.map(comment => (
        <div key={comment._id} style={{position: 'relative'}}>
            <Comment comment={comment} />
            {/* Simple Delete Button */}
            <button 
                onClick={() => handleDelete(comment._id)}
                style={{ position: 'absolute', right: 0, top: '30px', color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}
            >
                Delete
            </button>
        </div>
      ))}
    </div>
  );
};

export default Comments;