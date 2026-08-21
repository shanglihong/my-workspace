import React, { useState, useMemo } from 'react';
import { Icon } from '@/shared/ui';
import { TaskItem } from '../model/useTasks';

export interface TaskCalendarProps {
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
  onAddTask?: (e: React.FormEvent, taskData?: Partial<TaskItem>) => void;
}

export interface SubscriptionCalendar {
  id: string;
  name: string;
  color: string;
  bgTint: string;
}

export const CALENDAR_TYPES: SubscriptionCalendar[] = [
  { id: 'task', name: '任务计划', color: '#3b82f6', bgTint: 'rgba(59, 130, 246, 0.12)' },
  { id: 'meeting', name: '团队会议', color: '#8b5cf6', bgTint: 'rgba(139, 92, 246, 0.12)' },
  { id: 'personal', name: '个人日程', color: '#10b981', bgTint: 'rgba(16, 185, 129, 0.12)' },
  { id: 'sync', name: '文档同步', color: '#f59e0b', bgTint: 'rgba(245, 158, 11, 0.12)' },
];

export const getCalMeta = (calId?: string): SubscriptionCalendar => {
  return CALENDAR_TYPES.find(c => c.id === (calId || 'task')) || CALENDAR_TYPES[0];
};

type ViewMode = 'day' | 'week' | 'month';

export const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks, onToggleTask, onAddTask }) => {
  // 当前基准日期：2026-08-21
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 7, 21)); // 8月 (月是0-indexed)
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedCalIds, setSelectedCalIds] = useState<string[]>(['task', 'meeting', 'personal', 'sync']);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('10:00');
  const [newTaskCalId, setNewTaskCalId] = useState('task');

  const toggleCalId = (id: string) => {
    setSelectedCalIds(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // 计算周日-周六的日期范围 (参考图中周日16 ~ 周六22)
  const weekDays = useMemo(() => {
    const current = new Date(selectedDate);
    const dayOfWeek = current.getDay(); // 0 是周日
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

  // 日历小图按月（2026年8月）的前后填补
  const miniCalendarDays = useMemo(() => {
    // 2026年8月1日是周六
    // 上月填充: 7月26-31
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

  // 导航跳转
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

  // 根据订阅日历勾选过滤任务
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const calId = t.calendarId || 'task';
      return selectedCalIds.includes(calId);
    });
  }, [tasks, selectedCalIds]);

  // 新建任务提交
  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !onAddTask) return;
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const calMeta = getCalMeta(newTaskCalId);
    onAddTask(e, {
      title: newTaskTitle,
      date: dateStr,
      startTime: newTaskTime,
      endTime: '11:30',
      dueDate: `8月${selectedDate.getDate()}日 ${newTaskTime}`,
      calendarId: newTaskCalId,
      category: calMeta.name,
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
      <div
        style={{
          width: '260px',
          borderRight: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-sidebar)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          gap: '20px',
          flexShrink: 0,
        }}
      >
        {/* 迷你月历标头 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              2026年8月
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handlePrev}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
              >
                <Icon name="chevron-left" size={14} />
              </button>
              <button
                onClick={handleNext}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
              >
                <Icon name="chevron-right" size={14} />
              </button>
              <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}>
                <Icon name="chevron-up" size={14} />
              </button>
            </div>
          </div>

          {/* 迷你日历星期表头 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
          </div>

          {/* 迷你日历网格 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
            {miniCalendarDays.map((item, idx) => {
              const dateObj = new Date(item.dateStr);
              const isSelected =
                dateObj.getFullYear() === selectedDate.getFullYear() &&
                dateObj.getMonth() === selectedDate.getMonth() &&
                dateObj.getDate() === selectedDate.getDate();

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDate(dateObj)}
                  style={{
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    fontWeight: item.isToday || isSelected ? 600 : 400,
                    color: !item.isCurrentMonth
                      ? 'var(--text-muted)'
                      : isSelected
                      ? '#ffffff'
                      : item.isToday
                      ? 'var(--primary-color)'
                      : 'var(--text-primary)',
                    backgroundColor: isSelected ? 'var(--primary-color)' : item.isToday ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                  }}
                >
                  {item.day}
                </div>
              );
            })}
          </div>
        </div>

        {/* 筛选分组分类：我订阅的 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600 }}>
            <span>我订阅的</span>
            <Icon name="chevron-down" size={12} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {CALENDAR_TYPES.map(cal => {
              const isChecked = selectedCalIds.includes(cal.id);
              return (
                <div
                  key={cal.id}
                  onClick={() => toggleCalId(cal.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: isChecked ? 'var(--text-primary)' : 'var(--text-muted)',
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isChecked ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
                    transition: 'var(--transition-smooth)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={e => e.stopPropagation()} // 防止 label 与 input 重复触发
                    style={{ accentColor: cal.color, cursor: 'pointer', margin: 0 }}
                  />
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: cal.color,
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontWeight: isChecked ? 500 : 400, flex: 1, userSelect: 'none' }}>
                    {cal.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 右侧主日历视图区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {/* 顶部 Header Toolbar */}
        <div
          style={{
            height: '52px',
            borderBottom: '1px solid var(--border-light)',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-card)',
            flexShrink: 0,
          }}
        >
          {/* 左侧今天与前后翻页 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleToday}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 14px',
                height: '30px',
                fontSize: '12px',
                fontWeight: 500,
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap',
              }}
            >
              今天
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={handlePrev}
                style={{
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  width: '30px',
                  height: '30px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <Icon name="chevron-left" size={14} />
              </button>
              <button
                onClick={handleNext}
                style={{
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  width: '30px',
                  height: '30px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <Icon name="chevron-right" size={14} />
              </button>
            </div>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginLeft: '6px' }}>
              {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月
            </span>
          </div>

          {/* 右侧视图切换 (日 / 周 / 月) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-sidebar)',
                padding: '2px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              {(['day', 'week', 'month'] as ViewMode[]).map(mode => {
                const labels: Record<ViewMode, string> = { day: '日', week: '周', month: '月' };
                const isActive = viewMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '26px',
                      padding: '0 14px',
                      fontSize: '12px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                      backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                    }}
                  >
                    {labels[mode]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 视图主体网格区 */}
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {viewMode === 'week' && (
            <div style={{ minWidth: '700px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              {/* 周视图星期/日期标头 */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px repeat(7, 1fr)',
                  borderBottom: '1px solid var(--border-light)',
                  backgroundColor: 'var(--bg-card)',
                  position: 'sticky',
                  top: 0,
                  zIndex: 10,
                }}
              >
                <div style={{ padding: '8px 12px', fontSize: '11px', color: 'var(--text-muted)', borderRight: '1px solid var(--border-light)' }}>
                  GMT+8
                </div>
                {weekDays.map(item => (
                  <div
                    key={item.dateStr}
                    style={{
                      padding: '8px 12px',
                      borderRight: '1px solid var(--border-light)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      backgroundColor: item.isToday ? 'rgba(59, 130, 246, 0.03)' : 'transparent',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        color: item.isToday ? 'var(--primary-color)' : 'var(--text-muted)',
                        fontWeight: item.isToday ? 600 : 400,
                      }}
                    >
                      {item.weekName}
                    </span>
                    <span
                      style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        lineHeight: '1.2',
                        color: item.isToday ? 'var(--primary-color)' : 'var(--text-primary)',
                      }}
                    >
                      {item.dayNum}
                    </span>
                  </div>
                ))}
              </div>

              {/* 时间轴网格与任务卡片 */}
              <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* 时间刻度网格 */}
                {hours.map(hourStr => (
                  <div
                    key={hourStr}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '70px repeat(7, 1fr)',
                      height: '54px',
                      borderBottom: '1px solid var(--border-light)',
                      position: 'relative',
                    }}
                  >
                    {/* 左侧时刻标记 */}
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        padding: '4px 8px',
                        textAlign: 'right',
                        borderRight: '1px solid var(--border-light)',
                      }}
                    >
                      {hourStr}
                    </div>

                    {/* 7天的列单元格 */}
                    {weekDays.map(dayItem => (
                      <div
                        key={dayItem.dateStr}
                        style={{
                          borderRight: '1px solid var(--border-light)',
                          backgroundColor: dayItem.isToday ? 'rgba(59, 130, 246, 0.015)' : 'transparent',
                        }}
                      />
                    ))}
                  </div>
                ))}

                {/* 实时时间参考指示线 (红点与贯穿全屏红线, 参考图中标注 10:50) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '155px', // 位于10:00与11:00之间 (10:50)
                    left: 0,
                    right: 0,
                    display: 'grid',
                    gridTemplateColumns: '70px repeat(7, 1fr)',
                    alignItems: 'center',
                    zIndex: 8,
                    pointerEvents: 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#ef4444',
                      textAlign: 'right',
                      paddingRight: '6px',
                    }}
                  >
                    10:50
                  </div>
                  <div style={{ gridColumn: 'span 7', position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '1.5px',
                        backgroundColor: '#ef4444',
                      }}
                    />
                    {/* 周五 21 处的红点 (根据周五所处的第6列: 5 * 100/7 %) */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '71.4%',
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: '#ef4444',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  </div>
                </div>

                {/* 渲染任务卡片重叠定位层 */}
                {weekDays.map((dayItem, colIdx) => {
                  // 寻找属于该天的任务
                  const dayTasks = filteredTasks.filter(t => t.date === dayItem.dateStr);

                  return (
                    <div
                      key={dayItem.dateStr}
                      style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: `calc(70px + (100% - 70px) * ${colIdx} / 7)`,
                        width: `calc((100% - 70px) / 7)`,
                        pointerEvents: 'none',
                      }}
                    >
                      {dayTasks.map(t => {
                        // 计算基于 08:00 开始的 top 位置与高度
                        const startHour = parseInt(t.startTime?.split(':')[0] || '9', 10);
                        const startMin = parseInt(t.startTime?.split(':')[1] || '0', 10);
                        const endHour = parseInt(t.endTime?.split(':')[0] || '10', 10);
                        const endMin = parseInt(t.endTime?.split(':')[1] || '0', 10);

                        const startOffsetMinutes = (startHour - 8) * 60 + startMin;
                        const durationMinutes = (endHour - startHour) * 60 + (endMin - startMin);

                        const topPx = (startOffsetMinutes / 60) * 54; // 每小时 54px 高度
                        const heightPx = Math.max(36, (durationMinutes / 60) * 54);

                        const calMeta = getCalMeta(t.calendarId);

                        return (
                          <div
                            key={t.id}
                            onClick={() => onToggleTask(t.id)}
                            style={{
                              position: 'absolute',
                              top: `${topPx}px`,
                              height: `${heightPx}px`,
                              left: '4px',
                              right: '4px',
                              backgroundColor:
                                t.status === 'completed'
                                  ? 'var(--bg-sidebar)'
                                  : calMeta.bgTint,
                              borderLeft: `3px solid ${
                                t.status === 'completed'
                                  ? '#10b981'
                                  : calMeta.color
                              }`,
                              borderRadius: 'var(--radius-sm)',
                              padding: '4px 8px',
                              fontSize: '11px',
                              cursor: 'pointer',
                              pointerEvents: 'auto',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              boxShadow: 'var(--shadow-sm)',
                              overflow: 'hidden',
                              transition: 'var(--transition-smooth)',
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: '11px',
                                color: t.status === 'completed' ? 'var(--text-muted)' : 'var(--text-primary)',
                                textDecoration: t.status === 'completed' ? 'line-through' : 'none',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                marginBottom: '2px',
                              }}
                            >
                              {t.title}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '10px' }}>
                              <span style={{ fontWeight: 500 }}>{t.startTime} - {t.endTime}</span>
                              <span
                                style={{
                                  fontSize: '9px',
                                  padding: '1px 5px',
                                  borderRadius: '3px',
                                  backgroundColor: 'var(--bg-card)',
                                  color: calMeta.color,
                                  fontWeight: 600,
                                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                                }}
                              >
                                {calMeta.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 日视图 (Day View) */}
          {viewMode === 'day' && (
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日 计划节点
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredTasks
                  .filter(t => t.date === `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`)
                  .map(t => (
                    <div
                      key={t.id}
                      onClick={() => onToggleTask(t.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            border: t.status === 'completed' ? 'none' : '1.5px solid var(--text-muted)',
                            backgroundColor: t.status === 'completed' ? '#10b981' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {t.status === 'completed' && <Icon name="check" size={10} color="#ffffff" />}
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 500, textDecoration: t.status === 'completed' ? 'line-through' : 'none' }}>
                          {t.title}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {t.startTime} - {t.endTime}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 月视图 (Month View) */}
          {viewMode === 'month' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1, backgroundColor: 'var(--bg-card)' }}>
              {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(w => (
                <div key={w} style={{ padding: '8px', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>
                  {w}
                </div>
              ))}
              {miniCalendarDays.map((item, idx) => {
                const dayTasks = filteredTasks.filter(t => t.date === item.dateStr);
                return (
                  <div
                    key={idx}
                    style={{
                      borderRight: '1px solid var(--border-light)',
                      borderBottom: '1px solid var(--border-light)',
                      padding: '6px',
                      minHeight: '80px',
                      backgroundColor: item.isToday ? 'rgba(59, 130, 246, 0.02)' : 'transparent',
                    }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: item.isToday ? 700 : 400, color: item.isToday ? 'var(--primary-color)' : 'var(--text-secondary)', marginBottom: '4px' }}>
                      {item.day}
                    </div>
                    {dayTasks.map(t => {
                      const calMeta = getCalMeta(t.calendarId);
                      return (
                        <div
                          key={t.id}
                          style={{
                            fontSize: '10px',
                            padding: '2px 4px',
                            borderRadius: '2px',
                            backgroundColor: calMeta.bgTint,
                            color: calMeta.color,
                            borderLeft: `2px solid ${calMeta.color}`,
                            marginBottom: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {t.title}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 快捷新建任务 Modal */}
      {showAddModal && (
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
            onSubmit={handleQuickAdd}
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
                onClick={() => setShowAddModal(false)}
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
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
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
                value={newTaskCalId}
                onChange={e => setNewTaskCalId(e.target.value)}
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
                  value={newTaskTime}
                  onChange={e => setNewTaskTime(e.target.value)}
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
                onClick={() => setShowAddModal(false)}
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
      )}
    </div>
  );
};
