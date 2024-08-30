// script.js
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let running = false;

const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');

function updateDisplay() {
    millisecondsDisplay.textContent = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
}

function startPauseStopwatch() {
    if (!running) {
        interval = setInterval(() => {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
        startPauseBtn.textContent = 'Pause';
    } else {
        clearInterval(interval);
        startPauseBtn.textContent = 'Start';
    }
    running = !running;
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    updateDisplay();
    startPauseBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}

startPauseBtn.addEventListener('click', startPauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
