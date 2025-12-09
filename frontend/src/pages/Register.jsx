import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username, 
        email,
        password,
      });
      
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      // Now we just show the response data directly because it's a string
      alert(err.response?.data || "Registration Failed");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
      <h1>Create Account</h1>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'white', padding: '40px', border: '1px solid #ccc', borderRadius: '8px' }}>
        
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={{ padding: '10px', width: '250px' }}
        />
        
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
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#cc0000', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Sign Up
        </button>
      </form>
      
      <p>Already have an account? <Link to="/login">Sign In</Link></p>
    </div>
  );
};

export default Register;