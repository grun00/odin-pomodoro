//0 padding for the clock
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }
//functions to increase/decrease the time in the clocks
function timeIncrease(element){
    element.textContent = (Number(element.textContent) + 1).pad(2);
}
function timeDecrease(element){
    element.textContent = (Number(element.textContent) - 1).pad(2);
}
//starts a countdown on the main clock
function countDown(){
    if(mainMinutes.textContent == '-1' && flag > 0){
        mainMinutes.textContent = minuteRest.textContent;
        mainSeconds.textContent = '00';
        alert("!Starting Rest Time!");
        flag = -flag;
    }else if(mainMinutes.textContent == '-1' && flag < 0){
        mainMinutes.textContent = '00';
        mainSeconds.textContent = '00';
        alert("!Rest Over! Restart the clock");
        flag = -flag;
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
//session variable
var pomodoroSession = "global";
var restSession;
//flag to indicate if it's session or rest timer
let flag = 1;
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
    timeDecrease(minuteTimer);
    mainMinutes.textContent = minuteTimer.textContent;
});
downRest.addEventListener('click', function(){
    timeDecrease(minuteRest);
});
//start button
start.addEventListener('click', function(){
    mainSeconds.textContent = 59;
    timeDecrease(mainMinutes);
    if(flag > 0){
        pomodoroSession = setInterval(countDown, 1000);
    }else {
        mainMinutes.textContent = minuteRest.textContent;
        restSession = setInterval(countDown,1000);
    }
});
