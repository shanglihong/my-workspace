import React from 'react';
import { useLayout } from '@/entities/layout';
import { Breadcrumb } from './Breadcrumb';
import { HeaderNotificationsPopover } from './HeaderNotificationsPopover';
import { useHeaderNotice } from '../model/useHeaderNotice';
import { useHeaderBreadcrumb } from '../model/useHeaderBreadcrumb';
import { Icon } from '@/shared/ui';

export interface HeaderProps {
  className?: string;
  isPluginActive?: boolean;
  onTogglePlugin?: () => void;
  isAiActive?: boolean;
  onToggleAi?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  className = '',
  isPluginActive: externalPluginActive,
  onTogglePlugin,
  isAiActive: externalAiActive,
  onToggleAi,
}) => {
  const { setActiveNodeId, setActiveView, closeKbDrawer, rightDrawerType, toggleRightDrawer } = useLayout();
  const { isNoticeOpen, unreadCount, notifications, toggleNotice, closeNotice, markAllAsRead } = useHeaderNotice();
  const { headerContent, activeView } = useHeaderBreadcrumb();

  const isPluginActive = externalPluginActive ?? (rightDrawerType === 'plugin');
  const isAiActive = externalAiActive ?? (rightDrawerType === 'ai');

  const handlePluginClick = () => {
    if (onTogglePlugin) {
      onTogglePlugin();
    } else {
      toggleRightDrawer('plugin');
    }
  };

  const handleAiClick = () => {
    if (onToggleAi) {
      onToggleAi();
    } else {
      toggleRightDrawer('ai');
    }
  };

  // 点击面包屑处理：如果点击的是首个 Root 节点 "工作台" (index === 0)，直接切回系统首页并将知识库目录顺畅收起
  const handleBreadcrumbSelect = (nodeId: string, index: number) => {
    if (index === 0) {
      setActiveView('home');
      closeKbDrawer();
      return;
    }
    setActiveNodeId(nodeId);
  };

  return (
    <header
      className={className}
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        userSelect: 'none',
        zIndex: 10,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'var(--transition-smooth)',
        position: 'relative',
      }}
    >
      {/* 左侧：面包屑导航与状态描述 */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px', minWidth: 0 }}>
        <Breadcrumb items={headerContent.breadcrumb} onSelect={handleBreadcrumbSelect} />
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          <span>{headerContent.subText}</span>
        </div>
      </div>

      {/* 右侧操作栏 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
        {/* 仅在文档编辑场景 (activeView === 'editor') 展示插件按钮与 AI 按钮 */}
        {activeView === 'editor' && (
          <>
            {/* 插件按钮 */}
            <button
              data-drawer-trigger="true"
              onClick={handlePluginClick}
              title="扩展与素材同步中心"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                height: '28px',
                padding: '0 12px',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--primary-color)',
                backgroundColor: isPluginActive ? 'var(--primary-light)' : 'rgba(37, 99, 235, 0.05)',
                border: isPluginActive ? '1px solid var(--primary-color)' : '1px solid rgba(37, 99, 235, 0.15)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                outline: 'none',
              }}
            >
              <Icon name="plugin" size={13} color="var(--primary-color)" />
              <span>插件</span>
            </button>

            {/* AI 按钮 */}
            <button
              data-drawer-trigger="true"
              onClick={handleAiClick}
              title="AI 辅助对话"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                height: '28px',
                padding: '0 12px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#8b5cf6',
                backgroundColor: isAiActive ? 'rgba(139, 92, 246, 0.18)' : 'rgba(139, 92, 246, 0.06)',
                border: isAiActive ? '1px solid #8b5cf6' : '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                outline: 'none',
              }}
            >
              <Icon name="sparkles" size={13} color="#8b5cf6" />
              <span>AI</span>
            </button>
          </>
        )}

        {/* 全局消息通知 Icon 按钮 */}
        <div
          data-notice-trigger="true"
          onClick={toggleNotice}
          title="消息通知"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            border: isNoticeOpen ? '1.5px solid #f59e0b' : '1px solid rgba(245, 158, 11, 0.35)',
            backgroundColor: isNoticeOpen ? 'rgba(245, 158, 11, 0.18)' : 'rgba(245, 158, 11, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <Icon name="bell" size={14} color="#d97706" />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '3px',
                right: '3px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                boxShadow: '0 0 0 1.5px var(--bg-card)',
              }}
            />
          )}
        </div>

        {/* 消息通知 Popover 下拉浮窗 */}
        {isNoticeOpen && (
          <HeaderNotificationsPopover
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAllAsRead={markAllAsRead}
            onClose={closeNotice}
          />
        )}
      </div>
    </header>
  );
};
