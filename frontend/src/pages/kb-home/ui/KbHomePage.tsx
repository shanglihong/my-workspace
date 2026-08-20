import React from 'react';
import { CreateDocButtonGroup } from '@/features';
import { useKbHome } from '../model/useKbHome';
import { KbStatHeader } from './KbStatHeader';
import { Icon } from '@/shared/ui';

export const KbHomePage: React.FC = () => {
  const { quickAccessItems, setActiveNodeId } = useKbHome();

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
          {/* 引入通用 Feature 组件：新建文档/导图按钮组 */}
          <CreateDocButtonGroup />

          {/* 右侧小数据徽章 */}
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <span>📚 知识库节点：<strong style={{ color: 'var(--text-primary)' }}>5 个页面</strong></span>
            <span>·</span>
            <span>📖 已连微信读书：<strong style={{ color: '#10b981' }}>128 条划线</strong></span>
          </div>
        </div>

        {/* 常用与推荐文档 Grid */}
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
            常用与推荐页面
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {quickAccessItems.map(item => (
              <div
                key={item.id}
                onClick={() => setActiveNodeId(item.id)}
                style={{
                  padding: '18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition-smooth)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--primary-color)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon name={item.icon} size={18} color={item.iconColor} />
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-muted)' }}>
                    {item.tag}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', paddingTop: '8px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.updatedAt}</span>
                  <span style={{ color: 'var(--primary-color)' }}>打开节点 →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
