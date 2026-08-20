import React from 'react';
import { Icon } from '@/shared/ui';

export const ConnectedAppsTab: React.FC = () => {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        管理已连接的第三方生态扩展应用与凭证认证：
      </div>

      <div
        style={{
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-sidebar)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="plugin" size={16} color="var(--primary-color)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>微信读书同步Sidecar</span>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 500 }}>运行中 · v1.2.0</span>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
          上次自动轮询同步时间：10 分钟前
        </div>
      </div>

      <div
        style={{
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-sidebar)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="chart" size={16} color="#8b5cf6" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Draw.io 离线内核</span>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 500 }}>就绪</span>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
          静态矢量图表渲染引擎支持 SVG / XML / PNG 矢量重构导出。
        </div>
      </div>
    </div>
  );
};
