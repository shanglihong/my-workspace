import { useMemo } from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { BreadcrumbItem, NavNode } from '@/entities/navigation';

export const useHeaderBreadcrumb = () => {
  const { activeView, activeNode, breadcrumbPath } = useLayout();

  const headerContent = useMemo(() => {
    if (activeView === 'home') {
      const dummyNode: NavNode = { id: 'home', title: '工作台', type: 'doc' };
      return {
        breadcrumb: [
          { id: 'home-root', label: '工作台', type: 'folder', isLast: false, nodeRef: dummyNode },
          { id: 'home-main', label: '系统首页', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '全局聚合检索与工作空间已就绪',
      };
    }

    if (activeView === 'tasks') {
      const dummyNode: NavNode = { id: 'tasks', title: '计划任务管理', type: 'doc' };
      return {
        breadcrumb: [
          { id: 'tasks-root', label: '工作空间', type: 'folder', isLast: false, nodeRef: dummyNode },
          { id: 'tasks-main', label: '计划任务管理', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '任务看板 · 当前有 3 个任务进行中',
      };
    }

    if (activeView === 'toolbox') {
      const dummyNode: NavNode = { id: 'toolbox', title: '工具箱', type: 'doc' };
      return {
        breadcrumb: [
          { id: 'toolbox-root', label: '工作台', type: 'folder', isLast: false, nodeRef: dummyNode },
          { id: 'toolbox-main', label: '生产力工具箱', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '生产力工具汇总与效率组件库',
      };
    }

    if (activeView === 'drive') {
      const dummyNode: NavNode = { id: 'drive', title: '云端存储', type: 'folder' };
      return {
        breadcrumb: [
          { id: 'drive-root', label: '云端存储', type: 'folder', isLast: false, nodeRef: dummyNode },
          { id: 'drive-sync', label: '同步与文件管理', type: 'doc', isLast: true, nodeRef: dummyNode },
        ] as BreadcrumbItem[],
        subText: '离线优先 · 实时增量同步已就绪',
      };
    }

    if (activeView === 'kb-home') {
      const dummyNode: NavNode = { id: 'kb-home', title: '空间首页', type: 'doc' };
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

  return { headerContent, activeView };
};

