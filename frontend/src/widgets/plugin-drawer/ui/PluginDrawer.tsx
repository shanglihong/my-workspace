import React from 'react';
import { Icon } from '@/shared/ui';
import { usePluginSync, PluginTabType } from '../model/usePluginSync';
import { ImportTab } from './ImportTab';
import { ExportTab } from './ExportTab';
import { ConnectedAppsTab } from './ConnectedAppsTab';

export interface PluginDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PluginDrawer: React.FC<PluginDrawerProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <aside
      style={{
        width: '340px',
        height: '100vh',
        backgroundColor: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-lg)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
      }}
    >
      {/* 头部标题与关闭按钮 */}
      <div
        style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-color)',
            }}
          >
            <Icon name="plugin" size={14} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            插件与素材同步中心
          </span>
        </div>

        <div
          onClick={onClose}
          title="关闭侧边栏"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '26px',
            height: '26px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            transition: 'var(--transition-smooth)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <Icon name="close" size={14} />
        </div>
      </div>

      {/* 选项卡 Tab Header */}
      <div
        style={{
          display: 'flex',
          padding: '8px 12px',
          gap: '6px',
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-sidebar)',
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
                gap: '6px',
                padding: '6px 0',
                fontSize: '12px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name={tab.icon as any} size={13} color={isActive ? 'var(--primary-color)' : 'var(--text-muted)'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 消息提示通知 */}
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

      {/* 选项卡内容区域 */}
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
    </aside>
  );
};
