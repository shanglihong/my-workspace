import React from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { TreeNavigation } from './TreeNavigation';
import { Icon, IconName, Tooltip } from '@/shared/ui';

export interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { activeNodeId, setActiveNodeId, navigationTree, theme, toggleTheme, activeView, setActiveView } = useLayout();
  const [isKbDrawerOpen, setIsKbDrawerOpen] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const mainMenuItems: { id: string; label: string; icon: IconName }[] = [
    { id: 'nav-home', label: '主页', icon: 'home' },
    { id: 'nav-kb', label: '知识库', icon: 'book' },
    { id: 'nav-tasks', label: '计划任务管理', icon: 'clock' },
    { id: 'nav-toolbox', label: '工具箱', icon: 'toolbox' },
    { id: 'nav-drive', label: '云盘管理', icon: 'cloud' },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === 'nav-kb') {
      setIsKbDrawerOpen(prev => !prev);
      setActiveView('kb-home');
    } else {
      // 点击除知识库外的其他 Icon 时，自动关闭文档目录栏
      setIsKbDrawerOpen(false);

      if (itemId === 'nav-drive') {
        setActiveView('drive');
      } else if (itemId === 'nav-home') {
        setActiveView('home');
      } else if (itemId === 'nav-tasks') {
        setActiveView('tasks');
      } else if (itemId === 'nav-toolbox') {
        setActiveView('toolbox');
      }
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
        {/* LOGO 区域：纯粹、无边框壳、极具标志身份感的高阶品牌 Logo */}
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
          <div
            onClick={() => {
              setActiveView('home');
              setIsKbDrawerOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              padding: '4px',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Icon name="logo-brand" size={22} color="var(--primary-color)" />
          </div>
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
            const isHomeItem = item.id === 'nav-home';
            const isKbItem = item.id === 'nav-kb';
            const isTasksItem = item.id === 'nav-tasks';
            const isToolboxItem = item.id === 'nav-toolbox';
            const isDriveItem = item.id === 'nav-drive';
            const isSelected =
              (isHomeItem && activeView === 'home') ||
              (isKbItem && isKbDrawerOpen) ||
              (isTasksItem && activeView === 'tasks') ||
              (isToolboxItem && activeView === 'toolbox') ||
              (isDriveItem && activeView === 'drive');

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
            backgroundColor: 'var(--bg-sidebar)',
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
          {/* 侧边栏专属 Header: 与右侧文档 Header 产生明确的虚实与材质区分 */}
          <div
            style={{
              height: 'var(--header-height)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
              borderBottom: '1px solid var(--border-light)',
              backgroundColor: 'var(--bg-sidebar)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="book" size={14} color="var(--text-muted)" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.2px' }}>
                文档目录
              </span>
            </div>

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
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Icon name="sidebar-close" size={14} />
            </div>
          </div>

          {/* 实时搜索框 */}
          <div style={{ padding: '8px 12px 6px 12px', borderBottom: '1px solid var(--border-light)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '28px',
                padding: '0 8px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Icon name="search" size={13} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="搜索文档目录..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                }}
              />
              {searchQuery && (
                <div
                  onClick={() => setSearchQuery('')}
                  style={{ cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                >
                  <Icon name="close" size={12} />
                </div>
              )}
            </div>
          </div>

          {/* 目录树滚动区 */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
            <TreeNavigation
              nodes={navigationTree}
              activeNodeId={activeNodeId}
              onSelectNode={node => setActiveNodeId(node.id)}
              filterQuery={searchQuery}
            />
          </div>
        </div>
      )}
    </div>
  );
};
