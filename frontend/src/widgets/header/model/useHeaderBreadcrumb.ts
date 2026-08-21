import { useMemo } from 'react';
import { useLayout } from '@/entities/layout';
import { BreadcrumbItem, NavNode } from '@/entities/navigation';

export const useHeaderBreadcrumb = () => {
  const { activeView, activeNode, breadcrumbPath } = useLayout();

  const headerContent = useMemo(() => {
    // 通用 Root 节点：统一命名为 "工作台"
    const rootItem: BreadcrumbItem = {
      id: 'root-home',
      label: '工作台',
      type: 'folder',
      isLast: false,
      nodeRef: { id: 'home', title: '工作台', type: 'doc' },
    };

    if (activeView === 'home') {
      const dummyNode: NavNode = { id: 'home', title: '系统首页', type: 'doc' };
      return {
        breadcrumb: [
          rootItem,
          { id: 'home-main', label: '系统首页', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '全局聚合检索与工作空间已就绪',
      };
    }

    if (activeView === 'settings') {
      const dummyNode: NavNode = { id: 'settings', title: '系统设置', type: 'doc' };
      return {
        breadcrumb: [
          rootItem,
          { id: 'settings-main', label: '系统设置', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '模型 API Key 密钥配置与系统偏好',
      };
    }

    if (activeView === 'tasks') {
      const dummyNode: NavNode = { id: 'tasks', title: '计划任务管理', type: 'doc' };
      return {
        breadcrumb: [
          rootItem,
          { id: 'tasks-main', label: '计划任务管理', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '多维日程日历与清单视图已就绪',
      };
    }

    if (activeView === 'toolbox') {
      const dummyNode: NavNode = { id: 'toolbox', title: '工具箱', type: 'doc' };
      return {
        breadcrumb: [
          rootItem,
          { id: 'toolbox-main', label: '生产力工具箱', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '生产力工具汇总与效率组件库',
      };
    }

    if (activeView === 'drive') {
      const dummyNode: NavNode = { id: 'drive', title: '云端存储', type: 'folder' };
      return {
        breadcrumb: [
          rootItem,
          { id: 'drive-sync', label: '同步与文件管理', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '离线优先 · 实时增量同步已就绪',
      };
    }

    if (activeView === 'kb-home') {
      const dummyNode: NavNode = { id: 'kb-home', title: '空间首页', type: 'doc' };
      return {
        breadcrumb: [
          rootItem,
          { id: 'doc-shouye', label: '空间首页', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '已经保存到云端 · 包含 5 个归档子节点',
      };
    }

    // 默认文档编辑状态：在面包屑最前置统一加入 "工作台" 根节点
    const fullEditorBreadcrumb: BreadcrumbItem[] = [
      rootItem,
      ...breadcrumbPath.map(b => ({ ...b, isLast: false })),
    ];
    if (fullEditorBreadcrumb.length > 1) {
      fullEditorBreadcrumb[fullEditorBreadcrumb.length - 1].isLast = true;
    }

    return {
      breadcrumb: fullEditorBreadcrumb,
      subText: `已实时自动保存${activeNode?.updatedAt ? ` · ${activeNode.updatedAt}` : ''}`,
    };
  }, [activeView, activeNode, breadcrumbPath]);

  return { headerContent, activeView };
};
