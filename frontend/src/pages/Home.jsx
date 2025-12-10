import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All"); // Default category
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query"); // Read search from URL

  // The Categories List
  const categories = [
    "All", 
    "Music", 
    "Gaming", 
    "News", 
    "Sports", 
    "Learning", 
    "Fashion", 
    "Comedy", 
    "Shorts"
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        // Build the API URL dynamically
        let url = "http://localhost:5000/api/v1/videos?";
        
        // 1. Add Category Filter (if not 'All')
        if (filterType !== "All") {
             url += `category=${filterType}&`; 
        }
        
        // 2. Add Search Query (if typed in Navbar)
        if (searchQuery) {
            url += `query=${searchQuery}&`;
        }
        
        const response = await axios.get(url);
        
        // Handle response data structure (sometimes nested in docs)
        const data = response.data.data.docs || response.data.data;
        setVideos(data);

      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [filterType, searchQuery]); // Re-run whenever Filter or Search changes

  return (
    <div className="text-white w-full h-full">
      
      {/* 1. Scrollable Tags Header */}
      <div className="sticky top-0 bg-black z-30 pb-4 pt-2 px-2 border-b border-gray-800/50">
        <div className="flex gap-3 overflow-x-auto no-scrollbar w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterType(category)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border border-transparent ${
                filterType === category
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Video Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        
        {loading ? (
           // Loading State (Pulse Effect)
           <div className="col-span-full flex justify-center mt-20">
               <div className="animate-pulse flex flex-col items-center">
                   <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
                   <p className="text-gray-500 text-sm">Loading videos...</p>
               </div>
           </div>
        ) : videos.length > 0 ? (
          // Video Cards
          videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          // Empty State
          <div className="col-span-full text-center text-gray-500 mt-20">
            <h2 className="text-xl font-bold text-gray-400 mb-2">No videos found</h2>
            <p className="text-sm">Try searching for something else or changing the category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;