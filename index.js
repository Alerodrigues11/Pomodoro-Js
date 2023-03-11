let startInput = '';
let firstBreak = '';
let secondBreak = '';


/* FIELDS */
const saveChanges = document.getElementById('save__changes');

/* CONFIG */

const config = document.getElementById('config');
config.addEventListener('click', () => {
  document.querySelector('.config__details').style.height = '50%';
  document.getElementById('config__fields').classList.add('show');

});

/* SAVE CHANGES */

saveChanges.addEventListener('click', () => {
  startInput = document.getElementById('start__input').value + ":00";
  firstBreak = document.getElementById('first__break').value + ":00";
  secondBreak = document.getElementById('second__break').value + ":00";

  document.querySelector('.config__details').style.height = '0';
  document.getElementById('config__fields').classList.remove('show');


  console.log(startInput, firstBreak, secondBreak)
})

/* POMODORO, SHORT BREAK AND LONG BREAK */

const pomodoro = document.getElementById('pomodoro');
const shortBreak = document.getElementById('short__break');
const longBreak = document.getElementById('long__break');
const timer = document.getElementById('timer')

function setting (ev) {
  console.log(ev.target.textContent)
  if(ev.target.textContent == 'Pomodoro') {
    if(startInput != '') {
      timer.innerText = startInput;
      clearTimeout(intervalId);
    }
  } else if (ev.target.textContent == 'Short Break') {
    if(firstBreak != '') {
      timer.innerText = firstBreak;
      clearTimeout(intervalId);
    }
  } else {
    if(secondBreak != '') {
      timer.innerText = secondBreak;
      clearTimeout(intervalId);
    }
  }
}

pomodoro.addEventListener('click', setting);
shortBreak.addEventListener('click', setting);
longBreak.addEventListener('click', setting);

/* TIMER */

let intervalId;

function startTimer () {
  let timerInteger = parseInt(timer.innerText)
  let timerValue = timerInteger * 60;
  intervalId = setInterval(() => {
    timerValue--;
    let minutes = Math.floor(timerValue / 60);
    let seconds = timerValue % 60;
    let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timer.innerText = formattedTime;
  }, 1000);
}

/* START, RESET */

const start = document.getElementById('start');
const reset = document.getElementById('reset');

start.addEventListener('click', startTimer);



