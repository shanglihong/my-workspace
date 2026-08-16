import React from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { Breadcrumb } from './Breadcrumb';
import { Icon } from '@/shared/ui';

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { breadcrumbPath, setActiveNodeId, activeNode } = useLayout();
  const [isPluginActive, setIsPluginActive] = React.useState(false);

  return (
    <header
      className={className}
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        userSelect: 'none',
        zIndex: 5,
        backdropFilter: 'blur(8px)',
        transition: 'var(--transition-smooth)',
      }}
    >
      {/* 左侧：参考飞书云文档样式 - 上层面包屑导航，下层保存状态 */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px', minWidth: 0 }}>
        {/* 第一行：面包屑 */}
        <Breadcrumb items={breadcrumbPath} onSelect={nodeId => setActiveNodeId(nodeId)} />

        {/* 第二行：已经保存到云端 */}
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>已经保存到云端</span>
          {activeNode?.updatedAt && (
            <>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>{activeNode.updatedAt}</span>
            </>
          )}
        </div>
      </div>

      {/* 右侧：视觉突出、选中效果轻柔的“插件”按钮 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => setIsPluginActive(prev => !prev)}
          title="扩展插件中心"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            height: '28px',
            padding: '0 10px',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--primary-color)',
            backgroundColor: 'var(--primary-light)',
            border: isPluginActive ? '1.5px solid var(--primary-color)' : '1px solid rgba(59, 130, 246, 0.25)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            outline: 'none',
            position: 'relative',
          }}
        >
          <Icon name="plugin" size={14} color="var(--primary-color)" />
          <span>插件</span>
          {isPluginActive && (
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-color)',
                marginLeft: '1px',
              }}
            />
          )}
        </button>
      </div>
    </header>
  );
};
