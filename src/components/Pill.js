import React from 'react';

export default function Pill({ children, className = '', style = {}, variant = 'primary', ...props }) {
  const isSecondary = variant === 'secondary';
  const bgColor = isSecondary ? 'rgba(255, 64, 129, 0.15)' : 'rgba(0, 229, 255, 0.15)';
  const color = isSecondary ? 'var(--bs-secondary, #FF4081)' : 'var(--bs-primary, #00E5FF)';
  const border = isSecondary ? '1px solid rgba(255, 64, 129, 0.3)' : '1px solid rgba(0, 229, 255, 0.3)';

  return (
    <span
      className={`badge rounded-pill ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.35em 0.8em',
        background: bgColor,
        color: color,
        border: border,
        borderRadius: '50rem',
        fontSize: '0.8rem',
        fontWeight: '500',
        ...style
      }}
      {...props}
    >
      {children}
    </span>
  );
}