import { useState, useMemo } from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { searchNodes } from '@/entities/navigation';

export const useGlobalHome = () => {
  const { setActiveNodeId, setActiveView, createNewNode, navigationTree } = useLayout();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 搜索全站所有节点
  const searchResults = useMemo(() => {
    return searchNodes(navigationTree, searchQuery);
  }, [searchQuery, navigationTree]);

  // 点击搜索结果跳转
  const handleSelectSearchResult = (nodeId: string) => {
    setActiveNodeId(nodeId);
    setActiveView('editor');
  };

  const recentDocs = [
    { id: 'doc-dianying', title: '电影', desc: '电影剧本大纲、角色灵感与结构分析', icon: 'file-text' as const, color: '#3b82f6', time: '5月10日修改' },
    { id: 'chart-jiagou', title: '电视剧剧情架构图', desc: '人物脉络图、线索逻辑与交互流程导图', icon: 'chart' as const, color: '#8b5cf6', time: '5月12日修改' },
    { id: 'doc-bairimeng', title: '白日梦想家', desc: '影评随笔、微信读书金句划线与剧照集', icon: 'file-text' as const, color: '#3b82f6', time: '5月11日修改' },
    { id: 'doc-guide', title: '飞书云文档快速上手指南', desc: '多 Agent 协同、云盘双向同步使用手册', icon: 'file-text' as const, color: '#10b981', time: '5月01日修改' },
  ];

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    recentDocs,
    createNewNode,
    handleSelectSearchResult,
  };
};

