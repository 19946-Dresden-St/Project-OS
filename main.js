import Battery from "./modules/battery.js";
import Calendar from "./modules/calendar.js";
import Clock from "./modules/clock.js";
import Locking from "./modules/locking.js";
import Settings from "./modules/settings.js";

// Load the current settings
const settings = new Settings();
settings.load();

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
function updateCalendar() {
    calendar.initDate(containerDate, containerDay, containerMonth, containerYear);
}

updateCalendar();
setInterval(updateCalendar, 1000);

// /========== CALENDAR INITIALIZATION ==========


// ========== CLOCK & CHRONO INITIALIZATION ==========

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
clock.initTimeapp(timeContainerapp,clockContainer, timerContainer);


//Update clocks every second
function updateClock() {
    clock.initTime(timeContainer, timeHContainer, timeMContainer, timeSContainer);
    clock.initTimeapp(timeContainerapp);
}
updateClock();
setInterval(updateClock, 1000);

//Get clock app buttons
let clockButton = document.getElementById("clock-btn");

let chronoButton = document.getElementById("chrono-btn");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");

//Specifique timer
let timerButton = document.getElementById("timer-btn");
let startTimerButton = document.getElementById("start-timer");
let resumeTimerButton = document.getElementById("resume-timer");
let stopTimerButton = document.getElementById("stop-timer");
let resetTimerButton = document.getElementById("reset-timer");
let VibrationTimer = document.getElementById("vibration-timer");

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
startButton.addEventListener("click", () => clock.startChrono(VibrationTimer));
stopButton.addEventListener("click", () => clock.stopChrono(VibrationTimer));
resetButton.addEventListener("click", () => clock.resetChrono(VibrationTimer));

//Click event listeners to the timer buttons
startTimerButton.addEventListener("click", () => {
    clock.initTimer();
    clock.startTimer(VibrationTimer);
});

stopTimerButton.addEventListener("click", () => {
    clock.stopTimer(VibrationTimer);
});

resumeTimerButton.addEventListener("click", () => {
    clock.resumeTimer(VibrationTimer);
});

resetTimerButton.addEventListener("click", () => {
    clock.resetTimer(VibrationTimer);
});

// /========== CLOCK & CHRONO INITIALIZATION ==========


// ========== BATTERY INITIALIZATION =========

// Initialize the battery power
let batteryContainer = document.getElementById('battery-container');
let battery = new Battery()
battery.initBattery(batteryContainer);

// /========= BATTERY INITIALIZATION ==========


// ========== LISTENERS ==========

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

    {id: 'displayBattery', setting: 'batteryDisplay', container: batteryContainer}
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
    locking.unlock(screen);
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

// /========== LISTENERS ==========