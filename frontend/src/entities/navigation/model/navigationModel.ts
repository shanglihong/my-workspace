import { NavNode, BreadcrumbItem } from './types';

/**
 * 递归查找具有指定 ID 的节点及其祖先节点链路
 */
export function findNodePath(nodes: NavNode[], targetId: string, currentPath: NavNode[] = []): NavNode[] | null {
  for (const node of nodes) {
    const newPath = [...currentPath, node];
    if (node.id === targetId) {
      return newPath;
    }
    if (node.children && node.children.length > 0) {
      const result = findNodePath(node.children, targetId, newPath);
      if (result) return result;
    }
  }
  return null;
}

/**
 * 遍历查找树中满足关键字搜索的节点列表
 */
export function searchNodes(nodes: NavNode[], query: string): NavNode[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();

  const results: NavNode[] = [];
  const searchRecursive = (list: NavNode[]) => {
    list.forEach(node => {
      if (node.title && node.title.toLowerCase().includes(lowerQuery)) {
        results.push(node);
      }
      if (node.children && node.children.length > 0) {
        searchRecursive(node.children);
      }
    });
  };

  searchRecursive(nodes);
  return results;
}

/**
 * 递归在树结构中更新指定 ID 节点的函数
 */
export function updateNodeInTree(
  nodes: NavNode[],
  targetId: string,
  updater: (node: NavNode) => NavNode
): NavNode[] {
  return nodes.map(node => {
    if (node.id === targetId) {
      return updater(node);
    }
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateNodeInTree(node.children, targetId, updater),
      };
    }
    return node;
  });
}

/**
 * 计算用于顶部 Header 展示的完整面包屑项列表
 */
export function calculateBreadcrumbPath(nodes: NavNode[], activeNodeId: string): BreadcrumbItem[] {
  const pathNodes = findNodePath(nodes, activeNodeId);
  if (!pathNodes || pathNodes.length === 0) {
    return [
      {
        id: 'root',
        label: '工作空间',
        type: 'folder',
        isLast: true,
        nodeRef: { id: 'root', title: '工作空间', type: 'folder' },
      },
    ];
  }

  return pathNodes.map((node, index) => ({
    id: node.id,
    label: node.title,
    type: node.type,
    isLast: index === pathNodes.length - 1,
    nodeRef: node,
  }));
}

