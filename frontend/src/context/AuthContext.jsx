import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Configure Axios default base URL if not already set globally
  // axios.defaults.baseURL = "http://localhost:5000/api/v1"; 
  axios.defaults.withCredentials = true; // IMPORTANT: Allows cookies to be sent/received

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      // We assume there's an endpoint /auth/current-user in your backend
      // If not, we rely on the login response storing data in localStorage as a fallback
      // For a proper JWT cookie setup, we should ping the backend:
      const response = await axios.get("http://localhost:5000/api/v1/auth/current-user");
      if (response.data?.data) {
        setCurrentUser(response.data.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Not authenticated", error);
      setIsAuthenticated(false);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    // Optional: Save basic info to local storage if you want purely client-side persistence
    // localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
        await axios.post("http://localhost:5000/api/v1/auth/logout");
        setCurrentUser(null);
        setIsAuthenticated(false);
    } catch (error) {
        console.error("Logout failed", error);
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};