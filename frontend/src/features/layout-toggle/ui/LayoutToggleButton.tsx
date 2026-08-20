import React from 'react';
import { Icon, Tooltip } from '@/shared/ui';

export interface LayoutToggleButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export const LayoutToggleButton: React.FC<LayoutToggleButtonProps> = ({
  isCollapsed,
  onToggle,
  className = '',
}) => {
  return (
    <Tooltip content={isCollapsed ? '展开侧边栏' : '收起侧边栏'} position="right">
      <div
        onClick={onToggle}
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          transition: 'var(--transition-smooth)',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name={isCollapsed ? 'sidebar-open' : 'sidebar-close'} size={14} />
      </div>
    </Tooltip>
  );
};
