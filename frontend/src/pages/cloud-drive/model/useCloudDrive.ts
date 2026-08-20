import { useState } from 'react';

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

export const useCloudDrive = () => {
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

  return {
    files,
    notification,
    syncedCount,
    syncingCount,
    localOnlyCount,
    handleSyncFile,
    handleSyncAll,
  };
};
