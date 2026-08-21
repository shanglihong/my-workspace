import React from 'react';
import { Icon } from '@/shared/ui';
import { CALENDAR_TYPES } from '../../model/types';

export interface CalendarSidebarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  miniCalendarDays: Array<{ day: number; isCurrentMonth: boolean; dateStr: string; isToday: boolean }>;
  selectedCalIds: string[];
  toggleCalId: (id: string) => void;
  handlePrev: () => void;
  handleNext: () => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  selectedDate,
  setSelectedDate,
  miniCalendarDays,
  selectedCalIds,
  toggleCalId,
  handlePrev,
  handleNext,
}) => {
  return (
    <div
      style={{
        width: '260px',
        borderRight: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-sidebar)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        gap: '20px',
        flexShrink: 0,
      }}
    >
      {/* 迷你月历标头 */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
            2026年8月
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrev}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
            >
              <Icon name="chevron-left" size={14} />
            </button>
            <button
              onClick={handleNext}
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
            >
              <Icon name="chevron-right" size={14} />
            </button>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}>
              <Icon name="chevron-up" size={14} />
            </button>
          </div>
        </div>

        {/* 迷你日历星期表头 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>

        {/* 迷你日历网格 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
          {miniCalendarDays.map((item, idx) => {
            const dateObj = new Date(item.dateStr);
            const isSelected =
              dateObj.getFullYear() === selectedDate.getFullYear() &&
              dateObj.getMonth() === selectedDate.getMonth() &&
              dateObj.getDate() === selectedDate.getDate();

            return (
              <div
                key={idx}
                onClick={() => setSelectedDate(dateObj)}
                style={{
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  fontWeight: item.isToday || isSelected ? 600 : 400,
                  color: !item.isCurrentMonth
                    ? 'var(--text-muted)'
                    : isSelected
                    ? '#ffffff'
                    : item.isToday
                    ? 'var(--primary-color)'
                    : 'var(--text-primary)',
                  backgroundColor: isSelected ? 'var(--primary-color)' : item.isToday ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                }}
              >
                {item.day}
              </div>
            );
          })}
        </div>
      </div>

      {/* 筛选分组分类：我订阅的 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600 }}>
          <span>我订阅的</span>
          <Icon name="chevron-down" size={12} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {CALENDAR_TYPES.map(cal => {
            const isChecked = selectedCalIds.includes(cal.id);
            return (
              <div
                key={cal.id}
                onClick={() => toggleCalId(cal.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: isChecked ? 'var(--text-primary)' : 'var(--text-muted)',
                  padding: '6px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isChecked ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={e => e.stopPropagation()}
                  style={{ accentColor: cal.color, cursor: 'pointer', margin: 0 }}
                />
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: cal.color,
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontWeight: isChecked ? 500 : 400, flex: 1, userSelect: 'none' }}>
                  {cal.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
