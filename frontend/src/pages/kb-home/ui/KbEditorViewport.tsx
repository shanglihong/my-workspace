import React, { useState, useEffect, useRef } from 'react';
import { useLayout } from '@/entities/layout';
import { DocEditor } from 'my-doc-editor';
import 'my-doc-editor/dist/my-doc-editor.css';
import { KbRightSidebar } from './right-sidebar/KbRightSidebar';

export interface KbEditorViewportProps {
  className?: string;
}

export const KbEditorViewport: React.FC<KbEditorViewportProps> = ({ className = '' }) => {
  const { activeNode, theme, updateNodeContent } = useLayout();
  const [docContent, setDocContent] = useState<string>(activeNode?.content || '');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeNode) {
      setDocContent(activeNode.content || '');
      setIsScrolling(false);
    }
  }, [activeNode?.id, activeNode?.content]);

  // 严格监听滚动：滚动时即刻呈现，不滚动 800ms 后立刻消失
  const handleScroll = () => {
    setIsScrolling(true);
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

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
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 核心 Editor 容器：仅在触发滚动 (isScrolling) 时显现滚动条，不滚动时彻底隐藏 */}
      <div
        onScroll={handleScroll}
        className={`doc-editor-viewport-scroll ${isScrolling ? 'is-scrolling' : ''}`}
        style={{
          flex: 1,
          height: '100%',
          overflowY: 'auto',
          transition: 'var(--transition-smooth)',
        }}
      >
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
              onChange={(_docNode: unknown, markdown: string) => {
                setDocContent(markdown);
                updateNodeContent(activeNode.id, markdown);
              }}
            />
          </div>
        )}
      </div>

      {/* 做到 kb 页面内部的侧边栏组件 */}
      <KbRightSidebar />
    </div>
  );
};
