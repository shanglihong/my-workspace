import React from 'react';
import { Icon, IconName, Tooltip } from '@/shared/ui';

export interface SidebarIconButtonProps {
  icon: IconName;
  tooltip: string;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export const SidebarIconButton: React.FC<SidebarIconButtonProps> = ({
  icon,
  tooltip,
  onClick,
  isActive = false,
  className = '',
}) => {
  return (
    <Tooltip content={tooltip} position="right">
      <div
        onClick={onClick}
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          transition: 'var(--transition-smooth)',
          color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
          backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
        }}
        onMouseEnter={e => {
          if (!isActive) e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
        }}
        onMouseLeave={e => {
          if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Icon name={icon} size={16} />
      </div>
    </Tooltip>
  );
};
