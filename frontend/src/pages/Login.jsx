import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Ensure the URL matches your backend port (usually 5000)
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Save data
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert("Login Successful!");
      
      // Redirect to Home
      window.location.href = "/"; 
    } catch (err) {
      console.error(err);
      // SHOW THE REAL ERROR MESSAGE
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // Will say "User email not found" or "Wrong Password"
      } else {
        alert("Login failed. Check console for details.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        <p>Continue to YouTube</p>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Sign In</button>
        </form>
        <p className="switch-auth">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;