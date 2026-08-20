import React from 'react';
import { Icon } from '@/shared/ui';
import { DriveFileItem } from '../model/useCloudDrive';

export interface CloudDriveFileListProps {
  files: DriveFileItem[];
  onSyncFile: (fileId: string) => void;
}

export const CloudDriveFileList: React.FC<CloudDriveFileListProps> = ({ files, onSyncFile }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>全部云盘与本地备份文件</span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>共 {files.length} 项</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 20px', fontWeight: 500 }}>文件名</th>
              <th style={{ padding: '12px 20px', fontWeight: 500 }}>保存路径 / 状态</th>
              <th style={{ padding: '12px 20px', fontWeight: 500 }}>同步进度</th>
              <th style={{ padding: '12px 20px', fontWeight: 500 }}>文件大小</th>
              <th style={{ padding: '12px 20px', fontWeight: 500 }}>最近更新</th>
              <th style={{ padding: '12px 20px', fontWeight: 500, textAlign: 'right' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr
                key={file.id}
                style={{
                  borderBottom: '1px solid var(--border-light)',
                  transition: 'var(--transition-smooth)',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon
                      name={file.type === 'chart' ? 'chart' : 'file-text'}
                      size={16}
                      color={file.type === 'chart' ? '#8b5cf6' : '#3b82f6'}
                    />
                    <span>{file.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor:
                          file.syncStatus === 'synced'
                            ? '#10b981'
                            : file.syncStatus === 'syncing'
                            ? '#f59e0b'
                            : '#3b82f6',
                      }}
                    />
                    <span>{file.storagePath}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  {file.syncStatus === 'synced' && (
                    <span style={{ color: '#10b981', fontWeight: 500, fontSize: '12px' }}>已最新同步</span>
                  )}
                  {file.syncStatus === 'syncing' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '120px' }}>
                      <div style={{ flex: 1, height: '4px', backgroundColor: 'var(--bg-sidebar)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${file.syncProgress || 50}%`, height: '100%', backgroundColor: '#f59e0b' }} />
                      </div>
                      <span style={{ fontSize: '11px', color: '#f59e0b' }}>{file.syncProgress || 50}%</span>
                    </div>
                  )}
                  {file.syncStatus === 'local_only' && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>未开启云同步</span>
                  )}
                </td>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>{file.size}</td>
                <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>{file.updatedAt}</td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button
                    onClick={() => onSyncFile(file.id)}
                    disabled={file.syncStatus === 'syncing'}
                    style={{
                      padding: '4px 10px',
                      fontSize: '12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-card)',
                      color: file.syncStatus === 'synced' ? 'var(--text-muted)' : 'var(--primary-color)',
                      cursor: file.syncStatus === 'syncing' ? 'not-allowed' : 'pointer',
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    {file.syncStatus === 'synced' ? '重新同步' : file.syncStatus === 'syncing' ? '同步中...' : '同步到云盘'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
