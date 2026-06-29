import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWithinInterval,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  startOfWeek,
  endOfWeek,
  differenceInDays
} from 'date-fns';

export default function LeagueCalendar({ startDateStr, endDateStr }) {
  // Parse league start/end dates
  const startDate = parseISO(startDateStr);
  const endDate = parseISO(endDateStr);

  // Get "today" from user's machine
  const today = new Date();

  // Initialize view month to today if within range, otherwise start date
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (isWithinInterval(today, { start: startDate, end: endDate })) {
      return startOfMonth(today);
    }
    return startOfMonth(startDate);
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  // Grid dates starting from Sunday (weekStartsOn: 0)
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  // Calculate league progress metrics
  const totalDays = differenceInDays(endDate, startDate) + 1;
  const elapsedDays = Math.max(0, Math.min(totalDays, differenceInDays(today, startDate) + 1));
  const progressPercent = Math.round((elapsedDays / totalDays) * 100);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="d-flex flex-column gap-4">
      {/* Month Navigation */}
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="m-0 fw-bold" style={{ color: '#dce3f1' }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h5>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handlePrevMonth}
            style={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#dce3f1',
              padding: '4px 8px'
            }}
          >
            <FiChevronLeft size={16} />
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleNextMonth}
            style={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#dce3f1',
              padding: '4px 8px'
            }}
          >
            <FiChevronRight size={16} />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="grid-calendar-header mb-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center' }}>
          {weekdays.map((day, idx) => (
            <div key={idx} className="text-subtle fw-bold" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid-calendar-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {days.map((day, idx) => {
            const isCurrentMonth = isSameDay(startOfMonth(day), monthStart);
            const inRange = isWithinInterval(day, { start: startDate, end: endDate });
            const isToday = isSameDay(day, today);

            // Determine background & borders
            let cellStyle = {
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              borderRadius: '6px',
              position: 'relative',
              cursor: 'default',
              userSelect: 'none'
            };

            let textColor = '#fff';
            if (!isCurrentMonth) {
              if (inRange) {
                textColor = 'rgba(0, 229, 255, 0.4)';
              } else {
                textColor = 'rgba(255, 255, 255, 0.2)';
              }
            } else if (inRange) {
              textColor = '#00E5FF';
            } else {
              textColor = 'rgba(255, 255, 255, 0.7)';
            }

            let bg = 'transparent';
            let border = 'none';
            if (inRange) {
              if (isCurrentMonth) {
                bg = 'rgba(0, 229, 255, 0.08)';
              } else {
                bg = 'rgba(0, 229, 255, 0.02)';
                border = '1px dashed rgba(0, 229, 255, 0.2)';
              }
            }

            if (isToday) {
              border = '2px solid #00E5FF';
              cellStyle.boxShadow = '0 0 10px rgba(0, 229, 255, 0.4)';
            }

            return (
              <div
                key={idx}
                style={{
                  ...cellStyle,
                  backgroundColor: bg,
                  border: border,
                  color: textColor
                }}
              >
                {format(day, 'd')}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <div className="d-flex justify-content-between align-items-center mb-2" style={{ fontSize: '0.8rem' }}>
          <span className="fw-bold" style={{ color: '#dce3f1' }}>League Progress</span>
          <span className="text-subtle">{progressPercent}% Complete</span>
        </div>
        <div
          style={{
            height: '6px',
            backgroundColor: '#1F222C',
            borderRadius: '3px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: '#00E5FF',
              boxShadow: '0 0 8px rgba(0, 229, 255, 0.5)',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        <div className="d-flex justify-content-between mt-2 text-subtle" style={{ fontSize: '0.75rem' }}>
          <span>Start: {format(startDate, 'MMM d')}</span>
          <span>Today: {format(today, 'MMM d')}</span>
          <span>End: {format(endDate, 'MMM d')}</span>
        </div>
      </div>
    </div>
  );
}
