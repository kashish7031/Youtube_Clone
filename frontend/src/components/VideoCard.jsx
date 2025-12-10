import React from "react";
import { Link } from "react-router-dom";

// Helper to format duration (e.g., 125s -> 2:05)
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Helper for "time ago" (e.g., 2 days ago)
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return `${Math.floor(diffInSeconds / 2592000)} months ago`;
};

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`} className="block group">
      <div className="flex flex-col gap-2 cursor-pointer">
        {/* Thumbnail Container */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-800">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {/* Duration Badge */}
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
            {formatDuration(video.duration)}
          </span>
        </div>

        {/* Video Info */}
        <div className="flex gap-3 mt-1">
          {/* Channel Avatar */}
          <img
            src={video.ownerDetails?.avatar || video.owner?.avatar || "https://via.placeholder.com/40"}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover mt-1"
          />
          
          <div className="flex flex-col">
            {/* Title */}
            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
              {video.title}
            </h3>
            
            {/* Channel Name */}
            <p className="text-gray-400 text-xs mt-1 hover:text-white transition-colors">
              {video.ownerDetails?.username || video.owner?.username}
            </p>
            
            {/* Views & Time */}
            <p className="text-gray-400 text-xs">
              {video.views} views • {formatTimeAgo(video.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;