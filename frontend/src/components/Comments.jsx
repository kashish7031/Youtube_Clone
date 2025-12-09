import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
      setComments(res.data.reverse()); // Newest first
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async () => {
    if (!user) return alert("Please login to comment!");
    if (!newComment.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/comments", {
        videoId,
        userId: user._id, 
        desc: newComment,
      });
      setNewComment("");
      fetchComments(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="comments-container">
      <h3>{comments.length} Comments</h3>
      
      <div className="new-comment">
        {user ? (
          <div className="comment-input-wrapper">
             <div className="avatar small">{user.username ? user.username[0].toUpperCase() : "U"}</div>
             <input 
               type="text" 
               placeholder="Add a comment..." 
               value={newComment}
               onChange={(e) => setNewComment(e.target.value)}
             />
             <button onClick={handleComment}>Comment</button>
          </div>
        ) : (
          <p>Please <a href="/login">login</a> to comment.</p>
        )}
      </div>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="avatar small">
              {comment.userId?.username?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="comment-details">
              <span className="username">
                {comment.userId?.username || "Unknown User"} 
                <span className="date"> • {new Date(comment.createdAt).toLocaleDateString()}</span>
              </span>
              <p>{comment.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;