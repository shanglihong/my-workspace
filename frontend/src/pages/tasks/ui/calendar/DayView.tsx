import React from 'react';
import { Icon } from '@/shared/ui';
import { TaskItem } from '../../model/types';

export interface DayViewProps {
  selectedDate: Date;
  filteredTasks: TaskItem[];
  handleOpenEditModalWithCheck: (task: TaskItem) => void;
  onToggleTask: (taskId: string) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  selectedDate,
  filteredTasks,
  handleOpenEditModalWithCheck,
  onToggleTask,
}) => {
  const targetDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const dayTasks = filteredTasks.filter(t => t.date === targetDateStr);

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
        {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日 计划节点
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {dayTasks.map(t => (
          <div
            key={t.id}
            onClick={() => handleOpenEditModalWithCheck(t)}
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                onClick={e => {
                  e.stopPropagation();
                  onToggleTask(t.id);
                }}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  border: t.status === 'completed' ? 'none' : '1.5px solid var(--text-muted)',
                  backgroundColor: t.status === 'completed' ? '#10b981' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {t.status === 'completed' && <Icon name="check" size={10} color="#ffffff" />}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 500, textDecoration: t.status === 'completed' ? 'line-through' : 'none' }}>
                {t.title}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {t.startTime} - {t.endTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
