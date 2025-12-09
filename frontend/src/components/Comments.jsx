import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', margin: '30px 0' }}>
      {/* Avatar Placeholder */}
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" 
        alt="avatar" 
        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', color: '#0f0f0f' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                User {comment.userId.substring(0, 5)}...
            </span>
            <span style={{ fontSize: '12px', color: '#555' }}>
                {new Date(comment.createdAt).toLocaleDateString()}
            </span>
        </div>
        <span style={{ fontSize: '14px' }}>{comment.desc}</span>
      </div>
    </div>
  );
};

export default Comment;