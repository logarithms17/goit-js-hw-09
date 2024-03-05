import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

const { form, delay, step, amount } = refs;

form.addEventListener('submit', promiseGenerator);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay } ); // object from promise result
      } else {
        reject({ position, delay }); // object from promise result
      }
    }, delay);
  });
}

function promiseGenerator(event) {
  event.preventDefault();
  let delayValue = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, delayValue) // result is promise
      .then(({ position, delay }) => { // we need .then to get the data from promise if fulfilled
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => { // we need .catch to get the data from promise if failed
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += Number(step.value);
  }
}

