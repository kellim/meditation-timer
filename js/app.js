(function() {
const timeForm = document.querySelector('.js-time-form');
const timeInput = timeForm.querySelector('.js-time-input');
const timeButton = timeForm.querySelector('.js-timer-button');
const timeError = timeForm.querySelector('.time-input-error');
const clockContainerDiv = document.querySelector('.js-clock-container');
const clockEl = document.querySelector('.js-clock');
let medTimer;
let seconds;

timeForm.addEventListener('submit', event => {
  event.preventDefault();
  processTimeForm(event);
})


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
  toggleTimeForm();
  toggleClock();
  displayTime(seconds);
  medTimer = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
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

})()