import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null, // New field for file
    coverImage: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // MUST use FormData for file uploads
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.avatar) data.append("avatar", formData.avatar);
    if (formData.coverImage) data.append("coverImage", formData.coverImage);

    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="text-red-500 bg-red-900/20 p-3 rounded mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full bg-black border border-gray-700 p-3 rounded text-white" 
            onChange={(e) => setFormData({...formData, fullName: e.target.value})} required />
            
          <input type="text" placeholder="Username" className="w-full bg-black border border-gray-700 p-3 rounded text-white" 
            onChange={(e) => setFormData({...formData, username: e.target.value})} required />
            
          <input type="email" placeholder="Email" className="w-full bg-black border border-gray-700 p-3 rounded text-white" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            
          <input type="password" placeholder="Password" className="w-full bg-black border border-gray-700 p-3 rounded text-white" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            
          {/* Avatar Upload */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Avatar (Required)</label>
            <input type="file" name="avatar" onChange={handleFileChange} accept="image/*" className="w-full bg-black text-sm text-gray-400 border border-gray-700 rounded" required />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition">
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">Already have an account? <Link to="/login" className="text-blue-400">Sign in</Link></p>
      </div>
    </div>
  );
}

export default Register;