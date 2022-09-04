const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let switchTimer = null;
// let switchColor = false;
refs.startBtn.addEventListener('click', switchBodyBackgroundcolor);
refs.stopBtn.addEventListener('click', unswitchBodyBackgroundcolor);
function switchBodyBackgroundcolor() {
  //   if (switchColor) {
  //     return;
  //   }
  refs.startBtn.setAttribute('disabled', true);
  //   switchColor = true;
  switchTimer = setInterval(setBodyBackgroundcolor, 1000);
}
function setBodyBackgroundcolor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function unswitchBodyBackgroundcolor() {
  refs.startBtn.removeAttribute('disabled');
  //   switchColor = false;
  refs.body.style.backgroundColor = '#fff';
  clearInterval(switchTimer);
}
