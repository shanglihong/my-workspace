import React from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { TreeNavigation } from './TreeNavigation';
import { Icon, IconName, Tooltip } from '@/shared/ui';

export interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { activeNodeId, setActiveNodeId, navigationTree, theme, toggleTheme } = useLayout();
  const [isKbDrawerOpen, setIsKbDrawerOpen] = React.useState<boolean>(true);

  const mainMenuItems: { id: string; label: string; icon: IconName }[] = [
    { id: 'nav-search', label: '搜索', icon: 'search' },
    { id: 'nav-home', label: '主页', icon: 'home' },
    { id: 'nav-drive', label: '云盘', icon: 'cloud' },
    { id: 'nav-kb', label: '知识库', icon: 'book' },
    { id: 'nav-ai', label: '智能纪要', icon: 'sparkles' },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === 'nav-kb') {
      setIsKbDrawerOpen(prev => !prev);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexShrink: 0 }} className={className}>
      {/* 1. 一级极简 Icon 侧边栏 (Permanent Collapsed Icon Rail) */}
      <aside
        style={{
          width: 'var(--sidebar-collapsed-width)',
          height: '100vh',
          backgroundColor: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'var(--transition-smooth)',
          flexShrink: 0,
          overflow: 'visible',
          userSelect: 'none',
          zIndex: 10,
        }}
      >
        {/* LOGO 区域 */}
        <div
          style={{
            height: 'var(--header-height)',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <Tooltip content="My-Workspace" position="right">
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                flexShrink: 0,
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
              }}
            >
              <Icon name="workspace" size={16} color="#ffffff" />
            </div>
          </Tooltip>
        </div>

        {/* 主菜单功能项 */}
        <div
          style={{
            flex: 1,
            overflow: 'visible',
            padding: '12px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            width: '100%',
          }}
        >
          {mainMenuItems.map(item => {
            const isKbItem = item.id === 'nav-kb';
            const isSelected = isKbItem && isKbDrawerOpen;

            return (
              <Tooltip key={item.id} content={item.label} position="right">
                <div
                  onClick={() => handleMenuClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    color: isSelected ? 'var(--primary-color)' : 'var(--text-secondary)',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'transparent',
                    transition: 'var(--transition-smooth)',
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon name={item.icon} size={16} color={isSelected ? 'var(--primary-color)' : 'var(--text-secondary)'} />
                </div>
              </Tooltip>
            );
          })}
        </div>

        {/* 底部工具区：日间/夜间模式、回收站与设置 */}
        <div
          style={{
            width: '100%',
            padding: '12px 0',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* 日间 / 夜间模式切换 */}
          <Tooltip content={theme === 'dark' ? '切换为日间模式' : '切换为夜间模式'} position="right">
            <div
              onClick={toggleTheme}
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

          {/* 回收站 */}
          <Tooltip content="回收站" position="right">
            <div
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
              <Icon name="trash" size={16} />
            </div>
          </Tooltip>

          {/* 设置 */}
          <Tooltip content="设置" position="right">
            <div
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
              <Icon name="settings" size={16} />
            </div>
          </Tooltip>
        </div>
      </aside>

      {/* 2. 二级知识库目录 Drawer Panel（点击知识库 Icon 展开/收起） */}
      {isKbDrawerOpen && (
        <div
          style={{
            width: '230px',
            height: '100vh',
            backgroundColor: 'var(--bg-card)',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'var(--transition-smooth)',
            flexShrink: 0,
            overflow: 'hidden',
            userSelect: 'none',
            zIndex: 9,
          }}
        >
          {/* 目录栏 Header */}
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
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>文档目录</span>
            <div
              onClick={() => setIsKbDrawerOpen(false)}
              title="收起目录栏"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                color: 'var(--text-muted)',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Icon name="sidebar-close" size={14} />
            </div>
          </div>

          {/* 目录树滚动区 */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
            <TreeNavigation
              nodes={navigationTree}
              activeNodeId={activeNodeId}
              onSelectNode={node => setActiveNodeId(node.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
