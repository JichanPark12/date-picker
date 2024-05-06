export const getLastDay = (year, month) =>
  new Date(year, month + 1, 0).getDate();

export const getStartDayOfWeek = (year, month) =>
  new Date(year, month, 1).getDay();

export const isDayOfWeekInDay = (dayOfWeek, day) => dayOfWeek.includes(day);

export const isToday = (date) =>
  new Date().toDateString() === date.toDateString();

export const formatDate = (date) =>
  // prettier-ignore
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2, '0')}`;
