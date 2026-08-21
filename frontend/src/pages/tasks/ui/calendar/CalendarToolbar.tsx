import React from 'react';
import { Icon } from '@/shared/ui';
import { ViewMode } from '../../model/types';

export interface CalendarToolbarProps {
  selectedDate: Date;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  handleToday: () => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  selectedDate,
  viewMode,
  setViewMode,
  handleToday,
  handlePrev,
  handleNext,
}) => {
  return (
    <div
      style={{
        height: '52px',
        borderBottom: '1px solid var(--border-light)',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-card)',
        flexShrink: 0,
      }}
    >
      {/* 左侧今天与前后翻页 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={handleToday}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 14px',
            height: '30px',
            fontSize: '12px',
            fontWeight: 500,
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            transition: 'var(--transition-smooth)',
            whiteSpace: 'nowrap',
          }}
        >
          今天
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={handlePrev}
            style={{
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              width: '30px',
              height: '30px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <Icon name="chevron-left" size={14} />
          </button>
          <button
            onClick={handleNext}
            style={{
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              width: '30px',
              height: '30px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <Icon name="chevron-right" size={14} />
          </button>
        </div>
        <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginLeft: '6px' }}>
          {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月
        </span>
      </div>

      {/* 右侧视图切换 (日 / 周 / 月) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-sidebar)',
            padding: '2px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
          }}
        >
          {(['day', 'week', 'month'] as ViewMode[]).map(mode => {
            const labels: Record<ViewMode, string> = { day: '日', week: '周', month: '月' };
            const isActive = viewMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '26px',
                  padding: '0 14px',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                }}
              >
                {labels[mode]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
