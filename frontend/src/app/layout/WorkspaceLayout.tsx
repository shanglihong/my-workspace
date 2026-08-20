import React, { useState, lazy, Suspense } from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { Sidebar } from '@/widgets/sidebar';
import { Header } from '@/widgets/header';
import { PluginDrawer } from '@/widgets/plugin-drawer';
import { KbEditorViewport } from '@/pages/kb-home';

const CloudDrivePage = lazy(() => import('@/pages/cloud-drive').then(m => ({ default: m.CloudDrivePage })));
const KbHomePage = lazy(() => import('@/pages/kb-home').then(m => ({ default: m.KbHomePage })));
const GlobalHomePage = lazy(() => import('@/pages/global-home').then(m => ({ default: m.GlobalHomePage })));
const TasksPage = lazy(() => import('@/pages/tasks').then(m => ({ default: m.TasksPage })));
const ToolboxPage = lazy(() => import('@/pages/toolbox').then(m => ({ default: m.ToolboxPage })));

export const WorkspaceLayout: React.FC = () => {
  const [isPluginDrawerOpen, setIsPluginDrawerOpen] = useState<boolean>(false);
  const { activeView } = useLayout();

  const renderMainContent = () => {
    return (
      <Suspense fallback={<div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>加载中...</div>}>
        {(() => {
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
        })()}
      </Suspense>
    );
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
