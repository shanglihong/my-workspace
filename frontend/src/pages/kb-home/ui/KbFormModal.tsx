import React, { useState, useEffect } from 'react';
import { Icon } from '@/shared/ui';

export interface KbFormModalProps {
  isOpen: boolean;
  title: string;
  submitText: string;
  initialTitle?: string;
  initialDesc?: string;
  onClose: () => void;
  onSubmit: (title: string, desc: string) => void;
}

export const KbFormModal: React.FC<KbFormModalProps> = ({
  isOpen,
  title,
  submitText,
  initialTitle = '',
  initialDesc = '',
  onClose,
  onSubmit,
}) => {
  const [formTitle, setFormTitle] = useState(initialTitle);
  const [formDesc, setFormDesc] = useState(initialDesc);

  useEffect(() => {
    if (isOpen) {
      setFormTitle(initialTitle);
      setFormDesc(initialDesc);
    }
  }, [isOpen, initialTitle, initialDesc]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(formTitle, formDesc);
  };

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
          width: '440px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg, 12px)',
          boxShadow: 'var(--shadow-lg, 0 16px 36px rgba(0, 0, 0, 0.18))',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal 头部：带标题与标准关闭 Icon */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {title}
          </span>
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

        {/* Modal 表单区域 */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 名称字段 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
              知识库名称<span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={e => setFormTitle(e.target.value)}
              placeholder="请输入知识库名称"
              style={{
                padding: '9px 12px',
                fontSize: '13px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'all 0.18s ease',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--primary-color)';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.12)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* 简介字段 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
              知识库描述
            </label>
            <textarea
              value={formDesc}
              onChange={e => setFormDesc(e.target.value)}
              rows={3}
              placeholder="请输入知识库描述说明..."
              style={{
                padding: '9px 12px',
                fontSize: '13px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)',
                outline: 'none',
                resize: 'none',
                lineHeight: 1.5,
                transition: 'all 0.18s ease',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--primary-color)';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.12)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--border-color)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Modal 底部按钮栏 */}
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
            onClick={handleSubmit}
            style={{
              padding: '7px 18px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: 'var(--primary-color)',
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
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};
