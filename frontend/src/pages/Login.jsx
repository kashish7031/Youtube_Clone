import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      
      // Save user details to LocalStorage so Navbar knows we are logged in
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("access_token", res.data.token);
      
      alert("Login Success!");
      navigate("/"); // Go to Home Page
      window.location.reload(); // Refresh to update Navbar
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Login Failed!");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'white', padding: '50px', border: '1px solid #ccc', borderRadius: '10px' }}>
        
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px', width: '250px' }}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px', width: '250px' }}
        />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#3ea6ff', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Sign In
        </button>
      </form>
      
      <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
    </div>
  );
};

export default Login;