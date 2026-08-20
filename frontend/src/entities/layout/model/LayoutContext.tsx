import React, { createContext, useContext } from 'react';
import { NavNode, BreadcrumbItem } from '@/entities/navigation';

export type ThemeMode = 'light' | 'dark';


export type ActiveView = 'editor' | 'drive' | 'home' | 'kb-home' | 'tasks' | 'toolbox' | 'settings';
export type RightDrawerType = 'ai' | 'plugin' | null;

export interface LayoutContextValue {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  activeNodeId: string;
  setActiveNodeId: (id: string) => void;
  navigationTree: NavNode[];
  setNavigationTree: React.Dispatch<React.SetStateAction<NavNode[]>>;
  breadcrumbPath: BreadcrumbItem[];
  activeNode: NavNode | null;
  isOutlineOpen: boolean;
  toggleOutline: () => void;
  isReadMode: boolean;
  toggleReadMode: () => void;
  createNewNode: (type: 'doc' | 'chart', title?: string) => void;
  updateNodeContent: (nodeId: string, content: string) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  // 知识库目录 Drawer 状态控制
  isKbDrawerOpen: boolean;
  setIsKbDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleKbDrawer: () => void;
  closeKbDrawer: () => void;

  // 右侧侧边栏状态控制
  rightDrawerType: RightDrawerType;
  setRightDrawerType: (type: RightDrawerType) => void;
  toggleRightDrawer: (type: 'ai' | 'plugin') => void;
  closeRightDrawer: () => void;
  isRightDrawerOpen: boolean;
  isAiSidebarOpen: boolean;
  toggleAiSidebar: () => void;
  setAiSidebarOpen: (open: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextValue | null>(null);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout 必须在 LayoutProvider 内部使用');
  }
  return context;
}
