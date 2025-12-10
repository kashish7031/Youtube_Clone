import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function VideoPage() {
  const { videoId } = useParams();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Video Data
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Interaction States
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Edit Video State (Title/Desc)
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Comments State
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // --- EDIT COMMENT STATE (RESTORED) ---
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Video
        const vRes = await axios.get(`http://localhost:5000/api/v1/videos/${videoId}`, { withCredentials: true });
        const data = vRes.data.data;
        setVideo(data);
        setIsLiked(data.isLiked);
        setLikesCount(data.likesCount);
        setIsSubscribed(data.isSubscribed);
        
        // Initialize Edit Video Form
        setEditTitle(data.title);
        setEditDesc(data.description);

        // Fetch Comments
        const cRes = await axios.get(`http://localhost:5000/api/v1/comments/${videoId}`);
        setComments(cRes.data.data.docs || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (videoId) fetchData();
  }, [videoId, isAuthenticated]);

  // --- VIDEO ACTIONS ---
  const handleUpdateVideo = async () => {
    try {
        await axios.patch(`http://localhost:5000/api/v1/videos/${videoId}`, 
            { title: editTitle, description: editDesc },
            { withCredentials: true }
        );
        setVideo({ ...video, title: editTitle, description: editDesc });
        setIsEditingVideo(false);
        alert("Video updated!");
    } catch (err) {
        alert("Failed to update video");
    }
  };

  const handleDeleteVideo = async () => {
      if(!window.confirm("Delete this video permanently?")) return;
      try {
          await axios.delete(`http://localhost:5000/api/v1/videos/${videoId}`, { withCredentials: true });
          navigate("/");
      } catch (err) {
          alert("Delete failed");
      }
  };

  const handleLike = async () => {
    if (!isAuthenticated) return alert("Please Login");
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    try {
        await axios.post(`http://localhost:5000/api/v1/likes/toggle/v/${videoId}`, {}, { withCredentials: true });
    } catch (e) { setIsLiked(!isLiked); setLikesCount(prev => isLiked ? prev + 1 : prev - 1); }
  };

  const handleDislike = async () => {
      if (!isAuthenticated) return alert("Please Login");
      if (isLiked) {
          setIsLiked(false);
          setLikesCount(prev => prev - 1);
      }
      try {
          await axios.post(`http://localhost:5000/api/v1/likes/toggle/d/${videoId}`, {}, { withCredentials: true });
      } catch (e) { console.error(e); }
  };

  const handleSubscribe = async () => {
      if (!isAuthenticated) return alert("Please Login");
      setIsSubscribed(!isSubscribed);
      try {
          await axios.post(`http://localhost:5000/api/v1/subscriptions/c/${video.owner._id}`, {}, { withCredentials: true });
      } catch (e) { setIsSubscribed(!isSubscribed); }
  };

  // --- COMMENT ACTIONS ---
  const handleAddComment = async (e) => {
      e.preventDefault();
      if(!newComment.trim()) return;
      try {
          const res = await axios.post(`http://localhost:5000/api/v1/comments/${videoId}`, { content: newComment }, { withCredentials: true });
          setComments([res.data.data, ...comments]);
          setNewComment("");
      } catch(e) { alert("Failed to post comment"); }
  };

  const handleDeleteComment = async (commentId) => {
      if(!window.confirm("Delete comment?")) return;
      try {
          await axios.delete(`http://localhost:5000/api/v1/comments/c/${commentId}`, { withCredentials: true });
          setComments(comments.filter(c => c._id !== commentId));
      } catch(e) { alert("Delete failed"); }
  };

  // --- COMMENT EDITING LOGIC (RESTORED) ---
  const handleEditStart = (comment) => {
      setEditingCommentId(comment._id);
      setEditContent(comment.content);
  };

  const handleEditSave = async (commentId) => {
      if (!editContent.trim()) return;
      try {
          await axios.patch(`http://localhost:5000/api/v1/comments/c/${commentId}`, 
            { content: editContent }, 
            { withCredentials: true }
          );
          
          // Update UI locally
          setComments(comments.map(c => 
            c._id === commentId ? { ...c, content: editContent } : c
          ));
          setEditingCommentId(null);
      } catch (error) {
          console.error(error);
          alert("Failed to update comment");
      }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!video) return <div className="text-white text-center mt-20">Video not found</div>;

  const isOwner = currentUser?._id === video.owner?._id;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 pt-6 text-white w-full max-w-7xl mx-auto h-full overflow-y-auto custom-scrollbar">
      
      <div className="w-full lg:w-3/4">
        {/* PLAYER */}
        <div className="w-full bg-black rounded-xl overflow-hidden shadow-2xl aspect-video border border-gray-800">
          <video 
            src={video.videoFile} 
            poster={video.thumbnail} 
            controls 
            autoPlay 
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* INFO SECTION */}
        <div className="mt-4 pb-4 border-b border-gray-800">
            {isEditingVideo ? (
                <div className="mb-4 space-y-2">
                    <input className="w-full bg-gray-800 p-2 rounded text-white" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                    <textarea className="w-full bg-gray-800 p-2 rounded text-white" rows="3" value={editDesc} onChange={e => setEditDesc(e.target.value)} />
                    <div className="flex gap-2">
                        <button onClick={handleUpdateVideo} className="bg-green-600 px-3 py-1 rounded">Save</button>
                        <button onClick={() => setIsEditingVideo(false)} className="bg-gray-600 px-3 py-1 rounded">Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between items-start">
                    <h1 className="text-xl font-bold">{video.title}</h1>
                    {isOwner && (
                        <div className="flex gap-2">
                            <button onClick={() => setIsEditingVideo(true)} className="bg-blue-600 text-sm px-3 py-1 rounded">Edit</button>
                            <button onClick={handleDeleteVideo} className="bg-red-600 text-sm px-3 py-1 rounded">Delete</button>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-4">
                    <img src={video.owner?.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                    <div>
                        <h3 className="font-bold">{video.owner?.username}</h3>
                        <p className="text-xs text-gray-400">{video.owner?.subscribersCount || 0} subscribers</p>
                    </div>
                    {!isOwner && (
                        <button onClick={handleSubscribe} className={`px-4 py-2 rounded-full font-bold ${isSubscribed ? "bg-gray-700" : "bg-white text-black"}`}>
                            {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    )}
                </div>

                <div className="flex items-center bg-gray-800 rounded-full">
                    <button onClick={handleLike} className={`px-4 py-2 border-r border-gray-600 flex gap-2 hover:bg-gray-700 ${isLiked ? "text-blue-400" : ""}`}>
                        👍 {likesCount}
                    </button>
                    <button onClick={handleDislike} className="px-4 py-2 hover:bg-gray-700">👎</button>
                </div>
            </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-gray-800/40 p-3 rounded-xl mt-4 text-sm">
             <div className="font-bold mb-2">{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</div>
             {!isEditingVideo && <p className="whitespace-pre-wrap">{video.description}</p>}
        </div>

        {/* COMMENTS */}
        <div className="mt-6">
            <h3 className="font-bold mb-4">{comments.length} Comments</h3>
            {isAuthenticated && (
                <form onSubmit={handleAddComment} className="flex gap-4 mb-6">
                    <img src={currentUser?.avatar} className="w-8 h-8 rounded-full" alt="" />
                    <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Add a comment..." className="w-full bg-transparent border-b border-gray-700 text-white pb-1 outline-none" />
                    <button type="submit" disabled={!newComment} className="text-blue-500 font-bold disabled:text-gray-500">Post</button>
                </form>
            )}
            
            <div className="space-y-4">
                {comments.map(c => (
                    <div key={c._id} className="flex gap-3">
                        <img src={c.owner?.avatar} className="w-8 h-8 rounded-full" alt="" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <span className="font-bold text-sm">@{c.owner?.username}</span>
                                    <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</span>
                                </div>
                                
                                {/* Edit/Delete Buttons for Comment Owner */}
                                {currentUser?._id === c.owner?._id && !editingCommentId && (
                                    <div className="text-xs text-gray-400 flex gap-2">
                                        <button onClick={() => handleEditStart(c)} className="hover:text-white">Edit</button>
                                        <button onClick={() => handleDeleteComment(c._id)} className="hover:text-red-500">Delete</button>
                                    </div>
                                )}
                            </div>

                            {/* CONDITIONAL RENDERING: Edit Input VS Text */}
                            {editingCommentId === c._id ? (
                                <div className="mt-2">
                                    <input 
                                        value={editContent} 
                                        onChange={(e) => setEditContent(e.target.value)} 
                                        className="w-full bg-gray-800 text-white p-2 rounded text-sm border border-gray-600 focus:border-blue-500 outline-none" 
                                    />
                                    <div className="mt-2 flex gap-2">
                                        <button onClick={() => handleEditSave(c._id)} className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-500">Save</button>
                                        <button onClick={() => setEditingCommentId(null)} className="bg-gray-700 text-white text-xs px-3 py-1 rounded hover:bg-gray-600">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-300 mt-1">{c.content}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;