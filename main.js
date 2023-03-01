import Battery from "./modules/battery.js";
import Calendar from "./modules/calendar.js";
import Clock from "./modules/clock.js";
import Locking from "./modules/locking.js";
import Settings from "./modules/settings.js";
import Calculator from "./modules/calculator.js";
import TicTacToe from "./modules/tictactoe.js";
import Latency from "./modules/latency.js";




// Load the current settings
const settings = new Settings();
settings.load();

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

// ========== LOCKING SCREEN INITIALIZATION ==========

let screen = document.getElementById('lock-screen');
let unlockBtn = document.getElementById('unlock-btn');
let unlockInput = document.getElementById('unlock-input');
let passwordInputs = document.getElementById('input-group-pwd');
let locking = new Locking();
locking.initLocking(unlockInput, passwordInputs);

// /========== LOCKING SCREEN INITIALIZATION ==========


// ========== CALENDAR INITIALIZATION ==========

let containerDate = document.getElementById('calendar');
let containerDay = document.getElementById('calendar-day');
let containerMonth = document.getElementById('calendar-month');
let containerYear = document.getElementById('calendar-year');
let calendar = new Calendar();
calendar.initDate(containerDate, containerDay, containerMonth, containerYear);

//Update the calendar every second
calendar.updateCalendar(containerDate, containerDay, containerMonth, containerYear);
setInterval(() => calendar.updateCalendar, 1000);

// Initialize clocks with current time
let timeContainer = document.getElementById('clock');
let timeHContainer = document.getElementById('clock-hour');
let timeMContainer = document.getElementById('clock-minute');
let timeSContainer = document.getElementById('clock-second');
let clock = new Clock();

clock.initTime(timeContainer,  timeHContainer, timeMContainer, timeSContainer);

//Initialize the clock app
let chronoContainer = document.getElementById("chrono-container");
let clockContainer = document.getElementById("clock-container");
let timeContainerapp = document.getElementById('clock2');
let timerContainer = document.getElementById("timer-container");
clock.initTimeapp(timeContainerapp);



//Update clocks every second
clock.updateClock(timeContainer, timeHContainer, timeMContainer, timeSContainer, timeContainerapp);
setInterval(() => clock.updateClock(timeContainer, timeHContainer, timeMContainer, timeSContainer, timeContainerapp), 1000);

//Get clock app buttons
let clockButton = document.getElementById("clock-btn");

let chronoButton = document.getElementById("chrono-btn");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");
let flagButton = document.getElementById("flag");


//Specifique timer
let timerButton = document.getElementById("timer-btn");
let startTimerButton = document.getElementById("start-timer");
let resumeTimerButton = document.getElementById("resume-timer");
let stopTimerButton = document.getElementById("stop-timer");
let resetTimerButton = document.getElementById("reset-timer");
let Vibration = document.getElementById("vibration");

//Click event listeners to the clock, chrono and timer buttons
clockButton.addEventListener("click", function() {
    clockContainer.style.display = "block";
    chronoContainer.style.display = "none";
    timerContainer.style.display = "none";
});

chronoButton.addEventListener("click", function() {
    clockContainer.style.display = "none";
    chronoContainer.style.display = "block";
    timerContainer.style.display = "none";
});

timerButton.addEventListener("click", function() {
    clockContainer.style.display = "none";
    chronoContainer.style.display = "none";
    timerContainer.style.display = "block";
});


//Click event listeners to the clock and chrono buttons
startButton.addEventListener("click", () => clock.startChrono(Vibration));
stopButton.addEventListener("click", () => clock.stopChrono(Vibration));
resetButton.addEventListener("click", () => clock.resetChrono(Vibration));
flagButton.addEventListener("click", () => {clock.flagTime(); clock.displayTimes(Vibration);});

//Click event listeners to the timer buttons
startTimerButton.addEventListener("click", () => {
    clock.initTimer();
    clock.startTimer(Vibration);
});

stopTimerButton.addEventListener("click", () => {
    clock.stopTimer(Vibration);
});

resumeTimerButton.addEventListener("click", () => {
    clock.resumeTimer(Vibration);
});

resetTimerButton.addEventListener("click", () => {
    clock.resetTimer(Vibration);
});



// /========== CLOCK & CHRONO INITIALIZATION ==========


// ========== BATTERY INITIALIZATION =========

// Initialize the battery power
let batteryContainer = document.getElementById('battery-container');
let battery = new Battery()
battery.initBattery(batteryContainer);

// /========= BATTERY INITIALIZATION ==========

// ========= TIC TAC TOE ==========

var tictactoe = new TicTacToe()

// /=========  TIC TAC TOE ==========


// ========== LATENCY INITIALIZATION ==========

// Initialize latency
const networkLatencyElement = document.getElementById("latencyContainer");
const showLatencyCheckbox = document.getElementById("displayLatency");
const serverAddressInput = document.getElementById("serverAddress");
const refreshRateInput = document.getElementById("refreshRate");
const latency = new Latency();
latency.setupLatency(showLatencyCheckbox, serverAddressInput, refreshRateInput, networkLatencyElement);

// /========= LATENCY INITIALIZATION ==========


// ========== LISTENERS ==========

// onClick on button id resetTTT
document.getElementById('resetTTT').addEventListener('click', function () {
    console.log('reset');
    tictactoe.resetGame();
});

// set the vibration on or off when page is loaded
document.addEventListener('DOMContentLoaded', function () {
    localStorage.getItem('vibration') === 'true' ? document.getElementById('addVibration').checked = true : document.getElementById('addVibration').checked = false;
});

document.getElementById('addVibration').addEventListener('click', function () {
    localStorage.getItem('vibration') === 'true' ? localStorage.setItem('vibration', 'false') : localStorage.setItem('vibration', 'true');
});



// Listen to the click event on the settings buttons to hide / display features
let settingsButtons = [
    {id: 'displayDate', setting: 'calendarDisplay', container: containerDate},
    {id: 'displayDay', setting: 'dayDisplay', container: containerDay},
    {id: 'displayMonth', setting: 'monthDisplay', container: containerMonth},
    {id: 'displayYear', setting: 'yearDisplay', container: containerYear},

    {id: 'displayTime', setting: 'clockDisplay', container: timeContainer},
    {id: 'displayHour', setting: 'hoursDisplay', container: timeHContainer},
    {id: 'displayMin', setting: 'minuteDisplay', container: timeMContainer},
    {id: 'displaySec', setting: 'secondDisplay', container: timeSContainer},

    {id: 'displayBattery', setting: 'batteryDisplay', container: batteryContainer},

    {id: 'displayLatency', setting: 'latencyDisplay', container: networkLatencyElement},


];

settingsButtons.forEach(function (button) {
    document.getElementById(button.id).addEventListener('click', function () {
        settings.hide(button.setting, button.container);
    });
});


// Listen to the click event on the theme button to switch between dark and light mode
document.getElementById('theme-btn').addEventListener('change', function () {
    settings.switchTheme();
});


// Listen to the click event on the lock button to unlock the screen
unlockBtn.addEventListener('click', function () {
    locking.unlock(screen, unlockInput);
});


document.getElementById('setPassword').addEventListener('click', function () {
   locking.setLocking(unlockInput, passwordInputs);
});


document.getElementById('close').addEventListener('click', function () {
    if(localStorage.getItem('password') === '' && localStorage.getItem('isPasswordSet') === 'true') {
        localStorage.setItem('isPasswordSet', 'false');
        document.getElementById('setPassword').checked = false;
        passwordInputs.style.display = 'none';
    }
});

document.getElementById('lock-container').addEventListener('click', function () {
    locking.lock(screen);
});

document.getElementById('set-pwd').addEventListener('click', function () {
   locking.setPassword();
});



// CALCULATOR LISTENERS

const previousOperandTextElement = document.querySelector('#previous-operand')
const currentOperandTextElement = document.querySelector('#current-operand')
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('#equals')
const deleteButton = document.querySelector('#delete')
const clearButton = document.querySelector('#clear')
const decimalButton = document.querySelector('#decimal')
const clearinter = document.querySelector('#clint')


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
clearinter.addEventListener('click', button => {
    calculator.resetIntermediateResult()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

decimalButton.addEventListener('click', button => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
})



// /========== LISTENERS ========== 


// TEST DRAGGABLE
