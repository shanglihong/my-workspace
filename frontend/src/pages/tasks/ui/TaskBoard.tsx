import React from 'react';
import { Icon } from '@/shared/ui';
import { TaskItem } from '../model/useTasks';

export interface TaskBoardProps {
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onToggleTask }) => {
  return (
    <div
      style={{
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-light)', backgroundColor: 'var(--bg-sidebar)', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
        计划清单 ({tasks.length})
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {tasks.map(task => (
          <div
            key={task.id}
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              transition: 'var(--transition-smooth)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div
                onClick={() => onToggleTask(task.id)}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '4px',
                  border: task.status === 'completed' ? 'none' : '1.5px solid var(--text-muted)',
                  backgroundColor: task.status === 'completed' ? '#10b981' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {task.status === 'completed' && <Icon name="check" size={12} color="#ffffff" />}
              </div>

              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: task.status === 'completed' ? 'var(--text-muted)' : 'var(--text-primary)',
                  textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                }}
              >
                {task.title}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-sidebar)', color: 'var(--text-secondary)' }}>
                {task.category}
              </span>

              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: task.priority === 'P0' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.12)',
                  color: task.priority === 'P0' ? '#ef4444' : 'var(--primary-color)',
                  fontWeight: 600,
                }}
              >
                {task.priority}
              </span>

              <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '70px', textAlign: 'right' }}>
                {task.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
