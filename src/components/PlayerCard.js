import React from 'react';
import Card from './Card';
import Avatar from './Avatar';
import Pill from './Pill';
import WinLossBadge from './WinLossBadge';

export default function PlayerCard({ player, winCount, lossCount, avatarSize = 60, onClick, className = '', style = {} }) {
  const statusColor = player.status === 'active' ? '#22C55E' : (player.status === 'away' ? '#F59E0B' : '#EF4444');

  return (
    <Card
      className={`player-card ${className}`}
      interactive={!!onClick}
      onClick={onClick}
      style={{ padding: '16px', ...style }}
    >
      <div className="d-flex flex-row align-items-start gap-3">
        <div className="position-relative">
          <Avatar name={player.name} size={avatarSize} />
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
            <p className="mb-1 text-subtle" style={{ fontSize: '0.85rem' }}>{player.email}</p>
          )}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
            {player.dupr !== undefined && (
              <span className="dupr-badge">DUPR: {typeof player.dupr === 'number' ? player.dupr.toFixed(1) : player.dupr}</span>
            )}
            {winCount !== undefined && lossCount !== undefined && (
              <WinLossBadge wins={winCount} losses={lossCount} />
            )}
            {player.role && <Pill variant="secondary" style={{ fontSize: '0.7rem' }}>{player.role}</Pill>}
          </div>
        </div>
      </div>
    </Card>
  );
}
