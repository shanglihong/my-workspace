import React, { useState, useEffect } from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { DocEditor } from 'my-doc-editor';
import 'my-doc-editor/dist/my-doc-editor.css';

export interface KbEditorViewportProps {
  className?: string;
}

export const KbEditorViewport: React.FC<KbEditorViewportProps> = ({ className = '' }) => {
  const { activeNode, theme } = useLayout();
  const [docContent, setDocContent] = useState<string>(activeNode?.content || '');

  useEffect(() => {
    if (activeNode) {
      setDocContent(activeNode.content || '');
    }
  }, [activeNode?.id]);

  if (!activeNode) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        请在左侧选择知识库或文档节点
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        flex: 1,
        height: 'calc(100vh - var(--header-height))',
        backgroundColor: 'var(--bg-card)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 纯粹铺满的核心 Editor / Canvas 区域 */}
      <div style={{ flex: 1, width: '100%', height: '100%', padding: '0 0px 0px 0px', overflow: 'auto' }}>
        {activeNode.type === 'chart' ? (
          <iframe
            src="/drawio/index.html"
            title="Draw.io Editor"
            style={{ width: '100%', height: '100%', border: 'none', borderRadius: 'var(--radius-sm)' }}
          />
        ) : (
          <div style={{ width: '100%', minHeight: '100%' }}>
            <DocEditor
              key={activeNode.id}
              value={docContent}
              theme={theme}
              onChange={(_docNode: any, markdown: string) => {
                setDocContent(markdown);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
