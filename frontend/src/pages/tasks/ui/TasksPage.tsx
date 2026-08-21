import React, { useState } from 'react';
import { Icon } from '@/shared/ui';
import { useTasks } from '../model/useTasks';
import { TaskBoard } from './TaskBoard';
import { TaskCalendar } from './TaskCalendar';

export const TasksPage: React.FC = () => {
  const {
    tasks,
    newTaskTitle,
    setNewTaskTitle,
    inProgressCount,
    completedCount,
    handleToggleTask,
    handleAddTask,
  } = useTasks();

  const [pageViewMode, setPageViewMode] = useState<'list' | 'calendar'>('calendar');

  return (
    <div
      style={{
        flex: 1,
        height: 'calc(100vh - var(--header-height))',
        backgroundColor: 'var(--bg-app)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: '14px 24px',
        gap: '14px',
        userSelect: 'none',
      }}
    >
      {/* 顶部 Header Toolbar & 视图切换 & 快捷指标 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          gap: '16px',
          flexShrink: 0,
          minHeight: '40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
          {/* 标题 */}
          <h1
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
              letterSpacing: '-0.2px',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            计划任务管理中心
          </h1>

          {/* 简洁指标 Pill 标签 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '10px',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: 'var(--primary-color)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }} />
              进行中 {inProgressCount}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              已完成 {completedCount}
            </span>
          </div>

          {/* 视图切换按钮 Segmented Control */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'var(--bg-sidebar)',
              padding: '2px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setPageViewMode('list')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                height: '26px',
                padding: '0 10px',
                fontSize: '12px',
                fontWeight: pageViewMode === 'list' ? 600 : 400,
                color: pageViewMode === 'list' ? 'var(--primary-color)' : 'var(--text-secondary)',
                backgroundColor: pageViewMode === 'list' ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                boxShadow: pageViewMode === 'list' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon name="file-text" size={13} />
              <span>清单视图</span>
            </button>

            <button
              onClick={() => setPageViewMode('calendar')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                height: '26px',
                padding: '0 10px',
                fontSize: '12px',
                fontWeight: pageViewMode === 'calendar' ? 600 : 400,
                color: pageViewMode === 'calendar' ? 'var(--primary-color)' : 'var(--text-secondary)',
                backgroundColor: pageViewMode === 'calendar' ? 'var(--bg-card)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                boxShadow: pageViewMode === 'calendar' ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon name="calendar" size={13} />
              <span>日历视图</span>
            </button>
          </div>
        </div>

        {/* 右侧快速新建任务表单 */}
        <form onSubmit={handleAddTask} style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <input
            type="text"
            placeholder="新建计划任务..."
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            style={{
              width: '240px',
              height: '32px',
              padding: '0 12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              outline: 'none',
              transition: 'var(--transition-smooth)',
            }}
          />
          <button
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              padding: '0 14px',
              height: '32px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: 'var(--primary-color)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(59, 130, 246, 0.3)',
              transition: 'var(--transition-smooth)',
              whiteSpace: 'nowrap',
            }}
          >
            <Icon name="plus" size={14} color="#ffffff" />
            <span>添加</span>
          </button>
        </form>
      </div>

      {/* 视图主体区域：根据 pageViewMode 自适应撑满 */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: pageViewMode === 'list' ? 'auto' : 'hidden' }}>
        {pageViewMode === 'list' ? (
          <TaskBoard tasks={tasks} onToggleTask={handleToggleTask} />
        ) : (
          <TaskCalendar tasks={tasks} onToggleTask={handleToggleTask} onAddTask={handleAddTask} />
        )}
      </div>
    </div>
  );
};

