import React from 'react';

export default function StatBar({ label, value, max = 100, variant = 'primary', className = '', style = {} }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const barColor = variant === 'secondary' ? 'var(--bs-secondary, #FF4081)' : 'var(--bs-primary, #00E5FF)';
  
  return (
    <div className={`stat-bar ${className}`} style={{ width: '100%', ...style }}>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
          <span>{label}</span>
          <span style={{ color: 'var(--outline, #849396)' }}>{value} / {max}</span>
        </div>
      )}
      <div style={{ background: '#12141C', borderRadius: '4px', border: '1px solid #1F222C', height: '8px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            background: barColor,
            width: `${percentage}%`,
            transition: 'width 0.3s ease',
            boxShadow: `0 0 8px ${barColor}40`
          }}
        />
      </div>
    </div>
  );
}