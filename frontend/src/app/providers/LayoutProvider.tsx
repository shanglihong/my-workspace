import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { NavigationProvider, useNavigation, NavNode, BreadcrumbItem } from '@/entities/navigation';
import { useLayoutToggle } from '@/features/layout-toggle';
import { useTheme, ThemeMode } from '@/features/theme-switch';

export type ActiveView = 'editor' | 'drive' | 'home' | 'kb-home' | 'tasks' | 'toolbox';

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
  updateNodeContent: (nodeId: string, content: string) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

const LayoutInnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isCollapsed, toggleSidebar } = useLayoutToggle(false);
  const { theme, toggleTheme } = useTheme('light');
  const nav = useNavigation();

  const [isOutlineOpen, setIsOutlineOpen] = useState<boolean>(false);
  const [isReadMode, setIsReadMode] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<ActiveView>('home');

  const toggleOutline = useCallback(() => setIsOutlineOpen(prev => !prev), []);
  const toggleReadMode = useCallback(() => setIsReadMode(prev => !prev), []);

  const handleSelectNodeId = useCallback(
    (id: string) => {
      nav.setActiveNodeId(id);
      setActiveView('editor');
    },
    [nav]
  );

  const handleCreateNewNode = useCallback(
    (type: 'doc' | 'chart', title?: string) => {
      nav.createNewNode(type, title);
      setActiveView('editor');
    },
    [nav]
  );

  const value = useMemo(
    () => ({
      isSidebarCollapsed: isCollapsed,
      toggleSidebar,
      theme,
      toggleTheme,
      activeNodeId: nav.activeNodeId,
      setActiveNodeId: handleSelectNodeId,
      navigationTree: nav.navigationTree,
      setNavigationTree: nav.setNavigationTree,
      breadcrumbPath: nav.breadcrumbPath,
      activeNode: nav.activeNode,
      isOutlineOpen,
      toggleOutline,
      isReadMode,
      toggleReadMode,
      createNewNode: handleCreateNewNode,
      updateNodeContent: nav.updateNodeContent,
      activeView,
      setActiveView,
    }),
    [
      isCollapsed,
      toggleSidebar,
      theme,
      toggleTheme,
      nav.activeNodeId,
      handleSelectNodeId,
      nav.navigationTree,
      nav.setNavigationTree,
      nav.breadcrumbPath,
      nav.activeNode,
      isOutlineOpen,
      toggleOutline,
      isReadMode,
      toggleReadMode,
      handleCreateNewNode,
      nav.updateNodeContent,
      activeView,
      setActiveView,
    ]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <NavigationProvider>
      <LayoutInnerProvider>{children}</LayoutInnerProvider>
    </NavigationProvider>
  );
};

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout 必须在 LayoutProvider 内部使用');
  }
  return context;
}

