import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [uploadType, setUploadType] = useState("file"); // Default to 'file'
  
  // Data States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Music");
  
  // File Inputs
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  
  // URL Inputs
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = ["Music", "Gaming", "News", "Sports", "Learning", "Comedy", "Shorts"];

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    // LOGIC: If 'file' mode is selected, only send files. If 'url' mode, send URLs.
    if (uploadType === "file") {
        if (!videoFile || !thumbnailFile) {
            setLoading(false);
            return alert("Please select a video file AND a thumbnail file.");
        }
        formData.append("videoFile", videoFile);
        formData.append("thumbnail", thumbnailFile);
    } else {
        if (!videoUrl || !thumbnailUrl) {
            setLoading(false);
            return alert("Please enter a video URL AND a thumbnail URL.");
        }
        formData.append("videoUrl", videoUrl);
        formData.append("thumbnailUrl", thumbnailUrl);
    }

    try {
      await axios.post("http://localhost:5000/api/v1/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true 
      });
      alert("Video Published Successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Upload failed. " + (error.response?.data?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white p-8 flex justify-center pb-20 overflow-y-auto">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-xl border border-gray-800 h-fit">
        <h1 className="text-2xl font-bold mb-6">Create Video</h1>
        
        {/* Toggle Switch */}
        <div className="flex gap-4 mb-6 p-1 bg-gray-800 rounded-lg">
            <button 
                type="button"
                onClick={() => setUploadType("file")}
                className={`flex-1 py-2 rounded-md font-medium transition ${uploadType === "file" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
            >
                Upload File
            </button>
            <button 
                 type="button"
                 onClick={() => setUploadType("url")}
                 className={`flex-1 py-2 rounded-md font-medium transition ${uploadType === "url" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
            >
                Paste URL
            </button>
        </div>

        <form onSubmit={handlePublish} className="space-y-6">
          
          {/* OPTION 1: File Upload */}
          {uploadType === "file" && (
             <div className="space-y-4">
                 <div className="border-2 border-dashed border-gray-700 p-4 rounded-xl text-center">
                    <p className="mb-2 text-sm text-gray-400">Video File (.mp4)</p>
                    <input 
                        type="file" 
                        accept="video/*" 
                        onChange={(e) => setVideoFile(e.target.files[0])} 
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white" 
                    />
                 </div>
                 <div className="border-2 border-dashed border-gray-700 p-4 rounded-xl text-center">
                    <p className="mb-2 text-sm text-gray-400">Thumbnail Image (.jpg, .png)</p>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setThumbnailFile(e.target.files[0])} 
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white" 
                    />
                 </div>
             </div>
          )}

          {/* OPTION 2: URL Input */}
          {uploadType === "url" && (
             <div className="space-y-4">
                <div>
                    <label className="block mb-1 text-sm text-gray-400">Video URL</label>
                    <input 
                        type="url" 
                        value={videoUrl} 
                        onChange={(e) => setVideoUrl(e.target.value)} 
                        className="w-full bg-black border border-gray-700 rounded p-3 focus:border-blue-500 text-white" 
                        placeholder="https://..." 
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm text-gray-400">Thumbnail URL</label>
                    <input 
                        type="url" 
                        value={thumbnailUrl} 
                        onChange={(e) => setThumbnailUrl(e.target.value)} 
                        className="w-full bg-black border border-gray-700 rounded p-3 focus:border-blue-500 text-white" 
                        placeholder="https://..." 
                    />
                </div>
             </div>
          )}

          {/* Common Fields */}
          <div>
             <label className="block mb-1 text-sm text-gray-400">Title</label>
             <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full bg-black border border-gray-700 rounded p-3 focus:border-blue-500 text-white" 
                required
            />
          </div>

          <div>
             <label className="block mb-1 text-sm text-gray-400">Description</label>
             <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows="3"
                className="w-full bg-black border border-gray-700 rounded p-3 focus:border-blue-500 text-white" 
                required
            />
          </div>

          <div>
             <label className="block mb-1 text-sm text-gray-400">Category</label>
             <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded p-3 focus:border-blue-500 text-white"
            >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
             </select>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-green-600 hover:bg-green-500 py-3 rounded font-bold transition text-white"
          >
            {loading ? "Publishing..." : "Publish Video"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;