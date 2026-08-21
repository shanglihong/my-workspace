import React from 'react';
import { Icon } from '@/shared/ui';
import { CALENDAR_TYPES } from '../../model/types';

export interface TaskAddModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  onTitleChange: (val: string) => void;
  calId: string;
  onCalIdChange: (val: string) => void;
  time: string;
  onTimeChange: (val: string) => void;
  selectedDate: Date;
}

export const TaskAddModal: React.FC<TaskAddModalProps> = ({
  show,
  onClose,
  onSubmit,
  title,
  onTitleChange,
  calId,
  onCalIdChange,
  time,
  onTimeChange,
  selectedDate,
}) => {
  if (!show) return null;

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
          width: '380px',
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
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>新建日程任务</span>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>开始时间</label>
            <input
              type="text"
              value={time}
              onChange={e => onTimeChange(e.target.value)}
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
            <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>选择日期</label>
            <div style={{ height: '34px', padding: '0 10px', display: 'flex', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              2026-08-{selectedDate.getDate()}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
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
            保存
          </button>
        </div>
      </form>
    </div>
  );
};
