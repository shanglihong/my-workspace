import React from 'react';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'muted';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'muted',
  className = '',
  style = {},
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary-color)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
        };
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          color: '#f59e0b',
          border: '1px solid rgba(245, 158, 11, 0.2)',
        };
      case 'danger':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.2)',
        };
      case 'muted':
      default:
        return {
          backgroundColor: 'var(--bg-sidebar)',
          color: 'var(--text-muted)',
          border: '1px solid var(--border-color)',
        };
    }
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 6px',
        fontSize: '11px',
        fontWeight: 500,
        borderRadius: '4px',
        lineHeight: 1.2,
        userSelect: 'none',
        ...getVariantStyles(),
        ...style,
      }}
    >
      {children}
    </span>
  );
};
