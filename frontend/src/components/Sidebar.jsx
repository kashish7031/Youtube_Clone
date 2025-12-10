import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Sidebar() {
  const { isAuthenticated, currentUser } = useAuth();
  const [subscribedChannels, setSubscribedChannels] = useState([]);

  useEffect(() => {
    // Only fetch subscriptions if user is logged in
    if (isAuthenticated && currentUser?._id) {
      const fetchSubscriptions = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/v1/subscriptions/u/${currentUser._id}`,
            { withCredentials: true }
          );
          // Safety: Ensure we always work with an array
          setSubscribedChannels(res.data.data || []);
        } catch (error) {
          console.error("Error fetching subscriptions:", error);
          // On error, just set empty array so sidebar doesn't crash
          setSubscribedChannels([]);
        }
      };
      fetchSubscriptions();
    } else {
      setSubscribedChannels([]);
    }
  }, [isAuthenticated, currentUser]);

  const mainLinks = [
    { icon: "🏠", name: "Home", path: "/" },
    { icon: "👍", name: "Liked Videos", path: "/liked-videos" }, // You can create this route later
    { icon: "📜", name: "History", path: "/history" },       // You can create this route later
  ];

  return (
    <div className="h-full w-full bg-black text-white flex flex-col border-r border-gray-800 overflow-y-auto custom-scrollbar pb-4">
      
      {/* 1. Main Navigation */}
      <div className="flex flex-col p-2 space-y-1">
        {mainLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition ${
                isActive ? "bg-gray-800 font-medium" : "text-gray-300"
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-sm">{link.name}</span>
          </NavLink>
        ))}
      </div>

      <hr className="border-gray-800 my-2 mx-4" />

      {/* 2. Subscriptions Section (Only if logged in) */}
      {isAuthenticated && (
        <div className="flex flex-col p-2">
          <h3 className="px-4 py-2 text-md font-semibold text-white">
            Subscriptions
          </h3>

          {subscribedChannels.length > 0 ? (
            subscribedChannels.map((sub) => {
              // SAFETY CHECK: If 'channel' is null/undefined, skip it to prevent crash
              if (!sub?.channel) return null;

              return (
                <Link
                  key={sub.channel._id}
                  to={`/c/${sub.channel._id}`} // Link to channel profile
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  <img
                    src={sub.channel.avatar || "https://via.placeholder.com/40"}
                    alt={sub.channel.username}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-300 truncate">
                    {sub.channel.username}
                  </span>
                </Link>
              );
            })
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No subscriptions yet
            </div>
          )}
        </div>
      )}

      {/* 3. Settings / Bottom Links (Optional) */}
      <div className="mt-auto p-2">
        <NavLink
          to="/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300"
        >
          <span className="text-xl">⚙️</span>
          <span className="text-sm">Settings</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;