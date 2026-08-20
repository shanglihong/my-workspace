import React from 'react';
import { Icon, IconName } from '@/shared/ui';

export interface RecentDocItem {
  id: string;
  title: string;
  desc: string;
  icon: IconName;
  color: string;
  time: string;
}

export interface GlobalHomeRecentDocsProps {
  docs: RecentDocItem[];
  onSelectDoc: (id: string) => void;
}

export const GlobalHomeRecentDocs: React.FC<GlobalHomeRecentDocsProps> = ({ docs, onSelectDoc }) => {
  return (
    <div>
      <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
        最近访问与编辑
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {docs.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectDoc(item.id)}
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'var(--transition-smooth)',
              boxShadow: 'var(--shadow-sm)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--primary-color)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name={item.icon} size={16} color={item.color} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.time}</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
