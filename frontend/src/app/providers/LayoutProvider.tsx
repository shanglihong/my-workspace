import React, { useState, useMemo, useCallback } from 'react';
import { NavigationProvider, useNavigation } from '@/entities/navigation';
import { LayoutContext, ActiveView, RightDrawerType, useLayout } from '@/entities/layout';
import { useLayoutToggle } from '@/features/layout-toggle';
import { useTheme } from '@/features/theme-switch';
import { mockNavigationTree } from '@/mock';

export type { ActiveView, RightDrawerType };
export { useLayout };



const LayoutInnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isCollapsed, toggleSidebar } = useLayoutToggle(false);
  const { theme, toggleTheme } = useTheme('light');
  const nav = useNavigation();

  const [isOutlineOpen, setIsOutlineOpen] = useState<boolean>(false);
  const [isReadMode, setIsReadMode] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [isKbDrawerOpen, setIsKbDrawerOpen] = useState<boolean>(false);
  const [rightDrawerType, setRightDrawerType] = useState<RightDrawerType>(null);

  const toggleOutline = useCallback(() => setIsOutlineOpen(prev => !prev), []);
  const toggleReadMode = useCallback(() => setIsReadMode(prev => !prev), []);

  const toggleKbDrawer = useCallback(() => setIsKbDrawerOpen(prev => !prev), []);
  const closeKbDrawer = useCallback(() => setIsKbDrawerOpen(false), []);

  const closeRightDrawer = useCallback(() => {
    setRightDrawerType(null);
  }, []);

  const toggleRightDrawer = useCallback((type: 'ai' | 'plugin') => {
    setRightDrawerType(prev => {
      const next = prev === type ? null : type;
      if (next) {
        setIsOutlineOpen(false);
      }
      return next;
    });
  }, []);

  const toggleAiSidebar = useCallback(() => toggleRightDrawer('ai'), [toggleRightDrawer]);

  const setAiSidebarOpen = useCallback((open: boolean) => {
    setRightDrawerType(open ? 'ai' : null);
    if (open) {
      setIsOutlineOpen(false);
    }
  }, []);

  const isAiSidebarOpen = rightDrawerType === 'ai';
  const isRightDrawerOpen = rightDrawerType !== null;

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
      isKbDrawerOpen,
      setIsKbDrawerOpen,
      toggleKbDrawer,
      closeKbDrawer,
      rightDrawerType,
      setRightDrawerType,
      toggleRightDrawer,
      closeRightDrawer,
      isRightDrawerOpen,
      isAiSidebarOpen,
      toggleAiSidebar,
      setAiSidebarOpen,
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
      isKbDrawerOpen,
      setIsKbDrawerOpen,
      toggleKbDrawer,
      closeKbDrawer,
      rightDrawerType,
      setRightDrawerType,
      toggleRightDrawer,
      closeRightDrawer,
      isRightDrawerOpen,
      isAiSidebarOpen,
      toggleAiSidebar,
      setAiSidebarOpen,
    ]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <NavigationProvider initialTree={mockNavigationTree}>
      <LayoutInnerProvider>{children}</LayoutInnerProvider>
    </NavigationProvider>
  );
};


