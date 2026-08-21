import { useNavigation } from '@/entities/navigation';

export const useDocCreate = (onCreated?: () => void, onKbCreated?: () => void) => {
  const { createNewNode } = useNavigation();

  const handleCreateDoc = () => {
    createNewNode('doc');
    if (onCreated) onCreated();
  };

  const handleCreateChart = () => {
    createNewNode('chart');
    if (onCreated) onCreated();
  };

  const handleCreateKb = () => {
    createNewNode('folder', '新建知识库');
    if (onKbCreated) {
      onKbCreated();
    }
  };

  return {
    handleCreateDoc,
    handleCreateChart,
    handleCreateKb,
  };
};

