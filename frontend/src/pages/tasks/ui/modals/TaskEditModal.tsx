import React from 'react';
import { Icon } from '@/shared/ui';
import { TaskItem, CALENDAR_TYPES } from '../../model/types';

export interface TaskEditModalProps {
  editingTask: TaskItem | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete: () => void;
  title: string;
  onTitleChange: (val: string) => void;
  calId: string;
  onCalIdChange: (val: string) => void;
  date: string;
  onDateChange: (val: string) => void;
  startTime: string;
  onStartTimeChange: (val: string) => void;
  endTime: string;
  onEndTimeChange: (val: string) => void;
  priority: 'P0' | 'P1' | 'P2';
  onPriorityChange: (val: 'P0' | 'P1' | 'P2') => void;
  status: 'todo' | 'in_progress' | 'completed';
  onStatusChange: (val: 'todo' | 'in_progress' | 'completed') => void;
}

export const TaskEditModal: React.FC<TaskEditModalProps> = ({
  editingTask,
  onClose,
  onSubmit,
  onDelete,
  title,
  onTitleChange,
  calId,
  onCalIdChange,
  date,
  onDateChange,
  startTime,
  onStartTimeChange,
  endTime,
  onEndTimeChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
}) => {
  if (!editingTask) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: '420px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>编辑日程任务</span>
          <button
            type="button"
            onClick={onClose}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>任务标题</label>
          <input
            type="text"
            placeholder="请输入任务名称..."
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            autoFocus
            style={{
              height: '34px',
              padding: '0 10px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-app)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>归属订阅日历</label>
            <select
              value={calId}
              onChange={e => onCalIdChange(e.target.value)}
              style={{
                height: '34px',
                padding: '0 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {CALENDAR_TYPES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>优先级</label>
            <select
              value={priority}
              onChange={e => onPriorityChange(e.target.value as 'P0' | 'P1' | 'P2')}
              style={{
                height: '34px',
                padding: '0 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="P0">P0 (紧急高优)</option>
              <option value="P1">P1 (常规优先)</option>
              <option value="P2">P2 (低优先级)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>开始时间</label>
            <input
              type="text"
              value={startTime}
              onChange={e => onStartTimeChange(e.target.value)}
              style={{
                height: '34px',
                padding: '0 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>结束时间</label>
            <input
              type="text"
              value={endTime}
              onChange={e => onEndTimeChange(e.target.value)}
              style={{
                height: '34px',
                padding: '0 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>日期 (YYYY-MM-DD)</label>
            <input
              type="text"
              value={date}
              onChange={e => onDateChange(e.target.value)}
              style={{
                height: '34px',
                padding: '0 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>任务状态</label>
            <select
              value={status}
              onChange={e => onStatusChange(e.target.value as 'todo' | 'in_progress' | 'completed')}
              style={{
                height: '34px',
                padding: '0 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-app)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="todo">未开始</option>
              <option value="in_progress">进行中</option>
              <option value="completed">已完成</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
          <button
            type="button"
            onClick={onDelete}
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: '#ef4444',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            删除任务
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              取消
            </button>
            <button
              type="submit"
              style={{
                padding: '6px 16px',
                fontSize: '12px',
                fontWeight: 500,
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: 'var(--primary-color)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              保存修改
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
