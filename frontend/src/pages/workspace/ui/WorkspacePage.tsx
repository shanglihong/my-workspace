import React, { useState } from 'react';
import { Sidebar } from '@/widgets/sidebar';
import { Header } from '@/widgets/header';
import { ContentViewport } from '@/widgets/content-viewport';
import { PluginDrawer } from '@/widgets/plugin-drawer';

export const WorkspacePage: React.FC = () => {
  const [isPluginDrawerOpen, setIsPluginDrawerOpen] = useState<boolean>(false);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* 极简折叠侧边栏 */}
      <Sidebar />

      {/* 主视图与顶栏结构 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header isPluginActive={isPluginDrawerOpen} onTogglePlugin={() => setIsPluginDrawerOpen(prev => !prev)} />
        <ContentViewport />
      </div>

      {/* 右侧：素材与插件同步侧边栏/抽屉 */}
      <PluginDrawer isOpen={isPluginDrawerOpen} onClose={() => setIsPluginDrawerOpen(false)} />
    </div>
  );
};
