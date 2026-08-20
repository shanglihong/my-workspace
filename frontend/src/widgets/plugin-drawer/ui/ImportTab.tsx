import React from 'react';
import { Icon } from '@/shared/ui';

export interface ImportTabProps {
  onImportWeRead: () => void;
  onImportFeishu: () => void;
}

export const ImportTab: React.FC<ImportTabProps> = ({ onImportWeRead, onImportFeishu }) => {
  return (
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
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981',
              }}
            >
              <Icon name="book" size={14} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>微信读书</span>
          </div>
          <span style={{ fontSize: '11px', color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
            已授权连接
          </span>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          自动捕获《黄金圈法则》、《第一性原理》等书籍的划线批注与个人心得。
        </div>

        <button
          onClick={onImportWeRead}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '7px 0',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--primary-color)',
            backgroundColor: 'var(--primary-light)',
            border: '1px solid var(--primary-color)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)',
          }}
        >
          <Icon name="import" size={13} />
          <span>增量同步最新划线批注</span>
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
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3b82f6',
              }}
            >
              <Icon name="cloud" size={14} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>飞书云文档</span>
          </div>
          <span style={{ fontSize: '11px', color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
            系统集成中
          </span>
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          快速导入团队敏捷开发大纲、需求评审看板与多维度素材。
        </div>

        <button
          onClick={onImportFeishu}
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
          <Icon name="file-text" size={13} />
          <span>拉取大纲素材模板</span>
        </button>
      </div>
    </div>
  );
};
