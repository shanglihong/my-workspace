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

export type ViewMode = 'day' | 'week' | 'month';
