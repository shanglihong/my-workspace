import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  padding?: string;
  hoverable?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = '16px',
  hoverable = false,
  onClick,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        padding,
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition-smooth)',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onMouseEnter={e => {
        if (hoverable || onClick) {
          e.currentTarget.style.borderColor = 'var(--primary-color)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }
      }}
      onMouseLeave={e => {
        if (hoverable || onClick) {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }
      }}
    >
      {children}
    </div>
  );
};
