import React from 'react';
import { Icon } from '@/shared/ui';
import { ToolCardItem } from '../model/useToolbox';

export interface ToolCardGridProps {
  tools: ToolCardItem[];
}

export const ToolCardGrid: React.FC<ToolCardGridProps> = ({ tools }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
      {tools.map(tool => (
        <div
          key={tool.id}
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px',
            transition: 'var(--transition-smooth)',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--primary-color)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: tool.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={tool.iconName} size={20} color={tool.iconColor} />
              </div>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-muted)' }}>
                {tool.category}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                {tool.name}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                {tool.description}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {tool.tags.map(t => (
                <span key={t} style={{ fontSize: '10px', color: 'var(--text-muted)' }}>#{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, color: 'var(--primary-color)' }}>
              <span>打开工具</span>
              <Icon name="chevron-right" size={12} color="var(--primary-color)" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
