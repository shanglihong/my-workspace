import React from 'react';
import { TaskItem, getCalMeta } from '../../model/types';

export interface WeekViewProps {
  weekDays: Array<{ dateStr: string; weekName: string; dayNum: number; isToday: boolean }>;
  hours: string[];
  filteredTasks: TaskItem[];
  draggedTaskId: string | null;
  dragSnapPreview: {
    dateStr: string;
    startTime: string;
    endTime: string;
    topPx: number;
    heightPx: number;
    colIdx: number;
  } | null;
  weekGridRef: React.RefObject<HTMLDivElement>;
  handleWeekGridDragOver: (e: React.DragEvent) => void;
  handleWeekGridDrop: (e: React.DragEvent) => void;
  handleDragStart: (e: React.DragEvent, taskId: string) => void;
  handleDragEnd: () => void;
  handleOpenEditModalWithCheck: (task: TaskItem) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  weekDays,
  hours,
  filteredTasks,
  draggedTaskId,
  dragSnapPreview,
  weekGridRef,
  handleWeekGridDragOver,
  handleWeekGridDrop,
  handleDragStart,
  handleDragEnd,
  handleOpenEditModalWithCheck,
}) => {
  return (
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
      <div
        ref={weekGridRef}
        onDragOver={handleWeekGridDragOver}
        onDrop={handleWeekGridDrop}
        style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {/* 15分钟高精度拖拽预览高亮框 */}
        {dragSnapPreview && (
          <div
            style={{
              position: 'absolute',
              top: `${dragSnapPreview.topPx}px`,
              height: `${dragSnapPreview.heightPx}px`,
              left: `calc(70px + (100% - 70px) * ${dragSnapPreview.colIdx} / 7 + 4px)`,
              width: `calc((100% - 70px) / 7 - 8px)`,
              backgroundColor: 'rgba(59, 130, 246, 0.22)',
              border: '2px dashed var(--primary-color)',
              borderRadius: 'var(--radius-sm)',
              pointerEvents: 'none',
              zIndex: 20,
              padding: '4px 6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'var(--primary-color)',
              fontWeight: 600,
              fontSize: '11px',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.05s ease-out',
            }}
          >
            <span>调整时刻</span>
            <span>{dragSnapPreview.startTime} - {dragSnapPreview.endTime}</span>
          </div>
        )}

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

        {/* 实时时间参考指示线 */}
        <div
          style={{
            position: 'absolute',
            top: '155px',
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
                const startHour = parseInt(t.startTime?.split(':')[0] || '9', 10);
                const startMin = parseInt(t.startTime?.split(':')[1] || '0', 10);
                const endHour = parseInt(t.endTime?.split(':')[0] || '10', 10);
                const endMin = parseInt(t.endTime?.split(':')[1] || '0', 10);

                const startOffsetMinutes = (startHour - 8) * 60 + startMin;
                const durationMinutes = (endHour - startHour) * 60 + (endMin - startMin);

                const topPx = (startOffsetMinutes / 60) * 54;
                const heightPx = Math.max(36, (durationMinutes / 60) * 54);

                const calMeta = getCalMeta(t.calendarId);

                return (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={e => handleDragStart(e, t.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleOpenEditModalWithCheck(t)}
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
                      cursor: draggedTaskId === t.id ? 'grabbing' : 'grab',
                      opacity: draggedTaskId === t.id ? 0.4 : 1,
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
  );
};
