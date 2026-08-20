import { useLayout } from '@/entities/layout';
import { IconName } from '@/shared/ui';

export interface KbQuickAccessItem {
  id: string;
  title: string;
  desc: string;
  icon: IconName;
  iconColor: string;
  tag: string;
  updatedAt: string;
}

export const useKbHome = () => {
  const { setActiveNodeId, createNewNode } = useLayout();

  const quickAccessItems: KbQuickAccessItem[] = [
    {
      id: 'doc-dianying',
      title: '电影知识库归档',
      desc: '电影剧本大纲、角色灵感与结构分析',
      icon: 'file-text',
      iconColor: '#3b82f6',
      tag: '文档',
      updatedAt: '5月10日修改',
    },
    {
      id: 'chart-jiagou',
      title: '电视剧剧情架构图',
      desc: '人物脉络图、线索逻辑与交互流程导图',
      icon: 'chart',
      iconColor: '#8b5cf6',
      tag: '思维导图',
      updatedAt: '5月12日修改',
    },
    {
      id: 'doc-bairimeng',
      title: '白日梦想家',
      desc: '影评随笔、微信读书金句划线与剧照集',
      icon: 'file-text',
      iconColor: '#3b82f6',
      tag: '笔记',
      updatedAt: '5月11日修改',
    },
    {
      id: 'doc-guide',
      title: '飞书云文档快速上手指南',
      desc: '多 Agent 协同、云盘双向同步使用手册',
      icon: 'file-text',
      iconColor: '#10b981',
      tag: '指南',
      updatedAt: '5月01日修改',
    },
  ];

  return {
    quickAccessItems,
    setActiveNodeId,
    createNewNode,
  };
};
