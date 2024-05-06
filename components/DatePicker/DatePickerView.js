class DatePickerView {
  #$datePicker;

  #calendarViewModel;

  #$dateInput;

  constructor($datePicker, viewModel) {
    this.#$datePicker = $datePicker;
    this.#calendarViewModel = viewModel;
    this.#calendarViewModel.Observer.subscribe(this);
    this.initRender();
    this.#$dateInput = this.#$datePicker.querySelector('.date-input');
    this.bindEvents();
  }

  update(data) {
    data.actions === 'selectedDateChanges' && this.changeSelectedDate();
  }

  initRender() {
    const template = document.createElement('template');
    template.innerHTML = `
    <h1 class="date-picker">DatePicker</h1>
    <input class="date-input" type="text" readonly value="Select date" />`;
    this.#$datePicker.appendChild(template.content);
  }

  bindEvents() {
    this.#$datePicker.addEventListener('click', (e) => {
      if (e.target.classList.contains('date-input')) {
        this.onClickDateInput();
      }
    });
  }

  onClickDateInput() {
    this.#calendarViewModel.changeIsCalendarActive(
      !this.#calendarViewModel.getIsCalendarActive()
    );
  }

  changeSelectedDate() {
    this.#$dateInput.value =
      this.#calendarViewModel.getSelectedDate().dataset.date;
  }
}

export default DatePickerView;
