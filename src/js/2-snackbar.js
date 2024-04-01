// iziToast - Бібліотека повідомлень
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Шукаємо форму та її елементи
const formEl = document.querySelector('.form');
const delayEl = document.querySelector('input');

function createPromise(event) {
  event.preventDefault();
  const delay = parseFloat(delayEl.value);
  const state = formEl.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    // Визначаємо, чи проміс виконується відхиляється
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
      }, delay);
    } else {
      setTimeout(() => {
        reject(delay);
        iziToast.show({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
      }, delay);
    }
  });
}

// Додаємо слухача події на форму
formEl.addEventListener('submit', createPromise);
