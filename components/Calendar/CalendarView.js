import CONFIG from '../../constants/config.js';
import { isToday } from '../../utils/dateUtil.js';

class CalendarView {
  #calendarViewModel;

  #$calendar;

  constructor($calendar, viewModel) {
    this.#$calendar = $calendar;
    this.#calendarViewModel = viewModel;
    this.#calendarViewModel.Observer.subscribe(this);
    this.initRender();
    this.bindClickHandlers();
  }

  update(data) {
    data.actions === 'monthChanges' &&
      this.calendarRender(this.#calendarViewModel.getCalendarData());
    data.actions === 'selectedDateChanges' &&
      this.selectedRender(this.#calendarViewModel.getSelectedDate());
    data.actions === 'isCalendarActiveChanges' && this.checkAndRenderCalendar();
  }

  initRender() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="calendar-nav">
        <div class="before-btn"></div>
        <div class="year-month-container">
          <div class="month"></div>
          <div class="year"></div>
        </div>
        <div class="after-btn"></div>
      </div>
      <div class="calendar-grid">
        <ul class="day-of-week-container">
          ${CONFIG.dayOfWeek
            .map((day) => `<li class="day-of-week">${day}</li>`)
            .join('')}
        </ul>
        <ul class="days-container"></ul>
      </div>
    </div>
    `;
    this.#$calendar.appendChild(template.content);
    this.#calendarViewModel.changeMonth();
  }

  calendarRender(data) {
    this.yearRender(data);
    this.monthRender(data);
    this.daysRender(data);
  }

  yearRender({ year }) {
    const $year = this.#$calendar.querySelector('.year');
    $year.textContent = year;
  }

  monthRender({ month }) {
    const $month = this.#$calendar.querySelector('.month');
    $month.textContent = CONFIG.months[month];
  }

  daysRender({ dayInfoList }) {
    const $daysContainer = this.#$calendar.querySelector('.days-container');

    $daysContainer.innerHTML = dayInfoList
      .map((day, idx) =>
        // prettier-ignore
        {
        const [targetYear,targetMonth,targetDay] = day.split("-")
        
          
        const SELECTED_DATE = this.#calendarViewModel.getSelectedDate();
        const classList = [];
        
        day.split("-") === SELECTED_DATE?.data?.date && classList.push('selected');
        idx % 7 === 0 && classList.push('weekEnd');
        isToday(new Date(targetYear, targetMonth -1, targetDay)) && classList.push('today');
        Math.abs(targetDay - idx) > 6 && classList.push('not-current-month');

        return `<li class="day ${classList.join(' ')}" data-date=${day}>${+targetDay}</li>`;
        }
      )
      .join(' ');
  }

  selectedRender(data) {
    const $selectedDate = this.#$calendar.querySelector('.selected');
    $selectedDate && $selectedDate.classList.remove('selected');

    data.classList.add('selected');
  }

  bindClickHandlers() {
    this.#$calendar.addEventListener('click', (e) => {
      // eslint-disable-next-line default-case
      switch (true) {
        case e.target.classList.contains('before-btn'):
          this.onClickBeforeBtn();
          return;
        case e.target.classList.contains('after-btn'):
          this.onClickAfterBtn();
          return;
        case e.target.classList.contains('day'):
          this.onClickDay(e);
      }
    });
  }

  onClickBeforeBtn() {
    this.#calendarViewModel.beforeMonth();
  }

  onClickAfterBtn() {
    this.#calendarViewModel.afterMonth();
  }

  onClickDay(e) {
    this.#calendarViewModel.changeIsCalendarActive(false);
    this.#calendarViewModel.changeSelectedDate(e.target);
  }

  toggleCalendarHidden() {
    this.#$calendar.classList.toggle('hidden');
  }

  checkAndRenderCalendar() {
    this.#$calendar.classList.toggle(
      'hidden',
      !this.#calendarViewModel.getIsCalendarActive()
    );
  }

  calenderHidden() {
    this.#$calendar.classList.add('hidden');
  }
}

export default CalendarView;
