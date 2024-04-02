// iziToast - Бібліотека повідомлень
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Шукаємо форму та її елементи
const formEl = document.querySelector('.form');
const delayInput = formEl.querySelector('input[name="delay"]');

function createPromise(event) {
  event.preventDefault();
  const delay = parseInt(delayInput.value);
  const state = formEl.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    // Визначаємо, чи проміс виконується відхиляється
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  // Викликаємо iziToast у .then() або .catch() для відповідного стану промісу
  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
}

// Додаємо слухача події на форму
formEl.addEventListener('submit', createPromise);
