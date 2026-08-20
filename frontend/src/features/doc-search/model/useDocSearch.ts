import { useState, useMemo } from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { NavNode } from '@/entities/navigation';

export const useDocSearch = () => {
  const { setActiveNodeId, setActiveView, navigationTree } = useLayout();
  const [query, setQuery] = useState<string>('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();

    const results: NavNode[] = [];
    const searchRecursive = (nodes: NavNode[]) => {
      nodes.forEach(node => {
        if (node.title && node.title.toLowerCase().includes(lowerQuery)) {
          results.push(node);
        }
        if (node.children) {
          searchRecursive(node.children);
        }
      });
    };

    searchRecursive(navigationTree);
    return results;
  }, [query, navigationTree]);

  const handleSelectResult = (nodeId: string) => {
    setActiveNodeId(nodeId);
    setActiveView('editor');
    setQuery('');
  };

  const clearQuery = () => setQuery('');

  return {
    query,
    setQuery,
    clearQuery,
    searchResults,
    handleSelectResult,
  };
};
