/* DEFAULT */
let startInput = '30:00';
let firstBreak = '05:00';
let secondBreak = '15:00';


/* FIELDS */
const saveChanges = document.getElementById('save__changes');

/* CONFIG */
const config = document.getElementById('config');
config.addEventListener('click', () => {
  document.querySelector('.config__details').style.height = '50%';
  document.getElementById('config__fields').classList.add('show');

});

/* SAVE CHANGES */

function formattedSaveChanges (changes) {
  return changes < 10 ? `0${changes}:00` : `${changes}:00`;
}

saveChanges.addEventListener('click', () => {
  startInput = document.getElementById('start__input').value === '' ? startInput : formattedSaveChanges(document.getElementById('start__input').value);
  firstBreak = document.getElementById('first__break').value === '' ? firstBreak : formattedSaveChanges(document.getElementById('firstBreak').value);
  secondBreak = document.getElementById('second__break').value === '' ? secondBreak : formattedSaveChanges(document.getElementById('secondBreak').value);

  timer.innerText = startInput;
  document.querySelector('.config__details').style.height = '0';
  document.getElementById('config__fields').classList.remove('show');

  pomodoro.classList.add('active');
  shortBreak.classList.remove('active');
  longBreak.classList.remove('active');
})


/* POMODORO, SHORT BREAK AND LONG BREAK */
const pomodoro = document.getElementById('pomodoro');
const shortBreak = document.getElementById('short__break');
const longBreak = document.getElementById('long__break');
const timer = document.getElementById('timer')

function setting (ev) {
  if(ev.target.textContent == 'Pomodoro') {
    if(startInput != '') {
      timer.innerText = startInput;
      clearTimeout(intervalId);
      timerValue = '';
      start.textContent = 'Start';
      ev.target.classList.add('active');
      shortBreak.classList.remove('active');
      longBreak.classList.remove('active');
    }
  } else if (ev.target.textContent == 'Short Break') {
    if(firstBreak != '') {
      timer.innerText = firstBreak;
      clearTimeout(intervalId);
      timerValue = '';
      start.textContent = 'Start';
      ev.target.classList.add('active');
      pomodoro.classList.remove('active');
      longBreak.classList.remove('active');
    }
  } else {
    if(secondBreak != '') {
      timer.innerText = secondBreak;
      clearTimeout(intervalId);
      timerValue = '';
      start.textContent = 'Start';
      ev.target.classList.add('active');
      pomodoro.classList.remove('active');
      shortBreak.classList.remove('active');
    }
  }
}

pomodoro.addEventListener('click', setting);
shortBreak.addEventListener('click', setting);
longBreak.addEventListener('click', setting);

/* TIMER, START, RESET */
const start = document.getElementById('start');
const reset = document.getElementById('reset');

function switchField (time) {
  if(pomodoro.classList.contains('active') && time == `00:00`) {
      clearTimeout(intervalId);
      timer.innerText = firstBreak;
      pomodoro.classList.remove('active');
      shortBreak.classList.add('active');
  } else if (shortBreak.classList.contains('active') && time == `00:00`) {
      clearTimeout(intervalId);
      timer.innerText = startInput;
      shortBreak.classList.remove('active');
      pomodoro.classList.add('active');
  } else if (longBreak.classList.contains('active') && time == `00:00`) {
      clearTimeout(intervalId);
      timer.innerText = startInput;
      longBreak.classList.remove('active');
      pomodoro.classList.add('active');
  }
}

let intervalId;
let timerValue;

function startTimer () {
  if(start.textContent === 'Start') {
    let timerInteger = parseInt(timer.innerText);
    start.textContent = 'Pause';
    timerValue = timerValue || timerInteger * 60;
    intervalId = setInterval(() => {
      timerValue--;
      let minutes = Math.floor(timerValue / 60);
      let seconds = timerValue % 60;
      let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      timer.innerText = formattedTime;
      switchField(formattedTime);
    }, 1000);
  } else {
    start.textContent = 'Start';
    clearInterval(intervalId);
  }
  
}

function resetTimer () {
  clearTimeout(intervalId);
  startInput = '30:00';
  firstBreak = '05:00';
  secondBreak = '15:00'; 
  timer.innerHTML = '30:00';
}

start.addEventListener('click', startTimer);
reset.addEventListener('click', resetTimer);




