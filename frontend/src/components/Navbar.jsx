import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

const Navbar = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  
  // CHECK IF USER IS LOGGED IN
  const user = localStorage.getItem("user");

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/?q=${q}`);
      window.location.reload();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    localStorage.removeItem("access_token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #ccc', alignItems: 'center', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 100 }}>
      
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="logo" height="30" />
        <span>YouTube</span>
      </Link>

      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '20px', padding: '5px 15px', width: '40%' }}>
         <input 
           type="text" 
           placeholder="Search" 
           onChange={(e) => setQ(e.target.value)}
           onKeyDown={handleSearch}
           style={{ border: 'none', outline: 'none', width: '100%' }}
         />
      </div>

      {/* Right Side Buttons */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
         
         {/* SHOW THESE ONLY IF LOGGED IN */}
         {user ? (
           <>
             <Link to="/channel">
               <button style={{ cursor: 'pointer', padding: '8px 15px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '2px' }}>
                 My Channel
               </button>
             </Link>

             <button 
               onClick={handleLogout}
               style={{ cursor: 'pointer', padding: '8px 15px', backgroundColor: 'transparent', border: '1px solid #ccc' }}
             >
                Logout
             </button>
             
             <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#cc0000', color: 'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold' }}>
                U
             </div>
           </>
         ) : (
           /* SHOW THIS IF LOGGED OUT */
           <Link to="/login">
             <button style={{ padding: '8px 15px', color: '#065fd4', border: '1px solid #ccc', borderRadius: '2px', background: 'white', cursor: 'pointer' }}>
               Sign In
             </button>
           </Link>
         )}

      </div>
    </nav>
  );
};

export default Navbar;