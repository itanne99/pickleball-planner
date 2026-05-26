import React from 'react';
import Avatar from './Avatar';
import Pill from './Pill';
import WinLossBadge from './WinLossBadge';

export default function PlayerCard({ player, winCount, lossCount, avatarSize = 60, onClick, className = '', style = {} }) {
  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('');
  };

  const statusColor = player.status === 'active' ? '#22C55E' : player.status === 'away' ? '#F59E0B' : '#EF4444';

  const cardStyle = onClick
    ? { cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s' }
    : {};

  return (
    <div
      className={`player-card card ${className}`}
      style={{
        background: '#12141C',
        border: '1px solid rgba(0, 229, 255, 0.15)',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        ...cardStyle,
        ...style
      }}
      onClick={onClick}
      onMouseEnter={onClick ? (e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5), 0 0 15px rgba(0, 229, 255, 0.1)';
      } : undefined}
      onMouseLeave={onClick ? (e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.15)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.4)';
      } : undefined}
    >
      <div className="d-flex flex-row align-items-start gap-3">
        <div className="position-relative">
          <Avatar initials={getInitials(player.name)} size={avatarSize} />
          <span
            className="status-dot"
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: statusColor,
              border: '2px solid #12141C'
            }}
          />
        </div>
        <div className="flex-grow-1">
          <h5 className="mb-1 fw-bold" style={{ color: '#dce3f1' }}>{player.name}</h5>
          {player.email && (
            <p className="mb-1" style={{ color: '#bac9cc', fontSize: '0.85rem' }}>{player.email}</p>
          )}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
            {player.dupr !== undefined && (
              <span className="dupr-badge">DUPR: {player.dupr}</span>
            )}
            {winCount !== undefined && lossCount !== undefined && (
              <WinLossBadge wins={winCount} losses={lossCount} />
            )}
            {player.role && <Pill variant="secondary" style={{ fontSize: '0.7rem' }}>{player.role}</Pill>}
          </div>
        </div>
      </div>
    </div>
  );
}
