import React, { useState, useMemo } from 'react';
import { useLayout } from '@/app/providers/LayoutProvider';
import { Icon } from '@/shared/ui';

export const GlobalHomePage: React.FC = () => {
  const { setActiveNodeId, setActiveView, createNewNode, navigationTree } = useLayout();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 搜索全站所有节点
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    const results: any[] = [];
    const searchRecursive = (nodes: any[]) => {
      nodes.forEach(node => {
        if (node.title && node.title.toLowerCase().includes(query)) {
          results.push(node);
        }
        if (node.children) {
          searchRecursive(node.children);
        }
      });
    };

    searchRecursive(navigationTree);
    return results;
  }, [searchQuery, navigationTree]);

  // 点击搜索结果跳转
  const handleSelectSearchResult = (nodeId: string) => {
    setActiveNodeId(nodeId);
    setActiveView('editor');
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
        padding: '0 0 40px 0',
        userSelect: 'none',
      }}
    >
      {/* 顶部 Hero 区域与中心全站搜索框 */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(37, 99, 235, 0.08) 0%, transparent 100%)',
          padding: '48px 40px 32px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            欢迎使用工作台
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
            快速检索文档素材、知识库、思维导图与云端同步文件
          </div>
        </div>

        {/* 聚合全局搜索框 Hero Search */}
        <div style={{ width: '100%', maxWidth: '640px', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              height: '46px',
              padding: '0 16px',
              backgroundColor: 'var(--bg-card)',
              border: searchQuery ? '1.5px solid var(--primary-color)' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <Icon name="search" size={18} color="var(--primary-color)" />
            <input
              type="text"
              placeholder="搜索全站文档、划线笔记、流程导图... (输入关键字)"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '14px',
              }}
            />
            {searchQuery ? (
              <div
                onClick={() => setSearchQuery('')}
                style={{ cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
              >
                <Icon name="close" size={14} />
              </div>
            ) : (
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-sidebar)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                }}
              >
                ⌘ K
              </span>
            )}
          </div>

          {/* 动态搜索下拉框结果 */}
          {searchQuery.trim() !== '' && (
            <div
              style={{
                position: 'absolute',
                top: '52px',
                left: 0,
                right: 0,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '8px 0',
                zIndex: 20,
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {searchResults.length > 0 ? (
                searchResults.map(result => (
                  <div
                    key={result.id}
                    onClick={() => handleSelectSearchResult(result.id)}
                    style={{
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon name={result.type === 'chart' ? 'chart' : 'file-text'} size={16} color={result.type === 'chart' ? '#8b5cf6' : '#3b82f6'} />
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {result.title}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{result.updatedAt || '点击打开'}</span>
                  </div>
                ))
              ) : (
                <div style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
                  未搜到包含 “{searchQuery}” 的相关文档或知识库节点
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 主体卡片区域 */}
      <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {/* 快捷按钮与动作 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>快速新建</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => createNewNode('doc')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#ffffff',
                backgroundColor: 'var(--primary-color)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
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
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 500,
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
              }}
            >
              <Icon name="chart" size={14} color="#8b5cf6" />
              <span>新建思维导图</span>
            </button>
          </div>
        </div>

        {/* 最近访问的核心文档 Grid */}
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
            最近访问与编辑
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { id: 'doc-dianying', title: '电影', desc: '电影剧本大纲、角色灵感与结构分析', icon: 'file-text', color: '#3b82f6', time: '5月10日修改' },
              { id: 'chart-jiagou', title: '电视剧剧情架构图', desc: '人物脉络图、线索逻辑与交互流程导图', icon: 'chart', color: '#8b5cf6', time: '5月12日修改' },
              { id: 'doc-bairimeng', title: '白日梦想家', desc: '影评随笔、微信读书金句划线与剧照集', icon: 'file-text', color: '#3b82f6', time: '5月11日修改' },
              { id: 'doc-guide', title: '飞书云文档快速上手指南', desc: '多 Agent 协同、云盘双向同步使用手册', icon: 'file-text', color: '#10b981', time: '5月01日修改' },
            ].map(item => (
              <div
                key={item.id}
                onClick={() => handleSelectSearchResult(item.id)}
                style={{
                  padding: '16px',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon name={item.icon as any} size={18} color={item.color} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.title}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {item.desc}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 动态核心工作流看板 */}
        <div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
            核心工作流与计划看板
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {/* 计划任务管理 */}
            <div
              onClick={() => setActiveView('tasks')}
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="clock" size={20} color="var(--primary-color)" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>计划任务管理</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <strong style={{ color: 'var(--primary-color)' }}>3 个任务进行中</strong> · 1 个即将到期
                  </div>
                </div>
              </div>
              <Icon name="chevron-right" size={16} color="var(--text-muted)" />
            </div>

            {/* 云盘管理与同步 */}
            <div
              onClick={() => setActiveView('drive')}
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="cloud" size={20} color="#10b981" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>云盘管理与同步</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <strong style={{ color: '#10b981' }}>已同步 12 项</strong> · 离线全量增量保护
                  </div>
                </div>
              </div>
              <Icon name="chevron-right" size={16} color="var(--text-muted)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
