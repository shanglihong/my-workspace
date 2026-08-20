import React, { useState } from 'react';
import { NavNode } from '@/entities/navigation';
import { Icon, IconName } from '@/shared/ui';

export interface KbTreeNavigationProps {
  nodes: NavNode[];
  activeNodeId: string;
  activeView?: string;
  onSelectNode: (node: NavNode) => void;
  isCollapsedSidebar?: boolean;
  filterQuery?: string;
}

const filterTreeNodes = (nodesList: NavNode[], query: string): NavNode[] => {
  if (!query.trim()) return nodesList;
  const lowerQuery = query.toLowerCase();

  return nodesList
    .map(node => {
      const titleMatches = node.title.toLowerCase().includes(lowerQuery);
      const filteredChildren = node.children ? filterTreeNodes(node.children, query) : [];

      if (titleMatches || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children,
        };
      }
      return null;
    })
    .filter(Boolean) as NavNode[];
};

export const KbTreeNavigation: React.FC<KbTreeNavigationProps> = ({
  nodes,
  activeNodeId,
  activeView = 'editor',
  onSelectNode,
  isCollapsedSidebar = false,
  filterQuery = '',
}) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'kb-yingshi': true,
  });

  const displayNodes = React.useMemo(() => {
    return filterTreeNodes(nodes, filterQuery);
  }, [nodes, filterQuery]);

  const toggleExpand = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setExpandedIds(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const getNodeIcon = (type: NavNode['type']): IconName => {
    switch (type) {
      case 'folder':
        return 'folder';
      case 'chart':
        return 'chart';
      case 'doc':
      default:
        return 'file-text';
    }
  };

  const getNodeIconColor = (type: NavNode['type']): string => {
    switch (type) {
      case 'folder':
        return '#f59e0b';
      case 'chart':
        return '#8b5cf6';
      case 'doc':
      default:
        return '#3b82f6';
    }
  };

  const renderNode = (node: NavNode, depth = 0) => {
    if (node.id === 'doc-shouye') return null;

    const isExpanded = !!expandedIds[node.id];
    const isActive = activeView === 'editor' && node.id === activeNodeId;
    const hasChildren = node.children && node.children.length > 0;

    if (isCollapsedSidebar) {
      return (
        <div key={node.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            onClick={() => onSelectNode(node)}
            title={node.title}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
              transition: 'var(--transition-smooth)',
              margin: '2px 0',
              position: 'relative',
            }}
          >
            <Icon name={getNodeIcon(node.type)} size={16} color={getNodeIconColor(node.type)} />
          </div>

          {hasChildren && isExpanded && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              {node.children!.map(child => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={node.id} style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          onClick={() => onSelectNode(node)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: `6px 12px 6px ${12 + depth * 14}px`,
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: '13px',
            color: isActive ? 'var(--primary-color)' : 'var(--text-primary)',
            backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
            fontWeight: isActive ? 600 : 400,
            transition: 'var(--transition-smooth)',
            userSelect: 'none',
            margin: '1px 0',
          }}
        >
          {hasChildren ? (
            <span
              onClick={e => toggleExpand(e, node.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px',
                marginRight: '4px',
                color: 'var(--text-muted)',
              }}
            >
              <Icon name={isExpanded ? 'chevron-down' : 'chevron-right'} size={12} />
            </span>
          ) : (
            <span style={{ width: '20px' }} />
          )}

          <span style={{ marginRight: '8px', opacity: 1, display: 'inline-flex' }}>
            <Icon name={getNodeIcon(node.type)} size={15} color={getNodeIconColor(node.type)} />
          </span>

          <span
            style={{
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {node.title}
          </span>

          {node.isPinned && (
            <span style={{ marginLeft: 'auto', opacity: 0.4, display: 'inline-flex' }}>
              <Icon name="pin" size={12} />
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (displayNodes.length === 0 && filterQuery) {
    return (
      <div style={{ padding: '16px 12px', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
        未匹配到相关文档
      </div>
    );
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>{displayNodes.map(node => renderNode(node))}</div>;
};
