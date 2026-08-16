import React, { createContext, useContext, useState, useMemo } from 'react';
import { NavNode, BreadcrumbItem, calculateBreadcrumbPath, findNodePath } from '@/entities/navigation';
import { useLayoutToggle } from '@/features/layout-toggle';
import { useTheme, ThemeMode } from '@/features/theme-switch';
import { mockNavigationTree } from '@/mock/navigationData';

interface LayoutContextValue {
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
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isCollapsed, toggleSidebar } = useLayoutToggle(false);
  const { theme, toggleTheme } = useTheme('light');
  const [navigationTree, setNavigationTree] = useState<NavNode[]>(mockNavigationTree);
  const [activeNodeId, setActiveNodeId] = useState<string>('doc-dianying');
  const [isOutlineOpen, setIsOutlineOpen] = useState<boolean>(false);
  const [isReadMode, setIsReadMode] = useState<boolean>(false);

  const toggleOutline = () => setIsOutlineOpen(prev => !prev);
  const toggleReadMode = () => setIsReadMode(prev => !prev);

  const breadcrumbPath = useMemo(() => {
    return calculateBreadcrumbPath(navigationTree, activeNodeId);
  }, [navigationTree, activeNodeId]);

  const activeNode = useMemo(() => {
    const path = findNodePath(navigationTree, activeNodeId);
    return path ? path[path.length - 1] : null;
  }, [navigationTree, activeNodeId]);

  const createNewNode = (type: 'doc' | 'chart', title?: string) => {
    const newId = `${type}-${Date.now()}`;
    const newNodeName = title || (type === 'doc' ? '无标题文档' : '新建流程图');
    const newNode: NavNode = {
      id: newId,
      title: newNodeName,
      type: type,
      author: { name: '当前用户' },
      updatedAt: '刚刚修改',
      content: type === 'doc' ? `# ${newNodeName}\n\n开始撰写内容...` : '',
    };

    setNavigationTree(prev => [newNode, ...prev]);
    setActiveNodeId(newId);
  };

  const value = useMemo(
    () => ({
      isSidebarCollapsed: isCollapsed,
      toggleSidebar,
      theme,
      toggleTheme,
      activeNodeId,
      setActiveNodeId,
      navigationTree,
      setNavigationTree,
      breadcrumbPath,
      activeNode,
      isOutlineOpen,
      toggleOutline,
      isReadMode,
      toggleReadMode,
      createNewNode,
    }),
    [isCollapsed, theme, activeNodeId, navigationTree, breadcrumbPath, activeNode, isOutlineOpen, isReadMode]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout 必须在 LayoutProvider 内部使用');
  }
  return context;
}
