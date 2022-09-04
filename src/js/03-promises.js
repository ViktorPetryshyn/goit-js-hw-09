import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let totalDelay = Number(e.currentTarget.elements['delay'].value);
  const stepDelay = Number(e.currentTarget.elements['step'].value);
  const amount = Number(e.currentTarget.elements['amount'].value);

  if (totalDelay < 0 || stepDelay < 0 || amount < 0) {
    Notify.failure('Все значения должны быть больше 0');
    return;
  }

  for (let i = 1; i <= amount; i += 1) {
    const promise = createPromise(i, totalDelay);
    promise
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += stepDelay;
    console.log(i, totalDelay);
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}
