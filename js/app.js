(function() {
const timeForm = document.querySelector('.js-time-form');
const timeInput = timeForm.querySelector('.js-time-input');
const timeButton = timeForm.querySelector('.js-timer-button');
const timeError = timeForm.querySelector('.time-input-error');
const clockContainerDiv = document.querySelector('.js-clock-container');
const clockEl = document.querySelector('.js-clock');
const clockButtonsUl = clockContainerDiv.querySelector('.js-clock-buttons');
const playIcon = clockContainerDiv.querySelector('.js-play-icon');
const pauseIcon = clockContainerDiv.querySelector('.js-pause-icon');
let medTimer;
let seconds, secondsLeft;

timeForm.addEventListener('submit', event => {
  event.preventDefault();
  processTimeForm(event);
});

clockButtonsUl.addEventListener('click', event => {
  if (event.target.classList.contains('inactive-icon')) {
    return;
  }
  if (event.target.classList.contains('js-play-icon')) {
    play(event);
  } else if (event.target.classList.contains('js-pause-icon')) {
    pause(event);
  } else if (event.target.classList.contains('js-stop-icon')) {
    stop();
  } else if (event.target.classList.contains('js-restart-icon')) {
    console.log('restart');
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

function pause(event) {
  event.target.classList.add('inactive-icon');
  playIcon.classList.remove('inactive-icon');
  clearInterval(medTimer);
}

function play(event) {
  event.target.classList.add('inactive-icon');
  pauseIcon.classList.remove('inactive-icon');
  timer(secondsLeft);
}

function stop() {
  clearInterval(medTimer);
  medTimer = null;
  toggleClock();
  toggleTimeForm();
  // If you pause before clicking stop, make sure
  // play button will be disabled and pause button
  // enabled next time you start the clock.
  if (pauseIcon.classList.contains('inactive-icon')) {
    playIcon.classList.add('inactive-icon');
    pauseIcon.classList.remove('inactive-icon');
  }
}
})()