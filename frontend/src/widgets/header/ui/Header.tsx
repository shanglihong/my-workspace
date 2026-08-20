import React from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { Breadcrumb } from './Breadcrumb';
import { HeaderNotificationsPopover } from './HeaderNotificationsPopover';
import { useHeaderNotice } from '../model/useHeaderNotice';
import { useHeaderBreadcrumb } from '../model/useHeaderBreadcrumb';
import { Icon } from '@/shared/ui';

export interface HeaderProps {
  className?: string;
  isPluginActive?: boolean;
  onTogglePlugin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ className = '', isPluginActive = false, onTogglePlugin }) => {
  const { setActiveNodeId } = useLayout();
  const { isNoticeOpen, unreadCount, notifications, toggleNotice, markAllAsRead } = useHeaderNotice();
  const { headerContent, activeView } = useHeaderBreadcrumb();

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
      {/* 左侧：上层面包屑导航，下层状态/副标题 */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px', minWidth: 0 }}>
        <Breadcrumb items={headerContent.breadcrumb} onSelect={nodeId => setActiveNodeId(nodeId)} />
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          <span>{headerContent.subText}</span>
        </div>
      </div>

      {/* 右侧：通知 Icon + 插件按钮 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
        {/* 文档编辑场景专属插件按钮 */}
        {activeView === 'editor' && (
          <button
            onClick={onTogglePlugin}
            title="扩展与素材同步中心"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '28px',
              padding: '0 10px',
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
        )}

        {/* 全局通知 Icon 按钮（突出目立的琥珀金底色与 Icon） */}
        <div
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
            transition: 'var(--transition-smooth)',
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
          />
        )}
      </div>
    </header>
  );
};
