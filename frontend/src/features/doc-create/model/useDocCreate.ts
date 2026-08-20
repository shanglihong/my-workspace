import { useNavigation } from '@/entities/navigation';

export const useDocCreate = (onCreated?: () => void) => {
  const { createNewNode } = useNavigation();

  const handleCreateDoc = () => {
    createNewNode('doc');
    if (onCreated) onCreated();
  };

  const handleCreateChart = () => {
    createNewNode('chart');
    if (onCreated) onCreated();
  };

  return {
    handleCreateDoc,
    handleCreateChart,
  };
};

