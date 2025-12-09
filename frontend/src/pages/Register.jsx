import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Ensure your backend is running on port 5000
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      alert("Registration Successful! Please Login.");
      navigate('/login'); // Redirect to Login page
    } catch (err) {
      console.error(err);
      alert("Registration Failed. Try a different email.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Channel</h2>
        <p>Join the YouTube community</p>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <p className="switch-auth">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;