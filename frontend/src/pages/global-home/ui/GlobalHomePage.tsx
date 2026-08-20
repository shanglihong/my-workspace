import React from 'react';
import { DocSearchInput, CreateDocButtonGroup } from '@/features';
import { useGlobalHome } from '../model/useGlobalHome';
import { GlobalHomeRecentDocs } from './GlobalHomeRecentDocs';

export const GlobalHomePage: React.FC = () => {
  const { recentDocs, handleSelectSearchResult } = useGlobalHome();

  return (
    <div
      style={{
        flex: 1,
        height: 'calc(100vh - var(--header-height))',
        backgroundColor: 'var(--bg-app)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '0 0 40px 0',
        userSelect: 'none',
      }}
    >
      {/* 顶部 Hero 区域与中心全站搜索框 Feature */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, transparent 100%)',
          padding: '48px 40px 32px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            欢迎使用工作台
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
            快速检索文档素材、知识库、思维导图与云端同步文件
          </div>
        </div>

        {/* 引入通用 Feature 组件：全站搜索检索框 */}
        <DocSearchInput />
      </div>

      {/* 主体卡片区域 */}
      <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {/* 快捷按钮 Feature 动作 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>快速新建</div>
          <CreateDocButtonGroup />
        </div>

        {/* 最近访问的核心文档 Grid */}
        <GlobalHomeRecentDocs docs={recentDocs} onSelectDoc={handleSelectSearchResult} />
      </div>
    </div>
  );
};
