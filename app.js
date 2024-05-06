import CalendarView from './components/Calendar/CalendarView.js';
import DatePickerView from './components/DatePicker/DatePickerView.js';
import CalendarViewModel from './viewModels/CalendarViewModel.js';

class App {
  #$container;

  #CalendarView;

  #DatePickerView;

  #CalendarViewModel;

  constructor($container) {
    this.#$container = $container;
    this.initRender();
    this.bindEvents();
    this.#CalendarViewModel = new CalendarViewModel();
    this.#DatePickerView = new DatePickerView(
      $container.querySelector('.date-picker-container'),
      this.#CalendarViewModel
    );
    this.#CalendarView = new CalendarView(
      $container.querySelector('.calendar'),
      this.#CalendarViewModel
    );
  }

  initRender() {
    const template = document.createElement('template');
    template.innerHTML = `
    <div class="date-picker-container"></div>
    <div class="calendar hidden"></div>`;
    this.#$container.appendChild(template.content);
  }

  bindEvents() {
    window.addEventListener('click', (e) => {
      switch (true) {
        case !!e.target.closest('.calendar') ||
          !!e.target.closest('.date-input'):
          return;

        default: {
          this.#CalendarViewModel.changeIsCalendarActive(false);
        }
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const $containers = document.querySelectorAll('.container');

  $containers.forEach(($container) => {
    const calendar = new App($container);
  });
});
