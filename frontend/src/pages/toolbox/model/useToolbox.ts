import { useState } from 'react';
import { IconName } from '@/shared/ui';

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

export const useToolbox = () => {
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

  const filteredTools =
    activeCategory === 'all' ? tools : tools.filter(t => t.category === activeCategory);

  return {
    activeCategory,
    setActiveCategory,
    categories,
    filteredTools,
  };
};
