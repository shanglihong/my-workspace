import React from 'react';
import { Icon } from '@/shared/ui';
import { useTasks } from '../model/useTasks';
import { TaskBoard } from './TaskBoard';

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

  return (
    <div
      style={{
        flex: 1,
        height: 'calc(100vh - var(--header-height))',
        backgroundColor: 'var(--bg-app)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        padding: '24px 32px',
        gap: '24px',
        userSelect: 'none',
      }}
    >
      {/* 顶部 Header & 新建输入 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            计划任务管理中心
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            规划知识库整理、文件云端同步与内容导出计划
          </div>
        </div>

        <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="新建计划任务..."
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
            style={{
              width: '240px',
              height: '34px',
              padding: '0 12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '34px',
              fontSize: '12px',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: 'var(--primary-color)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            <Icon name="plus" size={14} color="#ffffff" />
            <span>添加</span>
          </button>
        </form>
      </div>

      {/* 统计指标 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>进行中任务</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary-color)', marginTop: '2px' }}>
            {inProgressCount} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)' }}>个</span>
          </div>
        </div>

        <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>已完成任务</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
            {completedCount} <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)' }}>个</span>
          </div>
        </div>
      </div>

      {/* 任务列表看板 */}
      <TaskBoard tasks={tasks} onToggleTask={handleToggleTask} />
    </div>
  );
};
