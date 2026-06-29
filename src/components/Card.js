import React from 'react';
import { Card as BSCard } from 'react-bootstrap';

export default function Card({ children, className = '', style = {}, interactive = false, variant = 'default', ...props }) {
  const borderMap = {
    default: '1px solid rgba(0, 229, 255, 0.15)',
    accent: '1px solid rgba(0, 229, 255, 0.3)',
    muted: '1px solid #1F222C'
  };

  const cardStyle = {
    background: 'var(--surface-dim, #12141C)',
    border: borderMap[variant] || borderMap.default,
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    ...style
  };

  const interactiveClass = interactive ? 'card-interactive' : '';

  return (
    <div
      className={`card ${interactiveClass} ${className}`}
      style={cardStyle}
      {...props}
    >
      {children}
    </div>
  );
}

// Attach Bootstrap card subcomponents for compatibility
Card.Body = BSCard.Body;
Card.Header = BSCard.Header;
Card.Title = BSCard.Title;
Card.Text = BSCard.Text;
Card.Footer = BSCard.Footer;
