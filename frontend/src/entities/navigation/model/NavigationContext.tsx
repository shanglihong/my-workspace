import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { NavNode, BreadcrumbItem } from './types';
import { calculateBreadcrumbPath, findNodePath, updateNodeInTree, removeNodeFromTree, addChildToNodeInTree } from './navigationModel';

interface NavigationContextValue {
  navigationTree: NavNode[];
  setNavigationTree: React.Dispatch<React.SetStateAction<NavNode[]>>;
  activeNodeId: string;
  setActiveNodeId: (id: string) => void;
  activeNode: NavNode | null;
  breadcrumbPath: BreadcrumbItem[];
  createNewNode: (type: 'doc' | 'chart' | 'folder', title?: string) => string;
  createChildNode: (parentId: string, type: 'doc' | 'chart' | 'folder', title?: string) => string;
  deleteNode: (nodeId: string) => void;
  togglePinNode: (nodeId: string) => void;
  updateNodeContent: (nodeId: string, content: string) => void;
  updateNodeInfo: (nodeId: string, info: { title?: string; description?: string }) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export interface NavigationProviderProps {
  children: React.ReactNode;
  initialTree?: NavNode[];
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children, initialTree = [] }) => {
  const [navigationTree, setNavigationTree] = useState<NavNode[]>(initialTree);

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

  const createNewNode = useCallback((type: 'doc' | 'chart' | 'folder', title?: string): string => {
    const newId = `${type}-${Date.now()}`;
    const newNodeName =
      title || (type === 'folder' ? '新建知识库' : type === 'doc' ? '无标题文档' : '新建流程图');
    const newNode: NavNode = {
      id: newId,
      title: newNodeName,
      type: type,
      author: { name: '当前用户' },
      updatedAt: '刚刚修改',
      content: type === 'doc' ? `# ${newNodeName}\n\n开始撰写内容...` : '',
      children: type === 'folder' ? [] : undefined,
    };

    setNavigationTree(prev => [newNode, ...prev]);
    setActiveNodeId(newId);
    return newId;
  }, []);

  const createChildNode = useCallback((parentId: string, type: 'doc' | 'chart' | 'folder', title?: string): string => {
    const newId = `${type}-${Date.now()}`;
    const newNodeName =
      title || (type === 'folder' ? '新建分类' : type === 'doc' ? '无标题文档' : '新建流程图');
    const newNode: NavNode = {
      id: newId,
      title: newNodeName,
      type: type,
      author: { name: '当前用户' },
      updatedAt: '刚刚修改',
      content: type === 'doc' ? `# ${newNodeName}\n\n开始撰写内容...` : '',
      children: type === 'folder' ? [] : undefined,
    };

    setNavigationTree(prev => addChildToNodeInTree(prev, parentId, newNode));
    setActiveNodeId(newId);
    return newId;
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNavigationTree(prev => removeNodeFromTree(prev, nodeId));
    setActiveNodeId(prev => (prev === nodeId ? '' : prev));
  }, []);

  const togglePinNode = useCallback((nodeId: string) => {
    setNavigationTree(prev =>
      updateNodeInTree(prev, nodeId, node => ({
        ...node,
        isPinned: !node.isPinned,
      }))
    );
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

  const updateNodeInfo = useCallback((nodeId: string, info: { title?: string; description?: string }) => {
    setNavigationTree(prev =>
      updateNodeInTree(prev, nodeId, node => ({
        ...node,
        ...info,
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
      createChildNode,
      deleteNode,
      togglePinNode,
      updateNodeContent,
      updateNodeInfo,
    }),
    [
      navigationTree,
      activeNodeId,
      activeNode,
      breadcrumbPath,
      createNewNode,
      createChildNode,
      deleteNode,
      togglePinNode,
      updateNodeContent,
      updateNodeInfo,
    ]
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
