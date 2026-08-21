import { useNavigation, NavNode } from '@/entities/navigation';
import { useLayout } from '@/entities/layout';

export interface KbItem {
  id: string;
  title: string;
  description: string;
  nodeRef: NavNode;
}

export const useKbHome = () => {
  const { navigationTree, setActiveNodeId, deleteNode, updateNodeInfo } = useNavigation();
  const { setActiveView } = useLayout();

  const kbList: KbItem[] = navigationTree
    .filter(node => node.type === 'folder')
    .map(node => ({
      id: node.id,
      title: node.title,
      description: node.description || '暂无详细描述，支持收纳与管理各类文档与关联资源。',
      nodeRef: node,
    }));

  const handleOpenKb = (kbNode: NavNode) => {
    if (kbNode.children && kbNode.children.length > 0) {
      setActiveNodeId(kbNode.children[0].id);
      setActiveView('editor');
    } else {
      setActiveNodeId(kbNode.id);
    }
  };

  const handleDeleteKb = (kbId: string) => {
    deleteNode(kbId);
  };

  const handleUpdateKbInfo = (kbId: string, info: { title?: string; description?: string }) => {
    updateNodeInfo(kbId, info);
  };

  return {
    kbList,
    setActiveNodeId,
    handleOpenKb,
    handleDeleteKb,
    handleUpdateKbInfo,
  };
};
