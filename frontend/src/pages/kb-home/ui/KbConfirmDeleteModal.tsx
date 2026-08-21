import React from 'react';
import { Icon } from '@/shared/ui';

export interface KbConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const KbConfirmDeleteModal: React.FC<KbConfirmDeleteModalProps> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '400px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg, 12px)',
          boxShadow: 'var(--shadow-lg, 0 16px 36px rgba(0, 0, 0, 0.18))',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal 头部 */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="trash" size={16} color="#ef4444" />
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
              确认删除知识库
            </span>
          </div>
          <div
            onClick={onClose}
            title="关闭"
            style={{
              cursor: 'pointer',
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
          >
            <Icon name="close" size={16} />
          </div>
        </div>

        {/* Modal 内容提示 */}
        <div style={{ padding: '20px 24px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          确定要删除知识库 <strong style={{ color: 'var(--text-primary)' }}>“{title}”</strong> 吗？删除后该知识库及其下属的所有文档将无法恢复。
        </div>

        {/* Modal 底部按钮 */}
        <div
          style={{
            padding: '14px 24px',
            borderTop: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '7px 16px',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--bg-app)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '7px 18px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: '#ef4444',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.92';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            确认删除
          </button>
        </div>
      </div>
    </div>
  );
};
