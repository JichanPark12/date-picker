import CONFIG from '../constants/config.js';

export const CorrectCalendarSize = (startDayOfWeek, LastDay) =>
  CONFIG.calendarSize.filter(
    (calendarSize) => startDayOfWeek + LastDay <= calendarSize
  )[0];
