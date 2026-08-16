import React from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { Breadcrumb } from './Breadcrumb';
import { Icon } from '@/shared/ui';
import { BreadcrumbItem } from '@/entities/navigation';

export interface HeaderProps {
  className?: string;
  isPluginActive?: boolean;
  onTogglePlugin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ className = '', isPluginActive = false, onTogglePlugin }) => {
  const {
    breadcrumbPath,
    setActiveNodeId,
    activeNode,
    activeView,
  } = useLayout();

  const [isNoticeOpen, setIsNoticeOpen] = React.useState<boolean>(false);
  const [unreadCount, setUnreadCount] = React.useState<number>(3);

  const notifications = [
    {
      id: 'n1',
      title: '《黄金圈法则》划线同步完成',
      detail: '读书笔记与划线已自动增量备份至飞书云文档',
      time: '10分钟前',
      iconName: 'file-text' as const,
      iconColor: '#3b82f6',
      badgeBg: 'rgba(59, 130, 246, 0.12)',
    },
    {
      id: 'n2',
      title: '全量云端备份已成功',
      detail: '离线缓存全量测试通过，已同步 12 个文档与架构图',
      time: '1小时前',
      iconName: 'cloud' as const,
      iconColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
    },
    {
      id: 'n3',
      title: '计划任务到期提醒',
      detail: '《电影剧本大纲评审》任务即将在今日 18:00 到期',
      time: '2小时前',
      iconName: 'clock' as const,
      iconColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
    },
  ];

  // 动态计算 Header 面包屑与左侧副标题
  const headerContent = React.useMemo(() => {
    if (activeView === 'home') {
      const dummyNode: any = { id: 'home', title: '工作台', type: 'doc' };
      return {
        breadcrumb: [
          { id: 'home-root', label: '工作台', type: 'folder', isLast: false, nodeRef: dummyNode },
          { id: 'home-main', label: '系统首页', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '全局聚合检索与工作空间已就绪',
      };
    }

    if (activeView === 'tasks') {
      const dummyNode: any = { id: 'tasks', title: '计划任务管理', type: 'doc' };
      return {
        breadcrumb: [
          { id: 'tasks-root', label: '工作空间', type: 'folder', isLast: false, nodeRef: dummyNode },
          { id: 'tasks-main', label: '计划任务管理', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '任务看板 · 当前有 3 个任务进行中',
      };
    }

    if (activeView === 'toolbox') {
      const dummyNode: any = { id: 'toolbox', title: '工具箱', type: 'doc' };
      return {
        breadcrumb: [
          { id: 'toolbox-root', label: '工作台', type: 'folder', isLast: false, nodeRef: dummyNode },
          { id: 'toolbox-main', label: '生产力工具箱', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '生产力工具汇总与效率组件库',
      };
    }

    if (activeView === 'drive') {
      const dummyNode: any = { id: 'drive', title: '云端存储', type: 'folder' };
      return {
        breadcrumb: [
          { id: 'drive-root', label: '云端存储', type: 'folder', isLast: false, nodeRef: dummyNode },
          { id: 'drive-sync', label: '同步与文件管理', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '离线优先 · 实时增量同步已就绪',
      };
    }

    if (activeView === 'kb-home') {
      const dummyNode: any = { id: 'kb-home', title: '空间首页', type: 'doc' };
      return {
        breadcrumb: [
          { id: 'kb-root', label: '知识库空间', type: 'folder', isLast: false, nodeRef: dummyNode },
          { id: 'doc-shouye', label: '空间首页', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '已经保存到云端 · 包含 5 个归档子节点',
      };
    }

    // 默认文档编辑状态
    return {
      breadcrumb: breadcrumbPath,
      subText: `已实时自动保存${activeNode?.updatedAt ? ` · ${activeNode.updatedAt}` : ''}`,
    };
  }, [activeView, activeNode, breadcrumbPath]);

  return (
    <header
      className={className}
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        userSelect: 'none',
        zIndex: 10,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'var(--transition-smooth)',
        position: 'relative',
      }}
    >
      {/* 左侧：上层面包屑导航，下层状态/副标题 */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px', minWidth: 0 }}>
        <Breadcrumb items={headerContent.breadcrumb} onSelect={nodeId => setActiveNodeId(nodeId)} />
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          <span>{headerContent.subText}</span>
        </div>
      </div>

      {/* 右侧：通知 Icon + 插件按钮 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
        {/* 文档编辑场景专属插件按钮 */}
        {activeView === 'editor' && (
          <button
            onClick={onTogglePlugin}
            title="扩展与素材同步中心"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '28px',
              padding: '0 10px',
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--primary-color)',
              backgroundColor: isPluginActive ? 'var(--primary-light)' : 'rgba(37, 99, 235, 0.05)',
              border: isPluginActive ? '1px solid var(--primary-color)' : '1px solid rgba(37, 99, 235, 0.15)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              outline: 'none',
            }}
          >
            <Icon name="plugin" size={13} color="var(--primary-color)" />
            <span>插件</span>
          </button>
        )}

        {/* 全局通知 Icon 按钮（突出目立的琥珀金底色与 Icon） */}
        <div
          onClick={() => setIsNoticeOpen(prev => !prev)}
          title="消息通知"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            border: isNoticeOpen ? '1.5px solid #f59e0b' : '1px solid rgba(245, 158, 11, 0.35)',
            backgroundColor: isNoticeOpen ? 'rgba(245, 158, 11, 0.18)' : 'rgba(245, 158, 11, 0.1)',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)',
          }}
        >
          <Icon name="bell" size={14} color="#d97706" />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '3px',
                right: '3px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                boxShadow: '0 0 0 1.5px var(--bg-card)',
              }}
            />
          )}
        </div>

        {/* 消息通知 Popover 下拉浮窗 */}
        {isNoticeOpen && (
          <div
            style={{
              position: 'absolute',
              top: '36px',
              right: 0,
              width: '320px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 100,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Popover Header */}
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-sidebar)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="bell" size={14} color="#d97706" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  消息通知 ({unreadCount})
                </span>
              </div>
              {unreadCount > 0 && (
                <span
                  onClick={() => setUnreadCount(0)}
                  style={{ fontSize: '11px', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 500 }}
                >
                  全部已读
                </span>
              )}
            </div>

            {/* 通知列表：彩致 Icon 与规范层级 */}
            <div style={{ maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {notifications.map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'var(--transition-smooth)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* 彩色 Icon 徽章底座 */}
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: item.badgeBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Icon name={item.iconName} size={15} color={item.iconColor} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.title}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', flexShrink: 0 }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
