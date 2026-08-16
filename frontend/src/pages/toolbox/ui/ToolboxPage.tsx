import React, { useState } from 'react';
import { Icon, IconName } from '@/shared/ui';

export interface ToolCardItem {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: IconName;
  iconColor: string;
  badgeBg: string;
  tags: string[];
}

export const ToolboxPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const tools: ToolCardItem[] = [
    {
      id: 't1',
      name: '微信读书划线与金句导出',
      category: '内容同步',
      description: '一键提取微信读书划线书评、精彩金句与随笔，支持导出为 Markdown 与飞书云文档格式。',
      iconName: 'book',
      iconColor: '#2563eb',
      badgeBg: 'rgba(37, 99, 235, 0.1)',
      tags: ['微信读书', '书评', 'Markdown'],
    },
    {
      id: 't2',
      name: 'Draw.io 架构图与思维导图工坊',
      category: '图形绘制',
      description: '内置高阶绘图引擎，快速绘制系统架构图、交互流程图、思维导图与 UML 图形。',
      iconName: 'chart',
      iconColor: '#8b5cf6',
      badgeBg: 'rgba(139, 92, 246, 0.1)',
      tags: ['架构图', '流程图', 'SVG/PNG'],
    },
    {
      id: 't3',
      name: 'Markdown 语法清洗与排版格式化',
      category: '文本处理',
      description: '智能清除冗余 HTML 标签、自动修剪英文与中文字符间距、规范标题语法层次。',
      iconName: 'file-text',
      iconColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.1)',
      tags: ['Format', 'Typo', 'Markdown'],
    },
    {
      id: 't4',
      name: '离线增量快照与 JSON 备份还原',
      category: '数据管理',
      description: '全量离线数据库增量备份，支持一键打包导出 workspace 快照或导入历史全量版本。',
      iconName: 'cloud',
      iconColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.1)',
      tags: ['JSON', '备份', '离线优先'],
    },
  ];

  const categories = [
    { id: 'all', name: '全部工具' },
    { id: '内容同步', name: '内容同步' },
    { id: '图形绘制', name: '图形绘制' },
    { id: '文本处理', name: '文本处理' },
    { id: '数据管理', name: '数据管理' },
  ];

  const filteredTools = activeCategory === 'all'
    ? tools
    : tools.filter(t => t.category === activeCategory);

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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredTools.map(tool => (
          <div
            key={tool.id}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
              transition: 'var(--transition-smooth)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--primary-color)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: tool.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={tool.iconName} size={20} color={tool.iconColor} />
                </div>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-muted)' }}>
                  {tool.category}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  {tool.description}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {tool.tags.map(t => (
                  <span key={t} style={{ fontSize: '10px', color: 'var(--text-muted)' }}>#{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, color: 'var(--primary-color)' }}>
                <span>打开工具</span>
                <Icon name="chevron-right" size={12} color="var(--primary-color)" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
