import React from 'react';
import { Icon } from '@/shared/ui';
import { KbItem } from '../model/useKbHome';

export interface KbCardItemProps {
  item: KbItem;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onOpenSettings: (item: KbItem) => void;
  onOpenDelete: (item: KbItem) => void;
}

export const KbCardItem: React.FC<KbCardItemProps> = ({
  item,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onOpenSettings,
  onOpenDelete,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        padding: '14px 18px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        cursor: 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={e => {
        onMouseEnter();
        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={e => {
        onMouseLeave();
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* 知识库文件夹图标与标题 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Icon name="folder" size={18} color="var(--primary-color)" />
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {item.title}
        </span>
      </div>

      {/* 右侧可点击入口组：设置图标 + 删除图标（卡片 Hover 时平滑呈现） */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? 'auto' : 'none',
          transition: 'opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* 设置按钮 */}
        <div
          onClick={e => {
            e.stopPropagation();
            onOpenSettings(item);
          }}
          title="知识库设置"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
            e.currentTarget.style.color = 'var(--primary-color)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.92)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Icon name="settings" size={15} />
        </div>

        {/* 删除按钮 */}
        <div
          onClick={e => {
            e.stopPropagation();
            onOpenDelete(item);
          }}
          title="删除知识库"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-muted)',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.color = '#ef4444';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.92)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Icon name="trash" size={15} />
        </div>
      </div>
    </div>
  );
};
