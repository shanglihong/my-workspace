import React from 'react';
import { TaskItem, getCalMeta } from '../../model/types';

export interface MonthViewProps {
  miniCalendarDays: Array<{ day: number; isCurrentMonth: boolean; dateStr: string; isToday: boolean }>;
  filteredTasks: TaskItem[];
  draggedTaskId: string | null;
  dragOverCell: string | null;
  setDragOverCell: (cell: string | null) => void;
  handleDropOnMonthCell: (e: React.DragEvent, dateStr: string) => void;
  handleDragStart: (e: React.DragEvent, taskId: string) => void;
  handleDragEnd: () => void;
  handleOpenEditModalWithCheck: (task: TaskItem) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  miniCalendarDays,
  filteredTasks,
  draggedTaskId,
  dragOverCell,
  setDragOverCell,
  handleDropOnMonthCell,
  handleDragStart,
  handleDragEnd,
  handleOpenEditModalWithCheck,
}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1, backgroundColor: 'var(--bg-card)' }}>
      {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(w => (
        <div key={w} style={{ padding: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>
          {w}
        </div>
      ))}
      {miniCalendarDays.map((item, idx) => {
        const dayTasks = filteredTasks.filter(t => t.date === item.dateStr);
        const isHovered = dragOverCell === item.dateStr;
        return (
          <div
            key={idx}
            onDragOver={e => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              if (dragOverCell !== item.dateStr) setDragOverCell(item.dateStr);
            }}
            onDragLeave={() => {
              if (dragOverCell === item.dateStr) setDragOverCell(null);
            }}
            onDrop={e => handleDropOnMonthCell(e, item.dateStr)}
            style={{
              borderRight: '1px solid var(--border-light)',
              borderBottom: '1px solid var(--border-light)',
              padding: '6px',
              minHeight: '80px',
              backgroundColor: isHovered
                ? 'rgba(59, 130, 246, 0.15)'
                : item.isToday
                ? 'rgba(59, 130, 246, 0.02)'
                : 'transparent',
              transition: 'background-color 0.15s ease',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: item.isToday ? 700 : 400, color: item.isToday ? 'var(--primary-color)' : 'var(--text-secondary)', marginBottom: '4px' }}>
              {item.day}
            </div>
            {dayTasks.map(t => {
              const calMeta = getCalMeta(t.calendarId);
              return (
                <div
                  key={t.id}
                  draggable
                  onDragStart={e => handleDragStart(e, t.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleOpenEditModalWithCheck(t)}
                  style={{
                    fontSize: '10px',
                    padding: '2px 4px',
                    borderRadius: '2px',
                    backgroundColor: calMeta.bgTint,
                    color: calMeta.color,
                    borderLeft: `2px solid ${calMeta.color}`,
                    marginBottom: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    cursor: draggedTaskId === t.id ? 'grabbing' : 'grab',
                    opacity: draggedTaskId === t.id ? 0.4 : 1,
                  }}
                >
                  {t.title}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
