import React from 'react';
import { BreadcrumbItem } from '@/entities/navigation';
import { Icon } from '@/shared/ui';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onSelect: (nodeId: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onSelect }) => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', lineHeight: '1.4' }}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {index > 0 && (
            <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', opacity: 0.7 }}>
              <Icon name="chevron-right" size={12} />
            </span>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span
              onClick={() => onSelect(item.id)}
              style={{
                cursor: 'pointer',
                color: item.isLast ? 'var(--text-primary)' : 'var(--text-muted)',
                padding: '2px 4px',
                borderRadius: 'var(--radius-sm)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {item.label}
            </span>
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};
