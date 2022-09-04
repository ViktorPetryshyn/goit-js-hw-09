import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let isActive = false;
let intervalLeftTime = null;
let interimDateMs = 0;
const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
  inputCalendar: document.querySelector('#datetime-picker'),
};
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', countdownTimer);
// refs.inputCalendar.addEventListener('click',stopCountdownTimerWhenOpenCalendar);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      refs.startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future', {
        position: 'center-center',
      });
      np;
    }
    interimDateMs = selectedDates[0] - currentDate;
  },
};
const calendar = flatpickr('#datetime-picker', options);
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
function countdownTimer() {
  if (isActive) return;
  isActive = true;
  intervalLeftTime = setInterval(() => {
    interimDateMs -= 1000;
    const timeLeft = convertMs(interimDateMs);
    userOutputTimer(timeLeft);
    stopCountdownTimer(interimDateMs);
  }, 1000);
}
function stopCountdownTimer(ms) {
  if (ms < 1000) {
    clearInterval(intervalLeftTime);
    ms = 0;
    refs.startBtn.disabled = true;
    return;
  }
}
// function stopCountdownTimerWhenOpenCalendar() {
//   clearInterval(intervalLeftTime);
//   ms = 0;
//   refs.startBtn.disabled = true;
//   refs.daysSpan.textContent = '00';
//   refs.hoursSpan.textContent = '00';
//   refs.minutesSpan.textContent = '00';
//   refs.secondsSpan.textContent = '00';
//   return;
// }
function pad(value) {
  return String(value).padStart(2, '0');
}
function userOutputTimer(time) {
  const { days, hours, minutes, seconds } = time;
  refs.daysSpan.textContent = `${days}`;
  refs.hoursSpan.textContent = `${hours}`;
  refs.minutesSpan.textContent = `${minutes}`;
  refs.secondsSpan.textContent = `${seconds}`;
}
