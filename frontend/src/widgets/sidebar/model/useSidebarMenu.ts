import { useState } from 'react';
import { useLayout } from '@/entities/layout';
import { IconName } from '@/shared/ui';

export interface MenuItem {
  id: string;
  label: string;
  icon: IconName;
}

export const useSidebarMenu = () => {
  const { activeView, setActiveView, isKbDrawerOpen, setIsKbDrawerOpen, closeKbDrawer } = useLayout();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const mainMenuItems: MenuItem[] = [
    { id: 'nav-home', label: '主页', icon: 'home' },
    { id: 'nav-kb', label: '知识库', icon: 'book' },
    { id: 'nav-tasks', label: '计划任务管理', icon: 'clock' },
    { id: 'nav-toolbox', label: '工具箱', icon: 'toolbox' },
    { id: 'nav-drive', label: '云盘管理', icon: 'cloud' },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === 'nav-kb') {
      setIsKbDrawerOpen(prev => !prev);
      // 若当前已在文档编辑视图 (activeView === 'editor')，保持当前编辑视图，绝不跳转 kb-home 页面
      if (activeView !== 'editor') {
        setActiveView('kb-home');
      }
    } else {
      setIsKbDrawerOpen(false);

      if (itemId === 'nav-drive') {
        setActiveView('drive');
      } else if (itemId === 'nav-home') {
        setActiveView('home');
      } else if (itemId === 'nav-tasks') {
        setActiveView('tasks');
      } else if (itemId === 'nav-toolbox') {
        setActiveView('toolbox');
      }
    }
  };

  return {
    mainMenuItems,
    isKbDrawerOpen,
    searchQuery,
    setSearchQuery,
    handleMenuClick,
    closeKbDrawer,
  };
};
