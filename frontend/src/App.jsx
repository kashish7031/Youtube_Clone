import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";

// Layout handles the Sidebar State
const Layout = () => {
  // Logic: Default to OPEN on large screens (>=768px), CLOSED on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      
      {/* 1. Desktop Sidebar (Collapsible) */}
      <div 
        className={`hidden md:flex flex-shrink-0 z-40 border-r border-gray-800 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-0 border-none"
        }`}
      >
        <div className="w-64 overflow-hidden">
            <Sidebar />
        </div>
      </div>

      {/* 2. Mobile Sidebar Overlay (Only on small screens) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setIsSidebarOpen(false)}
            ></div>
            
            {/* Sidebar Content */}
            <div className="relative w-64 h-full bg-black border-r border-gray-800 shadow-2xl animate-slide-in">
                <Sidebar />
            </div>
        </div>
      )}
      
      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-black p-4 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="video/:videoId" element={<VideoPage />} />
            <Route path="upload" element={<Upload />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;