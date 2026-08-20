import { useState } from 'react';
import { IconName } from '@/shared/ui';

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  iconName: IconName;
  iconColor: string;
  badgeBg: string;
}

export const useHeaderNotice = () => {
  const [isNoticeOpen, setIsNoticeOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(3);

  const notifications: NotificationItem[] = [
    {
      id: 'n1',
      title: '《黄金圈法则》划线同步完成',
      detail: '读书笔记与划线已自动增量备份至飞书云文档',
      time: '10分钟前',
      iconName: 'file-text',
      iconColor: '#3b82f6',
      badgeBg: 'rgba(59, 130, 246, 0.12)',
    },
    {
      id: 'n2',
      title: '全量云端备份已成功',
      detail: '离线缓存全量测试通过，已同步 12 个文档与架构图',
      time: '1小时前',
      iconName: 'cloud',
      iconColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
    },
    {
      id: 'n3',
      title: '计划任务到期提醒',
      detail: '《电影剧本大纲评审》任务即将在今日 18:00 到期',
      time: '2小时前',
      iconName: 'clock',
      iconColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
    },
  ];

  const toggleNotice = () => setIsNoticeOpen(prev => !prev);
  const markAllAsRead = () => setUnreadCount(0);

  return {
    isNoticeOpen,
    unreadCount,
    notifications,
    toggleNotice,
    markAllAsRead,
  };
};
