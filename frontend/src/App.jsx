import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Sidebar from './components/Sidebar'; // <--- Import Sidebar
import Home from './pages/Home';         
import VideoPage from './pages/VideoPage'; 
import Login from './pages/Login';       
import Register from './pages/Register'; 
import Channel from './pages/Channel';   

function App() {
  // State to toggle sidebar
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <BrowserRouter>
      {/* Pass state control to Navbar */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> 
      
      {/* Create a Flex container to hold Sidebar + Pages */}
      <div style={{ display: 'flex' }}>
        
        {/* Sidebar on the left */}
        <Sidebar menuOpen={menuOpen} />
        
        {/* Main Content on the right */}
        <div style={{ flex: 7, padding: '20px' }}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/channel" element={<Channel />} />
            </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;