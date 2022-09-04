import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', getDataFromAllFields);

function getDataFromAllFields(e) {
  e.preventDefault();

  let toatalDelay = +refs.form.querySelector('[name="delay"]').value;
  const step = +refs.form.querySelector('[name="step"]').value;
  const amount = +refs.form.querySelector('[name="amount"]').value;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, toatalDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          position: 'center-center',
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          position: 'center-center',
        });
      });

    toatalDelay += step;
  }
  e.target.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return (promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  }));
}
