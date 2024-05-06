import CalendarModel from '../models/CalendarModel.js';
import Observer from '../observers/Observer.js';

class CalendarViewModel {
  #currentYear;

  #currentMonth;

  #calendarData = null;

  #$selectedDate;

  #$isCalendarActive = false;

  constructor() {
    const date = new Date();
    this.#currentYear = date.getFullYear();
    this.#currentMonth = date.getMonth();
    this.Observer = new Observer();
  }

  changeMonth() {
    this.#calendarData = CalendarModel.getCalendarMatrix(
      this.#currentYear,
      this.#currentMonth
    );
    this.Observer.notify({
      actions: 'monthChanges',
    });
  }

  changeSelectedDate(date) {
    console.log(date.dataset.date);
    this.#$selectedDate = date;
    this.Observer.notify({
      actions: 'selectedDateChanges',
    });
  }

  changeIsCalendarActive(check) {
    this.#$isCalendarActive = check;
    this.Observer.notify({
      actions: 'isCalendarActiveChanges',
    });
  }

  afterMonth() {
    this.#currentMonth === 11
      ? ((this.#currentYear += 1), (this.#currentMonth = 0))
      : (this.#currentMonth += 1);

    this.changeMonth();
  }

  beforeMonth() {
    this.#currentMonth === 0
      ? ((this.#currentYear -= 1), (this.#currentMonth = 11))
      : (this.#currentMonth -= 1);

    this.changeMonth();
  }

  getSelectedDate() {
    return this.#$selectedDate;
  }

  getCalendarData() {
    return this.#calendarData;
  }

  getIsCalendarActive() {
    return this.#$isCalendarActive;
  }
}

export default CalendarViewModel;
