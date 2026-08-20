import React from 'react';
import { Icon, Tooltip } from '@/shared/ui';
import { useTheme } from '../model/useTheme';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip content={theme === 'dark' ? '切换为日间模式' : '切换为夜间模式'} position="right">
      <div
        onClick={toggleTheme}
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
          color: 'var(--text-secondary)',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
      </div>
    </Tooltip>
  );
};
