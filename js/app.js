(function() {
const timeForm = document.querySelector('.js-time-form');
const timeInput = timeForm.querySelector('.js-time-input');
const timeButton = timeForm.querySelector('.js-timer-button');
const timeError = timeForm.querySelector('.time-input-error');
const clockContainerDiv = document.querySelector('.js-clock-container');
const clockEl = document.querySelector('.js-clock');
const clockButtonsUl = clockContainerDiv.querySelector('.js-clock-buttons');
const playButton = clockContainerDiv.querySelector('.js-play-button');
const pauseButton = clockContainerDiv.querySelector('.js-pause-button');
const modalDiv = document.querySelector('.js-modal');
const modalCloseBtn = modalDiv.querySelector('.js-modal-close-button');
const modalBtn = modalDiv.querySelector('.js-modal-button')
let medTimer;
let seconds, secondsLeft;



timeForm.addEventListener('submit', event => {
  event.preventDefault();
  processTimeForm(event);
});

modalCloseBtn.addEventListener('click', closeModal);
modalBtn.addEventListener('click', closeModal);

clockButtonsUl.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (!clockButtonsUl.contains(button)) return;
  if (button.disabled) return;
  if (button.classList.contains('js-play-button')) {
    console.log('play')
    play(button);
  } else if (button.classList.contains('js-pause-button')) {
    console.log('pause')
    pause(button);
  } else if (button.classList.contains('js-stop-button')) {
    console.log('stop')
    stop();
  } else if (button.classList.contains('js-restart-button')) {
    console.log('restart')
    restart();
  }
});


function processTimeForm(event) {
  timeError.innerText = '';
  const timeInputValue = timeInput.value;
  if (timeInputValue < 1 || timeInputValue > 999) {
    timeError.innerText = 'Enter a number between 1 and 999.'
    return;
  }
  if (medTimer) {
    clearInterval(medTimer);
  }
  seconds = timeInputValue * 60; 
  timer(seconds);
}

// Adapted code from Vanilla JS Countdown Timer - #JavaScript30 29/30
// https://www.youtube.com/watch?v=LAaf7-WuJJQ which explains how to 
// create an accurate timer.
function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  if (!medTimer) {
    toggleTimeForm();
    toggleClock();
  }

  displayTime(seconds);
  medTimer = setInterval(() => {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(medTimer);
      openModal();
    }
    displayTime(secondsLeft);
  }, 1000)
}

function displayTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(((seconds % 3600) / 60));
  const displaySeconds = seconds % 60;
  clockEl.innerText = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + displaySeconds).slice(-2)}`;
}

function toggleTimeForm() {
  timeForm.style.display = window.getComputedStyle(timeForm).display === 'block' ? 'none' : 'block';
}

function toggleClock() {
  clockContainerDiv.style.display = window.getComputedStyle(clockContainerDiv).display === 'block' ? 'none' : 'block';
}

function pause(btn) {
  // enable play button, disable pause button
  btn.disabled = 'true';
  playButton.disabled = '';
  clearInterval(medTimer);
}

function enablePauseButton() {
  if (pauseButton.disabled) {
    playButton.disabled = 'true';
    pauseButton.disabled = '';
  }
}

function play(btn) {
  enablePauseButton();
  // btn.classList.add('inactive-button');
  // pauseButton.classList.remove('inactive-button');
  timer(secondsLeft);
}

function stop() {
  clearInterval(medTimer);
  medTimer = null;
  toggleClock();
  toggleTimeForm();
  // The pause button must be enabled when stopping the game
  enablePauseButton();
}

function restart() {
  // The pause button must be enabled upon restart.
  enablePauseButton();
  clearInterval(medTimer);
  timer(seconds);
}

function closeModal() {
  modalDiv.style.display = 'none';
  stop();
}

function openModal() {
  modalDiv.style.display = 'block';
}

})()