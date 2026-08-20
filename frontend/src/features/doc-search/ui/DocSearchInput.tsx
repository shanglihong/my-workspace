import React from 'react';
import { Icon } from '@/shared/ui';
import { useDocSearch } from '../model/useDocSearch';

export interface DocSearchInputProps {
  placeholder?: string;
  maxWidth?: string;
  className?: string;
}

export const DocSearchInput: React.FC<DocSearchInputProps> = ({
  placeholder = '搜索全站文档、划线笔记、流程导图...',
  maxWidth = '640px',
  className = '',
}) => {
  const { query, setQuery, clearQuery, searchResults, handleSelectResult } = useDocSearch();

  return (
    <div style={{ width: '100%', maxWidth, position: 'relative' }} className={className}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          height: '46px',
          padding: '0 16px',
          backgroundColor: 'var(--bg-card)',
          border: query ? '1.5px solid var(--primary-color)' : '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          transition: 'var(--transition-smooth)',
        }}
      >
        <Icon name="search" size={18} color="var(--primary-color)" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '14px',
          }}
        />
        {query ? (
          <div onClick={clearQuery} style={{ cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
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

      {/* 动态搜索下拉结果 */}
      {query.trim() !== '' && (
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
                onClick={() => handleSelectResult(result.id)}
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
                  <Icon
                    name={result.type === 'chart' ? 'chart' : 'file-text'}
                    size={16}
                    color={result.type === 'chart' ? '#8b5cf6' : '#3b82f6'}
                  />
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {result.title}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {result.updatedAt || '点击打开'}
                </span>
              </div>
            ))
          ) : (
            <div style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
              未搜到包含 “{query}” 的相关文档或知识库节点
            </div>
          )}
        </div>
      )}
    </div>
  );
};
