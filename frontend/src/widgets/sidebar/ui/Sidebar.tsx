import React from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { SidebarIconButton } from './SidebarIconButton';
import { SidebarKbDrawer } from './SidebarKbDrawer';
import { useSidebarMenu } from '../model/useSidebarMenu';
import { Icon, Tooltip } from '@/shared/ui';

export interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { theme, toggleTheme, activeView, setActiveView } = useLayout();
  const { mainMenuItems, isKbDrawerOpen, searchQuery, setSearchQuery, handleMenuClick, closeKbDrawer } =
    useSidebarMenu();

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
          <div
            onClick={() => {
              setActiveView('home');
              closeKbDrawer();
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

        {/* 底部工具区：日间/夜间模式切换与设置 (已成功移除回收站 Icon) */}
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
          <SidebarIconButton
            icon={theme === 'dark' ? 'sun' : 'moon'}
            tooltip={theme === 'dark' ? '切换为日间模式' : '切换为夜间模式'}
            onClick={toggleTheme}
          />
          <SidebarIconButton icon="settings" tooltip="设置" />
        </div>
      </aside>

      {/* 2. 二级知识库目录 Drawer Panel Panel */}
      <SidebarKbDrawer
        isOpen={isKbDrawerOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClose={closeKbDrawer}
      />
    </div>
  );
};
