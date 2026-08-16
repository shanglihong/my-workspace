import React, { useState } from 'react';
import { Icon } from '@/shared/ui';

export interface DriveFileItem {
  id: string;
  name: string;
  type: 'doc' | 'chart';
  storagePath: string;
  syncStatus: 'synced' | 'syncing' | 'local_only';
  syncProgress?: number;
  size: string;
  updatedAt: string;
}

export const CloudDrivePage: React.FC = () => {
  const [files, setFiles] = useState<DriveFileItem[]>([
    {
      id: 'drive-1',
      name: '《黄金圈法则》云笔记.md',
      type: 'doc',
      storagePath: '本地缓存 → 飞书云端',
      syncStatus: 'synced',
      size: '4.2 KB',
      updatedAt: '刚刚',
    },
    {
      id: 'drive-2',
      name: '电视剧剧情架构图.drawio',
      type: 'chart',
      storagePath: '本地缓存 → 云端节点',
      syncStatus: 'syncing',
      syncProgress: 68,
      size: '12.8 KB',
      updatedAt: '2 分钟前',
    },
    {
      id: 'drive-3',
      name: '《白日梦想家》观后感.md',
      type: 'doc',
      storagePath: '仅本地存储',
      syncStatus: 'local_only',
      size: '2.1 KB',
      updatedAt: '10 分钟前',
    },
    {
      id: 'drive-4',
      name: '产品需求与多 Agent 架构演进.md',
      type: 'doc',
      storagePath: '本地缓存 → 飞书云端',
      syncStatus: 'synced',
      size: '8.6 KB',
      updatedAt: '1 小时前',
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  // 触发单个文件同步
  const handleSyncFile = (fileId: string) => {
    setFiles(prev =>
      prev.map(f => (f.id === fileId ? { ...f, syncStatus: 'syncing', syncProgress: 45 } : f))
    );

    setTimeout(() => {
      setFiles(prev =>
        prev.map(f => (f.id === fileId ? { ...f, syncStatus: 'synced', storagePath: '本地缓存 → 飞书云端', updatedAt: '刚刚同步' } : f))
      );
      setNotification('同步成功！文件已成功备份并上传至云端。');
      setTimeout(() => setNotification(null), 3000);
    }, 800);
  };

  // 触发全量同步
  const handleSyncAll = () => {
    setFiles(prev =>
      prev.map(f => (f.syncStatus !== 'synced' ? { ...f, syncStatus: 'syncing', syncProgress: 88 } : f))
    );

    setTimeout(() => {
      setFiles(prev =>
        prev.map(f => ({ ...f, syncStatus: 'synced', storagePath: '本地缓存 → 飞书云端', updatedAt: '刚刚同步' }))
      );
      setNotification('全量同步完成！所有本地修改已成功备份更新至云盘。');
      setTimeout(() => setNotification(null), 3000);
    }, 1000);
  };

  const syncedCount = files.filter(f => f.syncStatus === 'synced').length;
  const syncingCount = files.filter(f => f.syncStatus === 'syncing').length;
  const localOnlyCount = files.filter(f => f.syncStatus === 'local_only').length;

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

      {/* 统计指标面板卡片 Grid */}
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
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>2.4 GB / 100 GB</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-sidebar)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: '2.4%', height: '100%', backgroundColor: 'var(--primary-color)', borderRadius: '3px' }} />
          </div>
        </div>
      </div>

      {/* 文件同步管理监控表格 */}
      <div
        style={{
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-sidebar)',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            文件列表与同步详情
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>共 {files.length} 项记录</span>
        </div>

        {/* 表格主体 */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '12px' }}>
                <th style={{ padding: '12px 20px', fontWeight: 500 }}>文件名</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>存储路径</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>同步状态</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>大小</th>
                <th style={{ padding: '12px 16px', fontWeight: 500 }}>修改时间</th>
                <th style={{ padding: '12px 20px', fontWeight: 500, textAlign: 'right' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr
                  key={file.id}
                  style={{ borderBottom: '1px solid var(--border-light)', transition: 'var(--transition-smooth)' }}
                >
                  {/* 文件名 */}
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon name={file.type === 'chart' ? 'chart' : 'file-text'} size={18} color={file.type === 'chart' ? '#8b5cf6' : '#3b82f6'} />
                      <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{file.name}</span>
                    </div>
                  </td>

                  {/* 存储路径 */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                    {file.storagePath}
                  </td>

                  {/* 同步状态 Badge */}
                  <td style={{ padding: '14px 16px' }}>
                    {file.syncStatus === 'synced' && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(16, 185, 129, 0.12)',
                          color: '#10b981',
                          fontSize: '12px',
                          fontWeight: 500,
                        }}
                      >
                        <Icon name="check" size={12} color="#10b981" />
                        <span>已同步云端</span>
                      </span>
                    )}

                    {file.syncStatus === 'syncing' && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(245, 158, 11, 0.12)',
                          color: '#f59e0b',
                          fontSize: '12px',
                          fontWeight: 500,
                        }}
                      >
                        <Icon name="cloud" size={12} color="#f59e0b" />
                        <span>正在处理同步 ({file.syncProgress || 50}%)</span>
                      </span>
                    )}

                    {file.syncStatus === 'local_only' && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          backgroundColor: 'var(--primary-light)',
                          color: 'var(--primary-color)',
                          fontSize: '12px',
                          fontWeight: 500,
                        }}
                      >
                        <span>仅存储在本地</span>
                      </span>
                    )}
                  </td>

                  {/* 大小 */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {file.size}
                  </td>

                  {/* 修改时间 */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {file.updatedAt}
                  </td>

                  {/* 操作 */}
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    {file.syncStatus !== 'synced' ? (
                      <button
                        onClick={() => handleSyncFile(file.id)}
                        style={{
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'var(--primary-color)',
                          backgroundColor: 'var(--primary-light)',
                          border: '1px solid rgba(59, 130, 246, 0.25)',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          transition: 'var(--transition-smooth)',
                        }}
                      >
                        推送到云端
                      </button>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>云端已最新</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
