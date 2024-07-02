

let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval = null;
let running = false;
let lapCounter = 1;

const display = document.getElementById('time-display');
const lapList = document.getElementById('lap-list');

document.getElementById('start-btn').addEventListener('click', start);
document.getElementById('stop-btn').addEventListener('click', stop);
document.getElementById('reset-btn').addEventListener('click', reset);
document.getElementById('lap-btn').addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(interval);
    running = false;
    startTime = 0;
    difference = 0;
    display.textContent = '00:00:00.00';
    lapList.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapList.appendChild(lapTime);
        lapCounter++;
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(ms) {
    const milliseconds = parseInt((ms % 1000) / 10);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return (
        (hours > 9 ? hours : "0" + hours) + ":" +
        (minutes > 9 ? minutes : "0" + minutes) + ":" +
        (seconds > 9 ? seconds : "0" + seconds) + "." +
        (milliseconds > 9 ? milliseconds : "0" + milliseconds)
    );
}
