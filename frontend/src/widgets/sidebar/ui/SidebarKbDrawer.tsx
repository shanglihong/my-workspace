import React from 'react';
import { useNavigation } from '@/entities/navigation';
import { useLayout } from '@/app/providers/LayoutProvider';
import { KbTreeNavigation } from '@/features';
import { Icon } from '@/shared/ui';

export interface SidebarKbDrawerProps {
  isOpen?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClose: () => void;
}

export const SidebarKbDrawer: React.FC<SidebarKbDrawerProps> = ({
  isOpen = true,
  searchQuery,
  onSearchChange,
  onClose,
}) => {
  const { activeNodeId, navigationTree } = useNavigation();
  const { setActiveNodeId } = useLayout();

  return (
    <div
      style={{
        width: isOpen ? '230px' : '0px',
        opacity: isOpen ? 1 : 0,
        height: '100vh',
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: isOpen ? '1px solid var(--border-color)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        flexShrink: 0,
        overflow: 'hidden',
        userSelect: 'none',
        zIndex: 9,
      }}
    >
      {/* 内部固定 230px 宽度的容器，保障宽缩伸展过程无换行闪烁 */}
      <div style={{ width: '230px', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* 侧边栏 Header */}
        <div
          style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="book" size={16} color="var(--primary-color)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>知识库目录</span>
          </div>

          <div
            onClick={onClose}
            title="收起知识库目录栏"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'var(--transition-smooth)',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Icon name="sidebar-close" size={14} />
          </div>
        </div>

        {/* 快捷检索栏 */}
        <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-light)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 8px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <Icon name="search" size={13} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="快捷过滤文档..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '12px',
                width: '100%',
                color: 'var(--text-primary)',
              }}
            />
            {searchQuery && (
              <span
                onClick={() => onSearchChange('')}
                style={{ cursor: 'pointer', display: 'inline-flex', color: 'var(--text-muted)' }}
              >
                <Icon name="close" size={12} />
              </span>
            )}
          </div>
        </div>

        {/* 目录树区 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
          <KbTreeNavigation
            nodes={navigationTree}
            activeNodeId={activeNodeId}
            onSelectNode={node => setActiveNodeId(node.id)}
            filterQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};
