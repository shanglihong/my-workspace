import React from 'react';
import { Icon } from '@/shared/ui';
import { NavNode } from '@/entities/navigation';

export interface ExportTabProps {
  activeNode: NavNode | null;
  onExportMarkdown: () => void;
  onExportFeishu: () => void;
}

export const ExportTab: React.FC<ExportTabProps> = ({ activeNode, onExportMarkdown, onExportFeishu }) => {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        导出当前激活的文档/导图节点至本地或第三方云协作工具：
      </div>

      {!activeNode ? (
        <div style={{ padding: '24px 0', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>
          请先在左侧选择需要导出的文档节点
        </div>
      ) : (
        <>
          <div
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-light)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              fontSize: '12px',
              color: 'var(--primary-color)',
              fontWeight: 500,
            }}
          >
            当前选中：{activeNode.title} ({activeNode.type === 'chart' ? '架构导图' : 'Markdown文档'})
          </div>

          {/* 导出 Markdown 卡片 */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="file-text" size={16} color="var(--primary-color)" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>标准 Markdown (.md)</span>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              保留所有的排版格式、代码块与图片链接，生成本地纯文本 Markdown 文件。
            </div>

            <button
              onClick={onExportMarkdown}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '7px 0',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--primary-color)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--primary-color)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name="export" size={13} />
              <span>导出并下载本地文件</span>
            </button>
          </div>

          {/* 同步导出至飞书云文档 */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="cloud" size={16} color="#3b82f6" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>同步发布至飞书云文档</span>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              将当前文档的实时内容通过 API 一键发布并挂载至企业的飞书知识库空间。
            </div>

            <button
              onClick={onExportFeishu}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '7px 0',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name="check" size={13} />
              <span>同步至飞书知识库</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
