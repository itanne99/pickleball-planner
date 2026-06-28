import React from 'react';

const sizeMap = {
  sm: 30,
  md: 50,
  lg: 80
};

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export default function Avatar({ src, initials, name, size = 40, className = '', style = {}, ...props }) {
  const numericSize = typeof size === 'number' ? size : sizeMap[size] || 40;
  const displayInitials = initials || getInitials(name);

  return (
    <div
      className={`avatar ${className}`}
      style={{
        width: numericSize,
        height: numericSize,
        borderRadius: '50%',
        background: 'var(--surface-dim, #12141C)',
        border: '1px solid #1F222C',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: 'var(--inverse-surface, #dce3f1)',
        fontWeight: '600',
        fontSize: numericSize * 0.4,
        ...style
      }}
      {...props}
    >
      {src ? (
        <img src={src} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        displayInitials
      )}
    </div>
  );
}