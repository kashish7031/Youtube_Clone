import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Sidebar from './components/Sidebar'; // Ensure this path is correct
import Home from './pages/Home';         
import VideoPage from './pages/VideoPage'; 
import Login from './pages/Login';       
import Register from './pages/Register'; 
import Channel from './pages/Channel';   

function App() {
  // STATE: Controls if sidebar is visible (true) or hidden (false)
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <BrowserRouter>
      {/* 1. Navbar gets the state setter to toggle the menu */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> 
      
      {/* Main Layout Container */}
      <div style={{ display: 'flex' }}>
        
        {/* 2. Sidebar gets the state to decide if it shows up */}
        <Sidebar menuOpen={menuOpen} />
        
        {/* 3. Main Content Area */}
        <div style={{ flex: 7, padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
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