import React from 'react';

export default function Avatar({ src, initials, size = 40, className = '', style = {}, ...props }) {
  return (
    <div
      className={`avatar ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#12141C',
        border: '1px solid #1F222C',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: 'var(--inverse-surface, #dce3f1)',
        fontWeight: '600',
        fontSize: size * 0.4,
        ...style
      }}
      {...props}
    >
      {src ? (
        <img src={src} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials || '?'
      )}
    </div>
  );
}