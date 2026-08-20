import React from 'react';
import { Icon } from '@/shared/ui';

export interface CloudDriveStorageStatsProps {
  syncedCount: number;
  syncingCount: number;
  localOnlyCount: number;
}

export const CloudDriveStorageStats: React.FC<CloudDriveStorageStatsProps> = ({
  syncedCount,
  syncingCount,
  localOnlyCount,
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
      {/* 已同步 */}
      <div
        style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={20} color="#10b981" />
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>已完成云同步</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
            {syncedCount} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)' }}>个文件</span>
          </div>
        </div>
      </div>

      {/* 正在同步 */}
      <div
        style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="cloud" size={20} color="#f59e0b" />
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>正在处理同步中</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#f59e0b', marginTop: '2px' }}>
            {syncingCount} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)' }}>个文件</span>
          </div>
        </div>
      </div>

      {/* 仅本地 */}
      <div
        style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="file-text" size={20} color="#3b82f6" />
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>仅存储在本地</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary-color)', marginTop: '2px' }}>
            {localOnlyCount} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)' }}>个文件</span>
          </div>
        </div>
      </div>

      {/* 容量可用率 */}
      <div
        style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '6px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span style={{ color: 'var(--text-muted)' }}>云盘空间已用</span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>27.7 KB / 5 GB</span>
        </div>
        <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-sidebar)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: '5%', height: '100%', backgroundColor: 'var(--primary-color)', borderRadius: '3px' }} />
        </div>
      </div>
    </div>
  );
};
