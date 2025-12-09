import React from 'react';

const Comment = ({ comment }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" 
        alt="avatar" 
        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
      />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', color: '#0f0f0f' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                User {comment.userId ? comment.userId.substring(0, 5) : "Guest"}
            </span>
            <span style={{ fontSize: '12px', color: '#555' }}>
                {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Just now"}
            </span>
        </div>
        <span style={{ fontSize: '14px' }}>{comment.desc}</span>
      </div>
    </div>
  );
};

export default Comment;