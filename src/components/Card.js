import React from 'react';

export default function Card({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`card ${className}`}
      style={{
        background: '#12141C',
        border: '1px solid #1F222C',
        borderRadius: '8px',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}