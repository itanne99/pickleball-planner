import React from 'react';

export default function Card({ children, className = '', style = {}, interactive = false, variant = 'default', ...props }) {
  const borderMap = {
    default: '1px solid rgba(0, 229, 255, 0.15)',
    accent: '1px solid rgba(0, 229, 255, 0.3)',
    muted: '1px solid #1F222C'
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyle = {
    background: '#12141C',
    border: isHovered && interactive ? '1px solid rgba(0, 229, 255, 0.4)' : borderMap[variant] || borderMap.default,
    borderRadius: '12px',
    boxShadow: isHovered && interactive
      ? '0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(0, 229, 255, 0.1)'
      : '0 2px 12px rgba(0,0,0,0.4)',
    cursor: interactive ? 'pointer' : 'default',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    ...style
  };

  return (
    <div
      className={`card ${className}`}
      style={cardStyle}
      onMouseEnter={interactive ? () => setIsHovered(true) : undefined}
      onMouseLeave={interactive ? () => setIsHovered(false) : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
