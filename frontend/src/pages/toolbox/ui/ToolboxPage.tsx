import React from 'react';
import { Icon } from '@/shared/ui';
import { useToolbox } from '../model/useToolbox';
import { ToolCardGrid } from './ToolCardGrid';

export const ToolboxPage: React.FC = () => {
  const { activeCategory, setActiveCategory, categories, filteredTools } = useToolbox();

  return (
    <div
      style={{
        flex: 1,
        height: 'calc(100vh - var(--header-height))',
        backgroundColor: 'var(--bg-app)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        padding: '24px 32px',
        gap: '24px',
        userSelect: 'none',
      }}
    >
      {/* 顶部 Header 说明 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="toolbox" size={22} color="var(--primary-color)" />
            <span>生产力工具箱</span>
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            一站式高效组件、绘制工具、划线转换与全量备份合集
          </div>
        </div>

        {/* 分类 Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px', backgroundColor: 'var(--bg-sidebar)', padding: '3px', borderRadius: 'var(--radius-md)' }}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              style={{
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 500,
                color: activeCategory === c.id ? 'var(--text-primary)' : 'var(--text-muted)',
                backgroundColor: activeCategory === c.id ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                boxShadow: activeCategory === c.id ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition-smooth)',
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* 工具列表 Grid */}
      <ToolCardGrid tools={filteredTools} />
    </div>
  );
};
