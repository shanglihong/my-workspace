import React from 'react';
import { Icon } from '@/shared/ui';
import { useCloudDrive } from '../model/useCloudDrive';
import { CloudDriveStorageStats } from './CloudDriveStorageStats';
import { CloudDriveFileList } from './CloudDriveFileList';

export const CloudDrivePage: React.FC = () => {
  const {
    files,
    notification,
    syncedCount,
    syncingCount,
    localOnlyCount,
    handleSyncFile,
    handleSyncAll,
  } = useCloudDrive();

  return (
    <div
      style={{
        flex: 1,
        height: 'calc(100vh - var(--header-height))',
        backgroundColor: 'var(--bg-app)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        padding: '24px 32px',
        gap: '24px',
        userSelect: 'none',
      }}
    >
      {/* 顶部标题与云同步概览仪表盘 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            云盘文件同步与状态管理
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            支持本地优先存储与云端异步双向增量同步，实时掌控每个文件的更新情况
          </div>
        </div>

        <button
          onClick={handleSyncAll}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#ffffff',
            backgroundColor: 'var(--primary-color)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
            transition: 'var(--transition-smooth)',
          }}
        >
          <Icon name="cloud" size={15} color="#ffffff" />
          <span>立即全量同步到云盘</span>
        </button>
      </div>

      {/* 通知 Banner */}
      {notification && (
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary-color)',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(59, 130, 246, 0.25)',
          }}
        >
          <Icon name="check" size={16} color="var(--primary-color)" />
          <span>{notification}</span>
        </div>
      )}

      {/* 统计指标面板 */}
      <CloudDriveStorageStats
        syncedCount={syncedCount}
        syncingCount={syncingCount}
        localOnlyCount={localOnlyCount}
      />

      {/* 表格列表 */}
      <CloudDriveFileList files={files} onSyncFile={handleSyncFile} />
    </div>
  );
};
