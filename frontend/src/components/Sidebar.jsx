import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ menuOpen }) => {
  // If the menu is closed, we hide the sidebar completely
  if (!menuOpen) return null;

  return (
    <div style={{ 
        flex: 1, 
        backgroundColor: 'white', 
        height: '100vh', 
        position: 'sticky', 
        top: '60px', // Sticks below the Navbar
        padding: '10px 20px', 
        borderRight: '1px solid #e5e5e5',
        minWidth: '200px',
        maxWidth: '220px',
        overflowY: 'auto' // Allows scrolling inside sidebar if content is long
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* Main Section */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px', textDecoration: 'none', color: 'black', borderRadius: '10px' }}>
           <span>🏠</span> <span style={{ fontWeight: 'bold' }}>Home</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px', cursor: 'pointer', borderRadius: '10px' }}>
           <span>🎬</span> <span>Shorts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px', cursor: 'pointer', borderRadius: '10px' }}>
           <span>📺</span> <span>Subscriptions</span>
        </div>

        <hr style={{ margin: '10px 0', border: '0', borderTop: '1px solid #e5e5e5' }} />

        {/* Library Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px', cursor: 'pointer', borderRadius: '10px' }}>
           <span>📚</span> <span>Library</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px', cursor: 'pointer', borderRadius: '10px' }}>
           <span>📜</span> <span>History</span>
        </div>
        
        <hr style={{ margin: '10px 0', border: '0', borderTop: '1px solid #e5e5e5' }} />

        {/* Sign In Prompt (Optional UI polish) */}
        <div style={{ padding: '10px' }}>
            <p style={{fontSize: '13px'}}>Sign in to like videos, comment, and subscribe.</p>
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