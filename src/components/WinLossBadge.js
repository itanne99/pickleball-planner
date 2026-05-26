import React from 'react';

export default function WinLossBadge({ wins, losses, className = '', style = {} }) {
  return (
    <span
      className={`win-loss-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        fontSize: '1.1rem',
        fontWeight: '700',
        ...style
      }}
    >
      <span style={{ color: '#22C55E' }}>{wins}</span>
      <span style={{ color: '#FFFFFF' }}>-</span>
      <span style={{ color: '#EF4444' }}>{losses}</span>
    </span>
  );
}
