export type NodeType = 'doc' | 'folder' | 'chart' | 'link';

export interface NavNode {
  id: string;
  title: string;
  type: NodeType;
  icon?: string;
  parentId?: string | null;
  children?: NavNode[];
  isPinned?: boolean;
  isFavorite?: boolean;
  author?: {
    name: string;
    avatarUrl?: string;
  };
  updatedAt?: string;
  content?: string;
}

export interface BreadcrumbItem {
  id: string;
  label: string;
  type: NodeType;
  isLast: boolean;
  nodeRef: NavNode;
}
