import React, { useState, useRef, useEffect } from 'react';
import { NavNode, useNavigation } from '@/entities/navigation';
import { useLayout } from '@/entities/layout';
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
  const { createChildNode, deleteNode } = useNavigation();
  const { setActiveView } = useLayout();
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'kb-yingshi': true,
  });
  const [activeMenuNodeId, setActiveMenuNodeId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuNodeId(null);
        setMenuPosition(null);
      }
    };
    const handleScroll = () => {
      if (activeMenuNodeId) {
        setActiveMenuNodeId(null);
        setMenuPosition(null);
      }
    };

    if (activeMenuNodeId) {
      document.addEventListener('mousedown', handleClose);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('mousedown', handleClose);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [activeMenuNodeId]);

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

  const findNodeById = (list: NavNode[], id: string): NavNode | null => {
    for (const item of list) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findNodeById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeMenuNode = activeMenuNodeId ? findNodeById(nodes, activeMenuNodeId) : null;

  const renderNode = (node: NavNode, depth = 0) => {
    if (node.id === 'doc-shouye') return null;

    const isExpanded = filterQuery.trim() ? true : !!expandedIds[node.id];
    const isActive = activeView === 'editor' && node.id === activeNodeId;
    const hasChildren = node.children && node.children.length > 0;
    const isMenuOpen = activeMenuNodeId === node.id;
    const isHovered = hoveredNodeId === node.id;

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

          {hasChildren && (
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isExpanded ? '1fr' : '0fr',
                opacity: isExpanded ? 1 : 0,
                transition: 'grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {node.children!.map(child => renderNode(child, depth + 1))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={node.id} style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          onClick={() => onSelectNode(node)}
          onMouseEnter={() => setHoveredNodeId(node.id)}
          onMouseLeave={() => setHoveredNodeId(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: `6px 8px 6px ${12 + depth * 14}px`,
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
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Icon name="chevron-right" size={12} />
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
              marginRight: '4px',
            }}
          >
            {node.title}
          </span>

          {/* 右侧 Icon: 预留固定尺寸占位，使用 opacity 平滑显示，彻底消除悬停导致的布局抖动 */}
          <div
            onClick={e => {
              e.stopPropagation();
              if (isMenuOpen) {
                setActiveMenuNodeId(null);
                setMenuPosition(null);
              } else {
                const rect = e.currentTarget.getBoundingClientRect();
                setMenuPosition({ top: rect.bottom + 4, left: Math.max(10, rect.right - 140) });
                setActiveMenuNodeId(node.id);
              }
            }}
            title="更多操作"
            style={{
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: 'var(--radius-sm)',
              color: isMenuOpen ? 'var(--primary-color)' : 'var(--text-muted)',
              backgroundColor: isMenuOpen ? 'var(--bg-hover)' : 'transparent',
              opacity: isHovered || isMenuOpen ? 1 : 0,
              visibility: isHovered || isMenuOpen ? 'visible' : 'hidden',
              transition: 'opacity 0.2s ease, background-color 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={e => {
              if (!isMenuOpen) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon name="more-horizontal" size={14} />
          </div>
        </div>

        {/* 子节点列表：纯 CSS Grid 贝塞尔平滑伸展展开与折叠收缩 */}
        {hasChildren && (
          <div
            style={{
              display: 'grid',
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
              opacity: isExpanded ? 1 : 0,
              transition: 'grid-template-rows 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
            }}
          >
            <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              {node.children!.map(child => renderNode(child, depth + 1))}
            </div>
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {displayNodes.map(node => renderNode(node))}

      {/* 全局 position: fixed 下拉菜单组件，完美超越所有 overflow: hidden 容器遮挡 */}
      {activeMenuNodeId && activeMenuNode && menuPosition && (
        <div
          ref={menuRef}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            width: '140px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg, 0 6px 20px rgba(0, 0, 0, 0.18))',
            padding: '4px',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            fontSize: '12px',
            fontWeight: 400,
          }}
        >
          <div
            onClick={() => {
              createChildNode(activeMenuNode.id, 'doc');
              setExpandedIds(prev => ({ ...prev, [activeMenuNode.id]: true }));
              setActiveMenuNodeId(null);
              setMenuPosition(null);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 8px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <Icon name="plus" size={13} color="var(--primary-color)" />
            <span>新建子页面</span>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '2px 0' }} />

          {activeMenuNode.type === 'folder' ? (
            <div
              onClick={() => {
                setActiveView('kb-home');
                setActiveMenuNodeId(null);
                setMenuPosition(null);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Icon name="settings" size={13} color="var(--primary-color)" />
              <span>知识库设置</span>
            </div>
          ) : (
            <div
              onClick={() => {
                deleteNode(activeMenuNode.id);
                setActiveMenuNodeId(null);
                setMenuPosition(null);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 8px',
                borderRadius: 'var(--radius-sm)',
                color: '#ef4444',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Icon name="trash" size={13} color="#ef4444" />
              <span>删除页面</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
