import React from 'react';
import { TaskItem } from '../model/types';
import { useTaskCalendar } from '../model/useTaskCalendar';
import { CalendarSidebar } from './calendar/CalendarSidebar';
import { CalendarToolbar } from './calendar/CalendarToolbar';
import { WeekView } from './calendar/WeekView';
import { DayView } from './calendar/DayView';
import { MonthView } from './calendar/MonthView';
import { TaskAddModal } from './modals/TaskAddModal';
import { TaskEditModal } from './modals/TaskEditModal';

export interface TaskCalendarProps {
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
  onAddTask?: (e: React.FormEvent, taskData?: Partial<TaskItem>) => void;
  onUpdateTask?: (taskId: string, updatedData: Partial<TaskItem>) => void;
  onDeleteTask?: (taskId: string) => void;
}

export const TaskCalendar: React.FC<TaskCalendarProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const {
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
    handleSaveEdit,
    handleDeleteCurrentTask,
    handleDragStart,
    handleDragEnd,
    handleOpenEditModalWithCheck,
    handleWeekGridDragOver,
    handleWeekGridDrop,
    handleDropOnMonthCell,
  } = useTaskCalendar({ tasks, onUpdateTask, onDeleteTask });

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !onAddTask) return;
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    onAddTask(e, {
      title: newTaskTitle,
      date: dateStr,
      startTime: newTaskTime,
      endTime: '11:30',
      dueDate: `8月${selectedDate.getDate()}日 ${newTaskTime}`,
      calendarId: newTaskCalId,
    });
    setNewTaskTitle('');
    setShowAddModal(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        height: '100%',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* 左侧侧边栏导航面板 */}
      <CalendarSidebar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        miniCalendarDays={miniCalendarDays}
        selectedCalIds={selectedCalIds}
        toggleCalId={toggleCalId}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      {/* 右侧主日历视图区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {/* 顶部 Header Toolbar */}
        <CalendarToolbar
          selectedDate={selectedDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
          handleToday={handleToday}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />

        {/* 视图主体网格区 */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {viewMode === 'week' && (
            <WeekView
              weekDays={weekDays}
              hours={hours}
              filteredTasks={filteredTasks}
              draggedTaskId={draggedTaskId}
              dragSnapPreview={dragSnapPreview}
              weekGridRef={weekGridRef}
              handleWeekGridDragOver={handleWeekGridDragOver}
              handleWeekGridDrop={handleWeekGridDrop}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              handleOpenEditModalWithCheck={handleOpenEditModalWithCheck}
            />
          )}

          {viewMode === 'day' && (
            <DayView
              selectedDate={selectedDate}
              filteredTasks={filteredTasks}
              handleOpenEditModalWithCheck={handleOpenEditModalWithCheck}
              onToggleTask={onToggleTask}
            />
          )}

          {viewMode === 'month' && (
            <MonthView
              miniCalendarDays={miniCalendarDays}
              filteredTasks={filteredTasks}
              draggedTaskId={draggedTaskId}
              dragOverCell={dragOverCell}
              setDragOverCell={setDragOverCell}
              handleDropOnMonthCell={handleDropOnMonthCell}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              handleOpenEditModalWithCheck={handleOpenEditModalWithCheck}
            />
          )}
        </div>
      </div>

      {/* 快捷新建任务 Modal */}
      <TaskAddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleQuickAdd}
        title={newTaskTitle}
        onTitleChange={setNewTaskTitle}
        calId={newTaskCalId}
        onCalIdChange={setNewTaskCalId}
        time={newTaskTime}
        onTimeChange={setNewTaskTime}
        selectedDate={selectedDate}
      />

      {/* 编辑任务 Modal */}
      <TaskEditModal
        editingTask={editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleSaveEdit}
        onDelete={handleDeleteCurrentTask}
        title={editTitle}
        onTitleChange={setEditTitle}
        calId={editCalId}
        onCalIdChange={setEditCalId}
        date={editDate}
        onDateChange={setEditDate}
        startTime={editStartTime}
        onStartTimeChange={setEditStartTime}
        endTime={editEndTime}
        onEndTimeChange={setEditEndTime}
        priority={editPriority}
        onPriorityChange={setEditPriority}
        status={editStatus}
        onStatusChange={setEditStatus}
      />
    </div>
  );
};
