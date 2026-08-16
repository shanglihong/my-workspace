import React, { useState } from 'react';
import { Icon } from '@/shared/ui';

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'todo' | 'in_progress' | 'completed';
  dueDate: string;
}

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 'task-1',
      title: '《黄金圈法则》读书笔记划线同步至飞书云文档',
      category: '笔记与同步',
      priority: 'P0',
      status: 'in_progress',
      dueDate: '今日 18:00',
    },
    {
      id: 'task-2',
      title: '电视剧剧情架构图导出高清 SVG / 图片',
      category: '架构与导出',
      priority: 'P1',
      status: 'todo',
      dueDate: '明日 12:00',
    },
    {
      id: 'task-3',
      title: '离线优先增量同步与云盘备份队列测试',
      category: '云盘同步',
      priority: 'P1',
      status: 'in_progress',
      dueDate: '8月18日',
    },
    {
      id: 'task-4',
      title: '《白日梦想家》观后感文字排版与样式优化',
      category: '内容创作',
      priority: 'P2',
      status: 'completed',
      dueDate: '8月15日',
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleToggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === taskId) {
          const nextStatus = t.status === 'completed' ? 'in_progress' : 'completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: '通用任务',
      priority: 'P1',
      status: 'in_progress',
      dueDate: '未指定',
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const inProgressCount = tasks.filter(t => t.status !== 'completed').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

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

      {/* 任务列表 */}
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
                  onClick={() => handleToggleTask(task.id)}
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
    </div>
  );
};
