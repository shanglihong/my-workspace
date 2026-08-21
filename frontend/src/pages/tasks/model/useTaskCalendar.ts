import React, { useState, useMemo, useRef } from 'react';
import { TaskItem, ViewMode, getCalMeta } from './types';

export interface UseTaskCalendarOptions {
  tasks: TaskItem[];
  onUpdateTask?: (taskId: string, updatedData: Partial<TaskItem>) => void;
  onDeleteTask?: (taskId: string) => void;
}

export const useTaskCalendar = ({ tasks, onUpdateTask, onDeleteTask }: UseTaskCalendarOptions) => {
  // 当前基准日期：2026-08-21
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 7, 21));
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedCalIds, setSelectedCalIds] = useState<string[]>(['task', 'meeting', 'personal', 'sync']);

  // 新建 Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('10:00');
  const [newTaskCalId, setNewTaskCalId] = useState('task');

  // 编辑 Modal State
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCalId, setEditCalId] = useState('task');
  const [editDate, setEditDate] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editPriority, setEditPriority] = useState<'P0' | 'P1' | 'P2'>('P1');
  const [editStatus, setEditStatus] = useState<'todo' | 'in_progress' | 'completed'>('in_progress');

  // 拖拽相关 State & Ref
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverCell, setDragOverCell] = useState<string | null>(null);
  const isJustDraggedRef = useRef(false);
  const weekGridRef = useRef<HTMLDivElement>(null);
  const dragGripOffsetYRef = useRef<number>(0);

  const [dragSnapPreview, setDragSnapPreview] = useState<{
    dateStr: string;
    startTime: string;
    endTime: string;
    topPx: number;
    heightPx: number;
    colIdx: number;
  } | null>(null);

  const toggleCalId = (id: string) => {
    setSelectedCalIds(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // 周视图 7 天范围
  const weekDays = useMemo(() => {
    const current = new Date(selectedDate);
    const dayOfWeek = current.getDay();
    const sun = new Date(current);
    sun.setDate(current.getDate() - dayOfWeek);

    const days = [];
    const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sun);
      d.setDate(sun.getDate() + i);
      const isToday = d.getFullYear() === 2026 && d.getMonth() === 7 && d.getDate() === 21;
      const isSelected =
        d.getFullYear() === selectedDate.getFullYear() &&
        d.getMonth() === selectedDate.getMonth() &&
        d.getDate() === selectedDate.getDate();

      days.push({
        date: d,
        dayNum: d.getDate(),
        weekName: weekNames[i],
        dateStr: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
        isToday,
        isSelected,
      });
    }
    return days;
  }, [selectedDate]);

  // 时间轴列表
  const hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

  // 迷你月历天数据
  const miniCalendarDays = useMemo(() => {
    const prevMonthDays = [26, 27, 28, 29, 30, 31];
    const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
    const nextMonthDays = [1, 2, 3, 4, 5];

    return [
      ...prevMonthDays.map(d => ({ day: d, isCurrentMonth: false, dateStr: `2026-07-${d}`, isToday: false })),
      ...currentMonthDays.map(d => ({
        day: d,
        isCurrentMonth: true,
        dateStr: `2026-08-${String(d).padStart(2, '0')}`,
        isToday: d === 21,
      })),
      ...nextMonthDays.map(d => ({ day: d, isCurrentMonth: false, dateStr: `2026-09-0${d}`, isToday: false })),
    ];
  }, []);

  const handleToday = () => {
    setSelectedDate(new Date(2026, 7, 21));
  };

  const handlePrev = () => {
    const d = new Date(selectedDate);
    if (viewMode === 'day') d.setDate(d.getDate() - 1);
    else if (viewMode === 'week') d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    setSelectedDate(d);
  };

  const handleNext = () => {
    const d = new Date(selectedDate);
    if (viewMode === 'day') d.setDate(d.getDate() + 1);
    else if (viewMode === 'week') d.setDate(d.getDate() + 7);
    else d.setMonth(d.getMonth() + 1);
    setSelectedDate(d);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const calId = t.calendarId || 'task';
      return selectedCalIds.includes(calId);
    });
  }, [tasks, selectedCalIds]);

  const handleOpenEditModal = (task: TaskItem) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditCalId(task.calendarId || 'task');
    setEditDate(task.date || '2026-08-21');
    setEditStartTime(task.startTime || '10:00');
    setEditEndTime(task.endTime || '11:30');
    setEditPriority(task.priority || 'P1');
    setEditStatus(task.status || 'in_progress');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask || !editTitle.trim() || !onUpdateTask) return;
    const calMeta = getCalMeta(editCalId);
    onUpdateTask(editingTask.id, {
      title: editTitle.trim(),
      calendarId: editCalId,
      date: editDate,
      startTime: editStartTime,
      endTime: editEndTime,
      priority: editPriority,
      status: editStatus,
      category: calMeta.name,
    });
    setEditingTask(null);
  };

  const handleDeleteCurrentTask = () => {
    if (!editingTask || !onDeleteTask) return;
    onDeleteTask(editingTask.id);
    setEditingTask(null);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedTaskId(taskId);
    isJustDraggedRef.current = false;

    const cardRect = e.currentTarget.getBoundingClientRect();
    dragGripOffsetYRef.current = Math.max(0, e.clientY - cardRect.top);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverCell(null);
    setDragSnapPreview(null);
    isJustDraggedRef.current = true;
    setTimeout(() => {
      isJustDraggedRef.current = false;
    }, 120);
  };

  const handleOpenEditModalWithCheck = (task: TaskItem) => {
    if (isJustDraggedRef.current) return;
    handleOpenEditModal(task);
  };

  const handleWeekGridDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (!weekGridRef.current || !draggedTaskId) return;

    const rect = weekGridRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const gripOffsetY = dragGripOffsetYRef.current || 0;
    const cardTopY = e.clientY - rect.top - gripOffsetY;

    const contentWidth = rect.width - 70;
    if (contentWidth <= 0) return;

    const relativeX = Math.max(0, Math.min(contentWidth - 1, mouseX - 70));
    const colIdx = Math.min(6, Math.floor((relativeX / contentWidth) * 7));
    const targetDay = weekDays[colIdx];
    if (!targetDay) return;

    const rawMinutes = 8 * 60 + (cardTopY / 54) * 60;
    const clampedMinutes = Math.max(8 * 60, Math.min(22 * 60, rawMinutes));
    const snappedMinutes = Math.round(clampedMinutes / 15) * 15;

    const startH = Math.floor(snappedMinutes / 60);
    const startM = snappedMinutes % 60;

    const task = tasks.find(t => t.id === draggedTaskId);
    const origStartH = parseInt(task?.startTime?.split(':')[0] || '9', 10);
    const origStartM = parseInt(task?.startTime?.split(':')[1] || '0', 10);
    const origEndH = parseInt(task?.endTime?.split(':')[0] || '10', 10);
    const origEndM = parseInt(task?.endTime?.split(':')[1] || '0', 10);
    const durationMinutes = (origEndH - origStartH) * 60 + (origEndM - origStartM) || 60;

    const totalEndMinutes = snappedMinutes + durationMinutes;
    const endH = Math.min(23, Math.floor(totalEndMinutes / 60));
    const endM = totalEndMinutes % 60;

    const startTimeStr = `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}`;
    const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

    const topPx = ((snappedMinutes - 8 * 60) / 60) * 54;
    const heightPx = Math.max(27, (durationMinutes / 60) * 54);

    setDragSnapPreview({
      dateStr: targetDay.dateStr,
      startTime: startTimeStr,
      endTime: endTimeStr,
      topPx,
      heightPx,
      colIdx,
    });
  };

  const handleWeekGridDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragSnapPreview && draggedTaskId && onUpdateTask) {
      onUpdateTask(draggedTaskId, {
        date: dragSnapPreview.dateStr,
        startTime: dragSnapPreview.startTime,
        endTime: dragSnapPreview.endTime,
        dueDate: `8月${parseInt(dragSnapPreview.dateStr.split('-')[2], 10)}日 ${dragSnapPreview.startTime}`,
      });
    }
    setDragSnapPreview(null);
    setDraggedTaskId(null);
    isJustDraggedRef.current = true;
    setTimeout(() => {
      isJustDraggedRef.current = false;
    }, 120);
  };

  const handleDropOnMonthCell = (e: React.DragEvent, targetDateStr: string) => {
    e.preventDefault();
    setDragOverCell(null);
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (!taskId || !onUpdateTask) return;

    onUpdateTask(taskId, {
      date: targetDateStr,
    });
  };

  return {
    selectedDate,
    setSelectedDate,
    viewMode,
    setViewMode,
    selectedCalIds,
    toggleCalId,
    showAddModal,
    setShowAddModal,
    newTaskTitle,
    setNewTaskTitle,
    newTaskTime,
    setNewTaskTime,
    newTaskCalId,
    setNewTaskCalId,
    editingTask,
    setEditingTask,
    editTitle,
    setEditTitle,
    editCalId,
    setEditCalId,
    editDate,
    setEditDate,
    editStartTime,
    setEditStartTime,
    editEndTime,
    setEditEndTime,
    editPriority,
    setEditPriority,
    editStatus,
    setEditStatus,
    draggedTaskId,
    dragOverCell,
    setDragOverCell,
    weekGridRef,
    dragSnapPreview,
    weekDays,
    hours,
    miniCalendarDays,
    filteredTasks,
    handleToday,
    handlePrev,
    handleNext,
    handleOpenEditModal,
    handleSaveEdit,
    handleDeleteCurrentTask,
    handleDragStart,
    handleDragEnd,
    handleOpenEditModalWithCheck,
    handleWeekGridDragOver,
    handleWeekGridDrop,
    handleDropOnMonthCell,
  };
};
