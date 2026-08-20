import React from 'react';
import { Icon } from '@/shared/ui';
import { useDocCreate } from '../model/useDocCreate';

export interface CreateDocButtonGroupProps {
  className?: string;
  onCreated?: () => void;
}

export const CreateDocButtonGroup: React.FC<CreateDocButtonGroupProps> = ({ className = '', onCreated }) => {
  const { handleCreateDoc, handleCreateChart } = useDocCreate(onCreated);


  return (
    <div style={{ display: 'flex', gap: '10px' }} className={className}>
      <button
        onClick={handleCreateDoc}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          fontSize: '12px',
          fontWeight: 500,
          color: '#ffffff',
          backgroundColor: 'var(--primary-color)',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)',
          transition: 'var(--transition-smooth)',
        }}
      >
        <Icon name="plus" size={14} color="#ffffff" />
        <span>新建空白文档</span>
      </button>

      <button
        onClick={handleCreateChart}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px',
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          transition: 'var(--transition-smooth)',
        }}
      >
        <Icon name="chart" size={14} color="#8b5cf6" />
        <span>新建思维导图</span>
      </button>
    </div>
  );
};
