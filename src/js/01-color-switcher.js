const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bgColor: document.body,
};
let timerId = null;

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(() => {
    refs.bgColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonActiveSwith();
}

function onStopBtnClick() {
  clearInterval(timerId);
  buttonActiveSwith();
}

function buttonActiveSwith() {
  refs.stopBtn.disabled = !refs.stopBtn.disabled;
  refs.startBtn.disabled = !refs.startBtn.disabled;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
