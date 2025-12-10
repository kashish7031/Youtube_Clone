import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Accept toggleSidebar prop here
function Navbar({ toggleSidebar }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?query=${query}`);
    }
  };

  return (
    <nav className="w-full h-16 bg-black border-b border-gray-800 flex items-center justify-between px-4 sticky top-0 z-50">
      
      {/* 1. Logo & Sidebar Toggle */}
      <div className="flex items-center gap-4">
         {/* Toggle Button: Always visible now (removed md:hidden) */}
         <button 
            onClick={toggleSidebar} 
            className="text-white text-2xl focus:outline-none hover:bg-gray-800 p-2 rounded-full"
         >
            ☰
         </button>
         
         <Link to="/" className="text-xl font-bold flex items-center gap-1" onClick={() => setQuery("")}>
            <span className="text-red-600 text-3xl">▶</span> 
            <span className="text-white tracking-tighter hidden sm:inline">MyTube</span>
         </Link>
      </div>

      {/* 2. Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4 flex items-center group">
         <div className="flex w-full relative">
            <input 
              type="text" 
              placeholder="Search" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded-l-full focus:border-blue-500 outline-none transition-colors"
            />
            {query && (
                <button 
                    type="button" 
                    onClick={() => setQuery("")}
                    className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
            )}
            <button 
                type="submit" 
                className="bg-gray-800 border border-l-0 border-gray-700 px-6 py-2 rounded-r-full hover:bg-gray-700 transition"
            >
              🔍
            </button>
         </div>
      </form>

      {/* 3. Right Actions */}
      <div className="flex items-center gap-3 sm:gap-5">
         {isAuthenticated ? (
            <>
               <Link to="/upload" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-800 transition">
                  <span className="text-2xl">📹</span>
               </Link>

               <div className="relative">
                  <button onClick={() => setShowMenu(!showMenu)} className="focus:outline-none">
                    <img 
                        src={currentUser?.avatar || "https://via.placeholder.com/40"} 
                        alt="User" 
                        className="w-8 h-8 rounded-full border border-gray-700 object-cover" 
                    />
                  </button>
                  
                  {showMenu && (
                    <div className="absolute right-0 top-12 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-xl py-2 overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-gray-700">
                            <p className="text-sm text-white font-semibold truncate">{currentUser?.fullName}</p>
                            <p className="text-xs text-gray-400 truncate">@{currentUser?.username}</p>
                        </div>
                        <button 
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                        >
                            Sign out
                        </button>
                    </div>
                  )}
               </div>
            </>
         ) : (
            <Link to="/login" className="flex items-center gap-2 px-4 py-1.5 border border-gray-700 rounded-full text-blue-400 hover:bg-blue-500/10 font-medium text-sm transition">
               <span className="text-lg">👤</span> Sign in
            </Link>
         )}
      </div>
    </nav>
  );
}

export default Navbar;