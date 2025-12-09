import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comment';

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Hardcoded current user for now (Matches your Channel Page logic)
  const currentUser = { _id: "653c29926345678912345678", name: "My Channel" }; 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [videoId]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      const res = await axios.post("http://localhost:5000/api/comments", {
        desc: newComment,
        videoId,
        userId: currentUser._id,
      });
      // Add new comment to the list immediately
      setComments([...comments, res.data]);
      setNewComment(""); // Clear input
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      
      {/* Input Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        <input 
          style={{ border: 'none', borderBottom: '1px solid #ccc', width: '100%', padding: '10px', outline: 'none' }}
          placeholder="Add a comment..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleComment} style={{ padding: '10px 15px', backgroundColor: '#cc0000', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}>
            Comment
        </button>
      </div>

      {/* List of Comments */}
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;