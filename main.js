//0 padding for the clock
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

  //functions to increase/decrease the time in the clocks
function timeIncrease(element){
    element.textContent = (Number(element.textContent) + 1).pad(2);
    return element.textContent;
}
function timeDecrease(element){
    element.textContent = (Number(element.textContent) - 1).pad(2);
    return element.textContent;
}

//starts a countdown on the main clock
function countDown(){
    if(mainMinutes.textContent == '-1' && SessionRestFlag > 0){
        mainMinutes.textContent = minuteRest.textContent;
        mainSeconds.textContent = '00';
        playAudio();
        sessionStatus.textContent = "Rest!"
        SessionRestFlag = -SessionRestFlag;
    }else if(mainMinutes.textContent == '-1' && SessionRestFlag < 0){
        mainMinutes.textContent = '25';
        mainSeconds.textContent = '00';
        playAudio();
        sessionStatus.textContent = "Stopped";
        enable();
        pauseFlag = 1;
        SessionRestFlag = -SessionRestFlag;
        stopFunction();
    }else if(mainSeconds.textContent == '00'){
        mainSeconds.textContent = '59';
        timeDecrease(mainMinutes);
    }else{
        timeDecrease(mainSeconds)
}}

//stops countdown
function stopFunction(){
    clearInterval(pomodoroSession);
    clearInterval(restSession);
}

//disable and enable buttons
function disable(){
    upTimer.setAttribute("disabled","disabled");
    downTimer.setAttribute("disabled","disabled");
    upRest.setAttribute("disabled","disabled");
    downRest.setAttribute("disabled","disabled");
    defaultTimer.setAttribute("disabled","disabled");
    defaultReset.setAttribute("disabled","disabled");
    start.setAttribute("disabled","disabled");
}
function enable(){
    upTimer.removeAttribute("disabled");
    downTimer.removeAttribute("disabled");
    upRest.removeAttribute("disabled");
    downRest.removeAttribute("disabled");
    defaultTimer.removeAttribute("disabled");
    defaultReset.removeAttribute("disabled");
    start.removeAttribute("disabled");
}

//play audio functions
function playAudio(){
    clickSound.play();
}

//starting values for the clock
const minuteTimer = document.querySelector('#minute-timer');
const minuteRest = document.querySelector('#minute-rest');

//controls for value start for session and rest time
const upTimer = document.querySelector('#up-timer');
const downTimer = document.querySelector('#down-timer');
const upRest = document.querySelector('#up-rest');
const downRest = document.querySelector('#down-rest');

//clock final value for when the start button is pressed
const mainMinutes = document.querySelector('#main-minutes');
const mainSeconds = document.querySelector('#main-seconds');

//start, stop, pause and reset control
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const pause = document.querySelector('#pause');
const reset = document.querySelector('#reset')

//default buttons
const defaultTimer = document.querySelector('#default-timer');
const defaultReset = document.querySelector('#default-reset');

//session variable
var pomodoroSession;
var restSession;

//audio file
const clickSound = document.getElementById("myAudio");

//flag to indicate if it's session or rest timer and if the pause button is in use
let SessionRestFlag = 1;
let pauseFlag = 1;

//status display
let sessionStatus = document.querySelector("#status");

//start, stop, pause & reset buttons
start.addEventListener('click', function(){
    disable();
    sessionStatus.textContent = "Running!"
    if(pauseFlag > 0){
      mainSeconds.textContent = 59;
      timeDecrease(mainMinutes);
    }else{
      pauseFlag = -pauseFlag;
    }
    if(SessionRestFlag > 0){
        pomodoroSession = setInterval(countDown, 1000);
    }else {
        mainMinutes.textContent = minuteRest.textContent;
        restSession = setInterval(countDown,1000);
    }
});
stop.addEventListener('click', function(){
    mainMinutes.textContent = '25';
    mainSeconds.textContent = '00';
    stopFunction();
    enable();
    sessionStatus.textContent = "Stopped";
});
pause.addEventListener('click', function(){
    stopFunction();
    sessionStatus.textContent = "Paused!"
    pauseFlag = -pauseFlag;
    start.removeAttribute("disabled");
});
reset.addEventListener('click', function(){
    if(SessionRestFlag > 0){
      mainMinutes.textContent = minuteTimer.textContent;
      mainSeconds.textContent = '00';
    }else{
      mainMinutes.textContent = minuteRest.textContent;
      mainSeconds.textContent = '00';
    }
});

//default values for time setters;
defaultTimer.addEventListener('click', function(){
    minuteTimer.textContent = "25";

});
defaultReset.addEventListener('click', function(){
    minuteRest.textContent = "05";
});

//arrow keys to increse starting minutes
upTimer.addEventListener('click', function(){
    timeIncrease(minuteTimer);
    mainMinutes.textContent = minuteTimer.textContent;
});
upRest.addEventListener('click', function(){
    timeIncrease(minuteRest);
});

//arrow keys to decrease starting minutes
downTimer.addEventListener('click', function(){
    if(timeDecrease(minuteTimer) == '00'){
        minuteTimer.textContent = '01';
        mainMinutes.textContent = '01';
    }else{
        mainMinutes.textContent = minuteTimer.textContent;
}});
downRest.addEventListener('click', function(){
    if(timeDecrease(minuteRest) == '00'){
        minuteRest.textContent = '01';
}});