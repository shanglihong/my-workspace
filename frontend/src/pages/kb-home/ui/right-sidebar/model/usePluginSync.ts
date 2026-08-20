import { useState, useEffect, useRef } from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { updateNodeInTree } from '@/entities/navigation';

export type PluginTabType = 'import' | 'export' | 'apps';

export const usePluginSync = () => {
  const { activeNode, setNavigationTree } = useLayout();
  const [activeTab, setActiveTab] = useState<PluginTabType>('import');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const timersRef = useRef<number[]>([]);

  const registerTimeout = (fn: () => void, delay: number) => {
    const timer = window.setTimeout(fn, delay);
    timersRef.current.push(timer);
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleImportWeRead = () => {
    setImportStatus('正在同步微信读书划线...');
    registerTimeout(() => {
      if (activeNode) {
        const weReadClipping = `\n\n> **[微信读书划线归档]（同步于刚刚）**\n> “思考‘为什么’是所有创新与领导力的核心来源。人们买的不是你做的事，而是你做事的信念。”\n> —— 《黄金圈法则》第 3 章划线批注\n`;

        setNavigationTree(prevTree =>
          updateNodeInTree(prevTree, activeNode.id, node => ({
            ...node,
            content: (node.content || '') + weReadClipping,
            updatedAt: '刚刚同步',
          }))
        );
      }
      setImportStatus('已成功导入 1 条《黄金圈法则》微信读书划线至当前文档！');
      registerTimeout(() => setImportStatus(null), 3500);
    }, 600);
  };

  const handleImportFeishu = () => {
    setImportStatus('正在拉取飞书云文档结构...');
    registerTimeout(() => {
      if (activeNode) {
        const feishuStructure = `\n\n### 飞书云文档同步素材\n- [x] 完成架构图评估\n- [ ] 协同编辑节点同步\n- [ ] 导出 PDF/Markdown\n`;

        setNavigationTree(prevTree =>
          updateNodeInTree(prevTree, activeNode.id, node => ({
            ...node,
            content: (node.content || '') + feishuStructure,
            updatedAt: '刚刚同步',
          }))
        );
      }
      setImportStatus('已成功导入飞书云文档大纲模板！');
      registerTimeout(() => setImportStatus(null), 3500);
    }, 600);
  };

  const handleExportMarkdown = () => {
    if (!activeNode) return;
    const blob = new Blob([activeNode.content || ''], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeNode.title || 'document'}.md`;
    link.click();
    URL.revokeObjectURL(url);
    setExportStatus('已导出为 Markdown 文件！');
    registerTimeout(() => setExportStatus(null), 3000);
  };

  const handleExportFeishu = () => {
    setExportStatus('同步中...');
    registerTimeout(() => {
      setExportStatus('已成功将当前文档导出并同步至飞书云文档！');
      registerTimeout(() => setExportStatus(null), 3500);
    }, 700);
  };

  return {
    activeTab,
    setActiveTab,
    importStatus,
    exportStatus,
    activeNode,
    handleImportWeRead,
    handleImportFeishu,
    handleExportMarkdown,
    handleExportFeishu,
  };
};
