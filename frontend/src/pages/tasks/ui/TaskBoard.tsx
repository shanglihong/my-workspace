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
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-sidebar)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          计划清单 ({tasks.length})
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>点击复选框标记完成</span>
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
              transition: 'all 0.15s ease',
              backgroundColor: 'var(--bg-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
              <div
                onClick={() => onToggleTask(task.id)}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '5px',
                  border: task.status === 'completed' ? 'none' : '1.5px solid var(--text-muted)',
                  backgroundColor: task.status === 'completed' ? '#10b981' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  flexShrink: 0,
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
                  lineHeight: '1.4',
                }}
              >
                {task.title}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-sidebar)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-light)',
                }}
              >
                {task.category}
              </span>

              <span
                style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor:
                    task.priority === 'P0'
                      ? 'rgba(239, 68, 68, 0.12)'
                      : task.priority === 'P1'
                      ? 'rgba(59, 130, 246, 0.12)'
                      : 'rgba(156, 163, 175, 0.12)',
                  color:
                    task.priority === 'P0'
                      ? '#ef4444'
                      : task.priority === 'P1'
                      ? 'var(--primary-color)'
                      : 'var(--text-secondary)',
                  fontWeight: 600,
                }}
              >
                {task.priority}
              </span>

              <span style={{ fontSize: '11px', color: 'var(--text-muted)', minWidth: '75px', textAlign: 'right' }}>
                {task.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

