import React, { useState } from 'react';
import { CreateDocButtonGroup } from '@/features';
import { useKbHome, KbItem } from '../model/useKbHome';
import { KbStatHeader } from './KbStatHeader';
import { Icon } from '@/shared/ui';
import { useLayout } from '@/entities/layout';
import { useNavigation } from '@/entities/navigation';
import { KbCardItem } from './KbCardItem';
import { KbFormModal } from './KbFormModal';
import { KbConfirmDeleteModal } from './KbConfirmDeleteModal';

export const KbHomePage: React.FC = () => {
  const { kbList, handleDeleteKb, handleUpdateKbInfo } = useKbHome();
  const { createNewNode } = useNavigation();
  const { setActiveView } = useLayout();

  const [editingKbItem, setEditingKbItem] = useState<KbItem | null>(null);
  const [deletingKbItem, setDeletingKbItem] = useState<KbItem | null>(null);
  const [hoveredKbId, setHoveredKbId] = useState<string | null>(null);

  // 新建弹窗控制
  const [isCreateKbModalOpen, setIsCreateKbModalOpen] = useState(false);

  const handleCreateKbSubmit = (title: string, desc: string) => {
    const finalTitle = title.trim() || '新建知识库';
    const newId = createNewNode('folder', finalTitle);
    if (desc.trim()) {
      handleUpdateKbInfo(newId, { description: desc.trim() });
    }
    setIsCreateKbModalOpen(false);
  };

  const handleEditKbSubmit = (title: string, desc: string) => {
    if (editingKbItem) {
      handleUpdateKbInfo(editingKbItem.id, {
        title: title.trim() || editingKbItem.title,
        description: desc.trim(),
      });
      setEditingKbItem(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingKbItem) {
      handleDeleteKb(deletingKbItem.id);
      setDeletingKbItem(null);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        height: 'calc(100vh - var(--header-height))',
        backgroundColor: 'var(--bg-app)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '0 0 32px 0',
        userSelect: 'none',
      }}
    >
      {/* 顶部 Banner 属性描述 */}
      <KbStatHeader />

      {/* 主体内容容器 */}
      <div style={{ padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* 快捷新建与看板状态 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* 引入通用 Feature 组件：新建知识库/新建文档按钮组 */}
          <CreateDocButtonGroup
            mode="kb"
            onCreated={() => setActiveView('editor')}
            onCreateKbClick={() => setIsCreateKbModalOpen(true)}
          />

          {/* 右侧小数据徽章 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Icon name="book" size={13} color="var(--primary-color)" />
              <span>知识库总数：</span>
              <strong style={{ color: 'var(--text-primary)' }}>{kbList.length} 个知识库</strong>
            </span>
            <span>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Icon name="file-text" size={13} color="#10b981" />
              <span>已同步文档：</span>
              <strong style={{ color: '#10b981' }}>128 篇</strong>
            </span>
          </div>
        </div>

        {/* 知识库列表 Grid */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
            我的知识库
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {kbList.map(item => (
              <KbCardItem
                key={item.id}
                item={item}
                isHovered={hoveredKbId === item.id}
                onMouseEnter={() => setHoveredKbId(item.id)}
                onMouseLeave={() => setHoveredKbId(null)}
                onOpenSettings={setEditingKbItem}
                onOpenDelete={setDeletingKbItem}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 新建知识库 Modal 对话框 */}
      <KbFormModal
        isOpen={isCreateKbModalOpen}
        title="创建知识库"
        submitText="创建知识库"
        onClose={() => setIsCreateKbModalOpen(false)}
        onSubmit={handleCreateKbSubmit}
      />

      {/* 编辑知识库设置 Modal 对话框 */}
      <KbFormModal
        isOpen={!!editingKbItem}
        title="知识库设置"
        submitText="保存设置"
        initialTitle={editingKbItem?.title}
        initialDesc={editingKbItem?.description}
        onClose={() => setEditingKbItem(null)}
        onSubmit={handleEditKbSubmit}
      />

      {/* 删除确认 Modal 对话框 */}
      <KbConfirmDeleteModal
        isOpen={!!deletingKbItem}
        title={deletingKbItem?.title || ''}
        onClose={() => setDeletingKbItem(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
