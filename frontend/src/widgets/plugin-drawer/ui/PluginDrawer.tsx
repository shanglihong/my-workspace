import React, { useState } from 'react';
import { Icon } from '@/shared/ui';
import { useLayout } from '@/app/providers/LayoutProvider';

export interface PluginDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PluginDrawer: React.FC<PluginDrawerProps> = ({ isOpen, onClose }) => {
  const { activeNode, setNavigationTree } = useLayout();
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'apps'>('import');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // 模拟导入微信读书划线到当前文档
  const handleImportWeRead = () => {
    setImportStatus('正在同步微信读书划线...');
    setTimeout(() => {
      if (activeNode) {
        const weReadClipping = `\n\n> 📖 **微信读书划线归档（同步于刚刚）**\n> “思考‘为什么’是所有创新与领导力的核心来源。人们买的不是你做的事，而是你做事的信念。”\n> —— 《黄金圈法则》第 3 章划线批注\n`;
        
        setNavigationTree(prevTree => {
          const updateContent = (nodes: any[]): any[] => {
            return nodes.map(node => {
              if (node.id === activeNode.id) {
                return { ...node, content: (node.content || '') + weReadClipping, updatedAt: '刚刚同步' };
              }
              if (node.children) {
                return { ...node, children: updateContent(node.children) };
              }
              return node;
            });
          };
          return updateContent(prevTree);
        });
      }
      setImportStatus('已成功导入 1 条《黄金圈法则》微信读书划线至当前文档！');
      setTimeout(() => setImportStatus(null), 3500);
    }, 600);
  };

  // 模拟导入飞书云文档大纲素材
  const handleImportFeishu = () => {
    setImportStatus('正在拉取飞书云文档结构...');
    setTimeout(() => {
      if (activeNode) {
        const feishuStructure = `\n\n### ⚡ 飞书云文档同步素材\n- [x] 完成架构图评估\n- [ ] 协同编辑节点同步\n- [ ] 导出 PDF/Markdown\n`;
        
        setNavigationTree(prevTree => {
          const updateContent = (nodes: any[]): any[] => {
            return nodes.map(node => {
              if (node.id === activeNode.id) {
                return { ...node, content: (node.content || '') + feishuStructure, updatedAt: '刚刚同步' };
              }
              if (node.children) {
                return { ...node, children: updateContent(node.children) };
              }
              return node;
            });
          };
          return updateContent(prevTree);
        });
      }
      setImportStatus('已成功导入飞书云文档大纲模板！');
      setTimeout(() => setImportStatus(null), 3500);
    }, 600);
  };

  // 导出 Markdown
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
    setTimeout(() => setExportStatus(null), 3000);
  };

  // 导出为飞书
  const handleExportFeishu = () => {
    setExportStatus('同步中...');
    setTimeout(() => {
      setExportStatus('已成功将当前文档导出并同步至飞书云文档！');
      setTimeout(() => setExportStatus(null), 3500);
    }, 700);
  };

  return (
    <aside
      style={{
        width: '340px',
        height: '100vh',
        backgroundColor: 'var(--bg-card)',
        borderLeft: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-lg)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        userSelect: 'none',
      }}
    >
      {/* 头部标题与关闭按钮 */}
      <div
        style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-color)',
            }}
          >
            <Icon name="plugin" size={14} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            插件与素材同步中心
          </span>
        </div>

        <div
          onClick={onClose}
          title="关闭侧边栏"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '26px',
            height: '26px',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            transition: 'var(--transition-smooth)',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <Icon name="close" size={14} />
        </div>
      </div>

      {/* 选项卡 Tab Header */}
      <div
        style={{
          display: 'flex',
          padding: '8px 12px',
          gap: '6px',
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-sidebar)',
        }}
      >
        {[
          { id: 'import', label: '素材导入', icon: 'import' },
          { id: 'export', label: '笔记导出', icon: 'export' },
          { id: 'apps', label: '已连渠道', icon: 'plugin' },
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px 0',
                fontSize: '12px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name={tab.icon as any} size={13} color={isActive ? 'var(--primary-color)' : 'var(--text-muted)'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 消息提示通知 */}
      {(importStatus || exportStatus) && (
        <div
          style={{
            padding: '8px 14px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary-color)',
            fontSize: '12px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <Icon name="check" size={14} color="var(--primary-color)" />
          <span>{importStatus || exportStatus}</span>
        </div>
      )}

      {/* 选项卡 1：素材导入 */}
      {activeTab === 'import' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            从外部阅读平台与云文档一键导入划线批注、笔记与知识图谱：
          </div>

          {/* 微信读书渠道卡片 */}
          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-sidebar)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#07c160', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                  微
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>微信读书</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>已绑定账号 · 128 条书籍划线</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(7, 193, 96, 0.15)', color: '#07c160', fontWeight: 500 }}>
                已连接
              </span>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              近一次阅读《黄金圈法则》包含 1 条最新划线与书评。
            </div>

            <button
              onClick={handleImportWeRead}
              style={{
                width: '100%',
                padding: '8px 0',
                fontSize: '12px',
                fontWeight: 500,
                color: '#ffffff',
                backgroundColor: 'var(--primary-color)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name="import" size={14} color="#ffffff" />
              <span>导入《黄金圈法则》划线到当前文档</span>
            </button>
          </div>

          {/* 飞书云文档渠道卡片 */}
          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-sidebar)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#3370ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700 }}>
                  飞
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>飞书云文档</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>知识库连通器</div>
                </div>
              </div>
              <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'rgba(51, 112, 255, 0.15)', color: '#3370ff', fontWeight: 500 }}>
                同步就绪
              </span>
            </div>

            <button
              onClick={handleImportFeishu}
              style={{
                width: '100%',
                padding: '7px 0',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name="import" size={14} color="var(--text-secondary)" />
              <span>导入飞书大纲与思维导图</span>
            </button>
          </div>

          {/* Obsidian / Notion 本地 Markdown 导入 */}
          <div
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontSize: '12px',
            }}
          >
            <Icon name="plus" size={14} />
            <span>导入本地 Markdown / Notion 导出的 .md 文件</span>
          </div>
        </div>
      )}

      {/* 选项卡 2：笔记导出 */}
      {activeTab === 'export' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            将当前编辑的《{activeNode?.title || '未命名文档'}》一键导出或同步至各大平台：
          </div>

          {/* 导出为飞书 */}
          <div
            onClick={handleExportFeishu}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-sidebar)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--bg-sidebar)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="export" size={16} color="#3370ff" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>导出并同步至飞书云文档</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>同步保持格式与图片</div>
              </div>
            </div>
            <Icon name="chevron-right" size={14} color="var(--text-muted)" />
          </div>

          {/* 导出为 Markdown */}
          <div
            onClick={handleExportMarkdown}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-sidebar)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--bg-sidebar)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="download" size={16} color="var(--primary-color)" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>导出为 Markdown (.md)</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>保存完整标准 Markdown 格式</div>
              </div>
            </div>
            <Icon name="chevron-right" size={14} color="var(--text-muted)" />
          </div>
        </div>
      )}

      {/* 选项卡 3：已连渠道与扩展 */}
      {activeTab === 'apps' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>已绑定的第三方笔记与阅读服务：</div>
          
          <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>微信读书同步助手</span>
            <span style={{ fontSize: '11px', color: '#07c160' }}>运行中</span>
          </div>

          <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>飞书 API 连通器</span>
            <span style={{ fontSize: '11px', color: '#3370ff' }}>已授权</span>
          </div>
        </div>
      )}
    </aside>
  );
};
