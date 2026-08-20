import { useLayout } from '@/app/providers/LayoutProvider';

export const useDocCreate = () => {
  const { createNewNode, setActiveView } = useLayout();

  const handleCreateDoc = () => {
    createNewNode('doc');
    setActiveView('editor');
  };

  const handleCreateChart = () => {
    createNewNode('chart');
    setActiveView('editor');
  };

  return {
    handleCreateDoc,
    handleCreateChart,
  };
};
