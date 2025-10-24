
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');


let startTime = 0;     
let elapsedTime = 0;   
let timerInterval;      
let isRunning = false;  



function start() {
    if (isRunning) return;

    isRunning = true;

    startTime = Date.now() - elapsedTime;

   
    timerInterval = setInterval(updateTime, 10);
}

function pause() {
    if (!isRunning) return;

    isRunning = false;
   
    clearInterval(timerInterval);

}

function reset() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    startTime = 0; 
    
   
    display.textContent = "00:00:00";
   
    lapsList.innerHTML = "";
}

function lap() {
    if (!isRunning) return;


    const lapItem = document.createElement('li');

    lapItem.textContent = display.textContent;

    lapsList.prepend(lapItem);
}



function updateTime() {
   
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

   
    let totalMilliseconds = elapsedTime;
    
    let minutes = Math.floor(totalMilliseconds / (1000 * 60));
    totalMilliseconds %= (1000 * 60);
    
    let seconds = Math.floor(totalMilliseconds / 1000);
    totalMilliseconds %= 1000;
    
    let milliseconds = totalMilliseconds;

  
    display.textContent = 
        `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
}


function formatTime(time) {
    return time.toString().padStart(2, '0');
}


function formatMilliseconds(time) {
    return time.toString().padStart(3, '0');
}


startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);