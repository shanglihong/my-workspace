import React from 'react';
import { Icon } from '@/shared/ui';
import { usePluginSync, PluginTabType } from '../model/usePluginSync';
import { ImportTab } from './ImportTab';
import { ExportTab } from './ExportTab';
import { ConnectedAppsTab } from './ConnectedAppsTab';

export const PluginContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    importStatus,
    exportStatus,
    activeNode,
    handleImportWeRead,
    handleImportFeishu,
    handleExportMarkdown,
    handleExportFeishu,
  } = usePluginSync();

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* 顶层 Segmented 选项卡分段控制栏：日间 100% 保持 #fafafa 与 #ffffff 原版精致配色 */}
      <div
        style={{
          padding: '10px 12px',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-sidebar)', // 日间: #fafafa
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            padding: '3px',
            borderRadius: '8px',
            gap: '2px',
          }}
        >
          {[
            { id: 'import', label: '素材导入', icon: 'import' },
            { id: 'export', label: '笔记导出', icon: 'export' },
            { id: 'apps', label: '已连渠道', icon: 'plugin' },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PluginTabType)}
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  height: '28px',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-card)' : 'transparent', // 日间: #ffffff
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  transition: 'var(--transition-smooth)',
                  outline: 'none',
                }}
              >
                <Icon name={tab.icon as any} size={12} color={isActive ? 'var(--primary-color)' : 'var(--text-muted)'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {(importStatus || exportStatus) && (
        <div
          style={{
            padding: '8px 14px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary-color)',
            fontSize: '12px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <Icon name="check" size={14} color="var(--primary-color)" />
          <span>{importStatus || exportStatus}</span>
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'import' && (
          <ImportTab onImportWeRead={handleImportWeRead} onImportFeishu={handleImportFeishu} />
        )}

        {activeTab === 'export' && (
          <ExportTab
            activeNode={activeNode}
            onExportMarkdown={handleExportMarkdown}
            onExportFeishu={handleExportFeishu}
          />
        )}

        {activeTab === 'apps' && <ConnectedAppsTab />}
      </div>
    </div>
  );
};
