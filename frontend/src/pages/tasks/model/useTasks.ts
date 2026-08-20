import { useState, FormEvent } from 'react';

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'todo' | 'in_progress' | 'completed';
  dueDate: string;
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

  const handleAddTask = (e: FormEvent) => {
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
