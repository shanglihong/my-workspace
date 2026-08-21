import React from 'react';
import { Icon } from '@/shared/ui';
import { useDocCreate } from '../model/useDocCreate';

export interface CreateDocButtonGroupProps {
  className?: string;
  mode?: 'default' | 'kb';
  onCreated?: () => void;
  onKbCreated?: () => void;
  onCreateKbClick?: () => void;
}

export const CreateDocButtonGroup: React.FC<CreateDocButtonGroupProps> = ({
  className = '',
  mode = 'default',
  onCreated,
  onKbCreated,
  onCreateKbClick,
}) => {
  const { handleCreateDoc, handleCreateChart, handleCreateKb } = useDocCreate(onCreated, onKbCreated);

  if (mode === 'kb') {
    return (
      <div style={{ display: 'flex', gap: '10px' }} className={className}>
        <button
          onClick={onCreateKbClick || handleCreateKb}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#ffffff',
            backgroundColor: 'var(--primary-color)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.92';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
          onMouseDown={e => {
            e.currentTarget.style.transform = 'translateY(1px) scale(0.98)';
          }}
          onMouseUp={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
        >
          <Icon name="book" size={14} color="#ffffff" />
          <span>创建知识库</span>
        </button>

        <button
          onClick={handleCreateDoc}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--primary-color)';
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.backgroundColor = 'var(--bg-card)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseDown={e => {
            e.currentTarget.style.transform = 'translateY(1px) scale(0.98)';
          }}
          onMouseUp={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
        >
          <Icon name="plus" size={14} color="var(--primary-color)" />
          <span>创建文档</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '10px' }} className={className}>
      <button
        onClick={handleCreateDoc}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          fontSize: '12px',
          fontWeight: 500,
          color: '#ffffff',
          backgroundColor: 'var(--primary-color)',
          border: 'none',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.opacity = '0.92';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        onMouseDown={e => {
          e.currentTarget.style.transform = 'translateY(1px) scale(0.98)';
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = 'translateY(-1px)';
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
          padding: '8px 16px',
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#8b5cf6';
          e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.backgroundColor = 'var(--bg-card)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        onMouseDown={e => {
          e.currentTarget.style.transform = 'translateY(1px) scale(0.98)';
        }}
        onMouseUp={e => {
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
      >
        <Icon name="chart" size={14} color="#8b5cf6" />
        <span>新建思维导图</span>
      </button>
    </div>
  );
};
