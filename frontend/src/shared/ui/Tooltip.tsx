import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
  style?: React.CSSProperties;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', offset, style }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionStyle = (): React.CSSProperties => {
    switch (position) {
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: `${offset ?? 6}px` };
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: `${offset ?? 6}px` };
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: `${offset ?? 8}px` };
      case 'top':
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: `${offset ?? 6}px` };
    }
  };

  const getArrowStyle = (): React.CSSProperties => {
    const baseArrow: React.CSSProperties = {
      position: 'absolute',
      width: '6px',
      height: '6px',
      backgroundColor: 'var(--bg-card)',
      transform: 'rotate(45deg)',
      border: '1px solid var(--border-color)',
    };

    switch (position) {
      case 'bottom':
        return { ...baseArrow, top: '-3.5px', left: 'calc(50% - 3px)', borderRight: 'none', borderBottom: 'none' };
      case 'left':
        return { ...baseArrow, right: '-3.5px', top: 'calc(50% - 3px)', borderLeft: 'none', borderBottom: 'none' };
      case 'right':
        return { ...baseArrow, left: '-3.5px', top: 'calc(50% - 3px)', borderRight: 'none', borderTop: 'none' };
      case 'top':
      default:
        return { ...baseArrow, bottom: '-3.5px', left: 'calc(50% - 3px)', borderLeft: 'none', borderTop: 'none' };
    }
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            zIndex: 99999,
            backgroundColor: 'var(--bg-card)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: 'var(--text-primary)',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 16px -2px rgba(0, 0, 0, 0.1), 0 2px 6px -1px rgba(0, 0, 0, 0.05)',
            lineHeight: 1.3,
            transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
            ...getPositionStyle(),
          }}
        >
          <div style={getArrowStyle()} />
          <span style={{ position: 'relative', zIndex: 1 }}>{content}</span>
        </div>
      )}
    </div>
  );
};
