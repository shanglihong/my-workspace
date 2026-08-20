import { useState } from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { IconName } from '@/shared/ui';

export interface MenuItem {
  id: string;
  label: string;
  icon: IconName;
}

export const useSidebarMenu = () => {
  const { setActiveView } = useLayout();
  const [isKbDrawerOpen, setIsKbDrawerOpen] = useState<boolean>(false);
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
      setActiveView('kb-home');
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

  const closeKbDrawer = () => setIsKbDrawerOpen(false);

  return {
    mainMenuItems,
    isKbDrawerOpen,
    searchQuery,
    setSearchQuery,
    handleMenuClick,
    closeKbDrawer,
  };
};
