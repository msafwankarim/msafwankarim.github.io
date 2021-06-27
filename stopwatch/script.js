const startbtn = document.querySelector(".play");
const resetbtn = document.querySelector(".reset");
const resetbtn_icon = document.querySelector(".resetbtn-icon");
const minspan = document.querySelector("#minute");
const secspan = document.querySelector("#seconds");
let mins = 0, secs = 0;

let timerStarted = false;

let stopwatchTimer;
startbtn.addEventListener("click", e => {
    if (!timerStarted) {
        stopwatchTimer = setInterval(() => {
            secs++;
            if(secs >= 60) { 
                mins++;
                secs %= 60;
            }
            minspan.textContent = (mins < 10) ? `0${mins}`: `${mins}`;
            secspan.textContent = (secs < 10) ? `0${secs}` : `${secs}`;
        }, 1000);
        
        resetbtn_icon.textContent = 'stop';
        timerStarted = true;
        
    }
});

resetbtn.addEventListener("click", e => {
    if (resetbtn_icon.textContent == 'stop') {
        clearInterval(stopwatchTimer);
        resetbtn_icon.textContent = 'replay'
        timerStarted = false;
    }
    else if(resetbtn_icon.textContent == 'replay'){
        minspan.textContent ="00";
        secspan.textContent = "00";
        mins = 0;
        secs = 0;
    }
});