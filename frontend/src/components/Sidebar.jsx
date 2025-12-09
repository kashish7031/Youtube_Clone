import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ menuOpen }) => {
  // If menuOpen is false, we return null (hide sidebar) 
  // OR we can return a "mini" version. For simplicity, we hide it on mobile logic.
  if (!menuOpen) return null;

  return (
    <div style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        height: '100vh', 
        position: 'sticky', 
        top: '60px', // Below Navbar
        padding: '10px 20px', 
        borderRight: '1px solid #ccc',
        minWidth: '200px',
        display: window.innerWidth < 768 ? 'none' : 'block' // Simple responsiveness check
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Section 1 */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', padding: '10px', borderRadius: '10px', textDecoration: 'none', color: 'black' }}>
           <span>🏠</span> 
           <span style={{ fontWeight: 'bold' }}>Home</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', padding: '10px' }}>
           <span>🎬</span> <span>Shorts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', padding: '10px' }}>
           <span>📺</span> <span>Subscriptions</span>
        </div>

        <hr style={{ border: '0.5px solid #e5e5e5', width: '100%' }} />

        {/* Section 2 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', padding: '10px' }}>
           <span>📚</span> <span>Library</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer', padding: '10px' }}>
           <span>History</span> <span>History</span>
        </div>
        
        <hr style={{ border: '0.5px solid #e5e5e5', width: '100%' }} />

        <div style={{ fontSize: '12px', color: '#555', marginTop: '10px' }}>
            <p>Sign in to like videos, comment, and subscribe.</p>
            <Link to="/login">
                <button style={{ padding: '5px 15px', color: '#065fd4', border: '1px solid #ccc', borderRadius: '18px', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                    Sign in
                </button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;