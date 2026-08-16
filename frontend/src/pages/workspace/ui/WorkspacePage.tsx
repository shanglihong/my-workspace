import React from 'react';
import { Sidebar } from '@/widgets/sidebar';
import { Header } from '@/widgets/header';
import { MainWorkspace } from '@/widgets/main-workspace';

export const WorkspacePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 极简折叠侧边栏 */}
      <Sidebar />

      {/* 主视图与顶栏结构 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header />
        <MainWorkspace />
      </div>
    </div>
  );
};
