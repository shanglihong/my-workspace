import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { NavNode, BreadcrumbItem } from './types';
import { calculateBreadcrumbPath, findNodePath, updateNodeInTree } from './navigationModel';
import { mockNavigationTree } from '@/mock';

interface NavigationContextValue {
  navigationTree: NavNode[];
  setNavigationTree: React.Dispatch<React.SetStateAction<NavNode[]>>;
  activeNodeId: string;
  setActiveNodeId: (id: string) => void;
  activeNode: NavNode | null;
  breadcrumbPath: BreadcrumbItem[];
  createNewNode: (type: 'doc' | 'chart', title?: string) => string;
  updateNodeContent: (nodeId: string, content: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navigationTree, setNavigationTree] = useState<NavNode[]>(mockNavigationTree);
  // 避免在没有选中的情况下默认选中第一个节点，初始化设为空字符串
  const [activeNodeId, setActiveNodeId] = useState<string>('');

  const breadcrumbPath = useMemo(() => {
    return calculateBreadcrumbPath(navigationTree, activeNodeId);
  }, [navigationTree, activeNodeId]);

  const activeNode = useMemo(() => {
    if (!activeNodeId) return null;
    const path = findNodePath(navigationTree, activeNodeId);
    return path ? path[path.length - 1] : null;
  }, [navigationTree, activeNodeId]);

  const createNewNode = useCallback((type: 'doc' | 'chart', title?: string): string => {
    const newId = `${type}-${Date.now()}`;
    const newNodeName = title || (type === 'doc' ? '无标题文档' : '新建流程图');
    const newNode: NavNode = {
      id: newId,
      title: newNodeName,
      type: type,
      author: { name: '当前用户' },
      updatedAt: '刚刚修改',
      content: type === 'doc' ? `# ${newNodeName}\n\n开始撰写内容...` : '',
    };

    setNavigationTree(prev => [newNode, ...prev]);
    setActiveNodeId(newId);
    return newId;
  }, []);

  const updateNodeContent = useCallback((nodeId: string, content: string) => {
    setNavigationTree(prev =>
      updateNodeInTree(prev, nodeId, node => ({
        ...node,
        content,
        updatedAt: '刚刚修改',
      }))
    );
  }, []);

  const value = useMemo(
    () => ({
      navigationTree,
      setNavigationTree,
      activeNodeId,
      setActiveNodeId,
      activeNode,
      breadcrumbPath,
      createNewNode,
      updateNodeContent,
    }),
    [navigationTree, activeNodeId, activeNode, breadcrumbPath, createNewNode, updateNodeContent]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation 必须在 NavigationProvider 内部使用');
  }
  return context;
}
