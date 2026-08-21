import { useState, FormEvent } from 'react';

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'todo' | 'in_progress' | 'completed';
  dueDate: string;
  date?: string; // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  owner?: string;
  calendarId?: string; // task | meeting | personal | sync
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 'task-1',
      title: '《黄金圈法则》读书笔记划线同步至飞书云文档',
      category: '笔记与同步',
      priority: 'P0',
      status: 'in_progress',
      dueDate: '今日 18:00',
      date: '2026-08-21',
      startTime: '09:00',
      endTime: '10:30',
      owner: '刘巧',
      calendarId: 'sync',
    },
    {
      id: 'task-2',
      title: '电视剧剧情架构图导出高清 SVG / 图片',
      category: '架构与导出',
      priority: 'P1',
      status: 'todo',
      dueDate: '明日 12:00',
      date: '2026-08-22',
      startTime: '10:00',
      endTime: '12:00',
      owner: '刘巧',
      calendarId: 'task',
    },
    {
      id: 'task-3',
      title: '离线优先增量同步与云盘备份队列测试',
      category: '云盘同步',
      priority: 'P1',
      status: 'in_progress',
      dueDate: '8月18日',
      date: '2026-08-18',
      startTime: '11:00',
      endTime: '13:00',
      owner: '刘巧',
      calendarId: 'task',
    },
    {
      id: 'task-4',
      title: '《白日梦想家》观后感文字排版与样式优化',
      category: '内容创作',
      priority: 'P2',
      status: 'completed',
      dueDate: '8月15日',
      date: '2026-08-15',
      startTime: '14:00',
      endTime: '15:30',
      owner: '刘巧',
      calendarId: 'personal',
    },
    {
      id: 'task-5',
      title: '知识库全文索引构建与向量数据库优化周会',
      category: 'AI引擎',
      priority: 'P0',
      status: 'in_progress',
      dueDate: '今日 16:00',
      date: '2026-08-21',
      startTime: '14:00',
      endTime: '16:00',
      owner: '刘巧',
      calendarId: 'meeting',
    },
    {
      id: 'task-6',
      title: '前端架构重构与日历视图开发',
      category: '视图与组件',
      priority: 'P1',
      status: 'in_progress',
      dueDate: '8月19日',
      date: '2026-08-19',
      startTime: '15:00',
      endTime: '17:00',
      owner: '刘巧',
      calendarId: 'task',
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

  const handleAddTask = (e: FormEvent, taskData?: Partial<TaskItem>) => {
    if (e) e.preventDefault();
    const title = taskData?.title || newTaskTitle;
    if (!title.trim()) return;

    const todayStr = '2026-08-21';
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      category: taskData?.category || '通用任务',
      priority: taskData?.priority || 'P1',
      status: 'in_progress',
      dueDate: taskData?.dueDate || '今日 18:00',
      date: taskData?.date || todayStr,
      startTime: taskData?.startTime || '10:00',
      endTime: taskData?.endTime || '11:30',
      owner: '刘巧',
    };
    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const inProgressCount = tasks.filter(t => t.status !== 'completed').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return {
    tasks,
    newTaskTitle,
    setNewTaskTitle,
    inProgressCount,
    completedCount,
    handleToggleTask,
    handleAddTask,
  };
};

