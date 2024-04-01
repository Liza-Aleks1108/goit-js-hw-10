// Бібліотека flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// iziToast - Бібліотека повідомлень
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Шукаємо input #datetime-picker та button,
const datetimePicker = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button');
buttonEl.disabled = true;

// Посилання на елементи DOM для відображення значень таймера
let daysEl = document.querySelector('[data-days]');
let hoursEl = document.querySelector('[data-hours]');
let minutesEl = document.querySelector('[data-minutes]');
let secondsEl = document.querySelector('[data-seconds]');

// userSelectedDate, currentDate
let userSelectedDate = new Date();
let currentDate = new Date();

// Options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);
    checkSelectedDate();
  },
};

// Перевіряємо, яку дату ввів користувач
function checkSelectedDate() {
  if (userSelectedDate.valueOf() < currentDate.valueOf()) {
    buttonEl.disabled = true;
    iziToast.show({
      title: 'Error',
      titleColor: 'white',
      message: 'Please choose a date in the future',
      messageColor: 'white',
      color: 'red',
      position: 'topRight',
    });
  } else {
    buttonEl.disabled = false;
  }
}

function startCountdown() {
  const countdownInterval = setInterval(() => {
    const ms = userSelectedDate - new Date();
    if (ms <= 0) {
      clearInterval(countdownInterval);
      // buttonEl.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(ms);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);

  // Відключаємо кнопку та інпут
  buttonEl.disabled = true;
  datetimePicker.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(days, hours, minutes, seconds) {
  // Я використовую тернарний оператор замість padStart()
  daysEl.textContent = days < 10 ? '0' + days : days;
  hoursEl.textContent = hours < 10 ? '0' + hours : hours;
  minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
}

// Додаємо слухача події на кнопку
buttonEl.addEventListener('click', startCountdown);
// Викликаємо flatpickr
flatpickr(datetimePicker, options);
