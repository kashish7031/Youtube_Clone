import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Sidebar from './components/Sidebar'; 
import Footer from './components/Footer'; // <--- IMPORT THIS
import Home from './pages/Home';         
import VideoPage from './pages/VideoPage'; 
import Login from './pages/Login';       
import Register from './pages/Register'; 
import Channel from './pages/Channel';   

function App() {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <BrowserRouter>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> 
      
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar menuOpen={menuOpen} />
        
        {/* Make content area a flex column so footer sits at bottom */}
        <div style={{ flex: 7, display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
            <div style={{ padding: '20px', flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/video/:id" element={<VideoPage />} />
                    <Route path="/channel" element={<Channel />} />
                </Routes>
            </div>
            
            {/* ADD FOOTER HERE */}
            <Footer />
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;