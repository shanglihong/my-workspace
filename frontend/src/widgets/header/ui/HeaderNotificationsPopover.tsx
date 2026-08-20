import React from 'react';
import { Icon } from '@/shared/ui';
import { NotificationItem } from '../model/useHeaderNotice';

export interface HeaderNotificationsPopoverProps {
  notifications: NotificationItem[];
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

export const HeaderNotificationsPopover: React.FC<HeaderNotificationsPopoverProps> = ({
  notifications,
  unreadCount,
  onMarkAllAsRead,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '36px',
        right: 0,
        width: '320px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 100,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Popover Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-sidebar)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Icon name="bell" size={14} color="#d97706" />
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            消息通知 ({unreadCount})
          </span>
        </div>
        {unreadCount > 0 && (
          <span
            onClick={onMarkAllAsRead}
            style={{ fontSize: '11px', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 500 }}
          >
            全部已读
          </span>
        )}
      </div>

      {/* Popover List */}
      <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {notifications.map(item => (
          <div
            key={item.id}
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              transition: 'var(--transition-smooth)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: item.badgeBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <Icon name={item.iconName} size={14} color={item.iconColor} />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{item.title}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 400 }}>{item.time}</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
