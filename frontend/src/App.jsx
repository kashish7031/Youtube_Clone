import React from 'react';
// ▼▼▼ THIS LINE WAS MISSING OR INCOMPLETE ▼▼▼
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

import Navbar from './components/Navbar'; 
import Home from './pages/Home';         
import VideoPage from './pages/VideoPage'; 
import Login from './pages/Login';       
import Register from './pages/Register'; 
import Channel from './pages/Channel';   

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/channel" element={<Channel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;