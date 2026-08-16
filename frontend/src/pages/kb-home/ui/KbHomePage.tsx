import React from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { Icon } from '@/shared/ui';

export const KbHomePage: React.FC = () => {
  const { setActiveNodeId, createNewNode } = useLayout();

  const quickAccessItems = [
    {
      id: 'doc-dianying',
      title: '电影知识库归档',
      desc: '电影剧本大纲、角色灵感与结构分析',
      icon: 'file-text',
      iconColor: '#3b82f6',
      tag: '文档',
      updatedAt: '5月10日修改',
    },
    {
      id: 'chart-jiagou',
      title: '电视剧剧情架构图',
      desc: '人物脉络图、线索逻辑与交互流程导图',
      icon: 'chart',
      iconColor: '#8b5cf6',
      tag: '思维导图',
      updatedAt: '5月12日修改',
    },
    {
      id: 'doc-bairimeng',
      title: '白日梦想家',
      desc: '影评随笔、微信读书金句划线与剧照集',
      icon: 'file-text',
      iconColor: '#3b82f6',
      tag: '笔记',
      updatedAt: '5月11日修改',
    },
    {
      id: 'doc-guide',
      title: '飞书云文档快速上手指南',
      desc: '多 Agent 协同、云盘双向同步使用手册',
      icon: 'file-text',
      iconColor: '#10b981',
      tag: '指南',
      updatedAt: '5月01日修改',
    },
  ];

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
      {/* 顶部 Banner 封面背景 */}
      <div
        style={{
          height: '160px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 40px 24px 40px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <Icon name="workspace" size={28} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              影视与工作协同知识库
            </h1>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              统一归档影视分析、黄金圈法则、微信读书笔记划线与团队协同思维导图
            </div>
          </div>
        </div>
      </div>

      {/* 主体内容容器 */}
      <div style={{ padding: '28px 40px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* 快捷新建与看板状态 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => createNewNode('doc')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#ffffff',
                backgroundColor: 'var(--primary-color)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name="plus" size={14} color="#ffffff" />
              <span>新建空白文档</span>
            </button>

            <button
              onClick={() => createNewNode('chart')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
            >
              <Icon name="chart" size={14} color="#8b5cf6" />
              <span>新建思维导图</span>
            </button>
          </div>

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
                    <Icon name={item.icon as any} size={18} color={item.iconColor} />
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

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {item.updatedAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
