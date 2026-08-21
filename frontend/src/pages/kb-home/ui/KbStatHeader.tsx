import React from 'react';
import { Icon } from '@/shared/ui';

export const KbStatHeader: React.FC = () => {
  return (
    <div
      style={{
        height: '160px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 40px 24px 40px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            backgroundColor: 'var(--primary-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <Icon name="workspace" size={28} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            知识库中心
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            集中管理个人与团队知识体系，高效组织文档、笔记与各类协同资源
          </div>
        </div>
      </div>
    </div>
  );
};
