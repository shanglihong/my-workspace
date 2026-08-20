import React from 'react';
import { BreadcrumbItem } from '@/entities/navigation';
import { Icon } from '@/shared/ui';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onSelect: (nodeId: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onSelect }) => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', lineHeight: '1.4' }}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          {index > 0 && (
            <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', opacity: 0.7, margin: '0 2px' }}>
              <Icon name="chevron-right" size={12} />
            </span>
          )}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              onClick={() => onSelect(item.id)}
              style={{
                cursor: 'pointer',
                color: item.isLast ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 400, // 恢复原本清秀不加粗的标准字重
                padding: index === 0 ? '2px 4px 2px 0px' : '2px 4px',
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
