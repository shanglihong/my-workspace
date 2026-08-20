import React, { useState } from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { Sidebar } from '@/widgets/sidebar';
import { Header } from '@/widgets/header';
import { PluginDrawer } from '@/widgets/plugin-drawer';
import { KbEditorViewport } from './KbEditorViewport';
import { CloudDrivePage } from '@/pages/cloud-drive';
import { KbHomePage } from '@/pages/kb-home';
import { GlobalHomePage } from '@/pages/global-home';
import { TasksPage } from '@/pages/tasks';
import { ToolboxPage } from '@/pages/toolbox';

export const WorkspacePage: React.FC = () => {
  const [isPluginDrawerOpen, setIsPluginDrawerOpen] = useState<boolean>(false);
  const { activeView } = useLayout();

  const renderMainContent = () => {
    switch (activeView) {
      case 'home':
        return <GlobalHomePage />;
      case 'kb-home':
        return <KbHomePage />;
      case 'tasks':
        return <TasksPage />;
      case 'toolbox':
        return <ToolboxPage />;
      case 'drive':
        return <CloudDrivePage />;
      default:
        return <KbEditorViewport />;
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* 极简折叠侧边栏 */}
      <Sidebar />

      {/* 主视图与顶栏结构 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header isPluginActive={isPluginDrawerOpen} onTogglePlugin={() => setIsPluginDrawerOpen(prev => !prev)} />
        {renderMainContent()}
      </div>

      {/* 右侧：素材与插件同步侧边栏/抽屉 */}
      <PluginDrawer isOpen={isPluginDrawerOpen} onClose={() => setIsPluginDrawerOpen(false)} />
    </div>
  );
};

