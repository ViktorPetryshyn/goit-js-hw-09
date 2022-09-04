import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let deltaTime = 0;
let active = false;
const DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] - Date.now() <= 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    deltaTime = selectedDates[0] - Date.now();
  },
};

const calendar = flatpickr('#datetime-picker', options);

const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutsEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  if (deltaTime === 0) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  if (active) return;
  active = !active;

  const interval = setInterval(() => {
    chengTimer(convertMs(deltaTime));
    deltaTime -= DELAY;

    if (deltaTime <= 0) {
      clearInterval(interval);
      deltaTime = 0;
      active = !active;
      return;
    }
  }, DELAY);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function chengTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutsEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}

function pad(value) {
  return String(value).padStart(2, '0');
}
