import React from 'react';

const Footer = () => {
  return (
    <div style={{ 
        textAlign: 'center', 
        padding: '20px', 
        marginTop: 'auto', // Pushes to bottom
        borderTop: '1px solid #e5e5e5',
        color: '#606060',
        fontSize: '12px'
    }}>
      <p>&copy; 2024 YouTube Clone. All rights reserved.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '5px' }}>
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
        <span>About</span>
      </div>
    </div>
  );
};

export default Footer;