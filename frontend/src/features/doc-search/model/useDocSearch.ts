import { useState, useMemo } from 'react';
import { useNavigation, searchNodes } from '@/entities/navigation';


export const useDocSearch = (onSelect?: (nodeId: string) => void) => {
  const { setActiveNodeId, navigationTree } = useNavigation();
  const [query, setQuery] = useState<string>('');

  const searchResults = useMemo(() => {
    return searchNodes(navigationTree, query);
  }, [query, navigationTree]);

  const handleSelectResult = (nodeId: string) => {
    setActiveNodeId(nodeId);
    setQuery('');
    if (onSelect) onSelect(nodeId);
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

