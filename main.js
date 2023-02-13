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

// /========== CALENDAR INITIALIZATION ==========


// ========== CLOCK INITIALIZATION ==========

let timeContainer = document.getElementById('clock');
let clock = new Clock();
clock.initTime(timeContainer);

// /========== CLOCK INITIALIZATION ==========


// ========== BATTERY INITIALIZATION ==========

let batteryContainer = document.getElementById('battery-container');
let battery = new Battery()
battery.initBattery(batteryContainer);

// /========== BATTERY INITIALIZATION ==========




// ========== LISTENERS ==========

// Listen to the click event on the settings buttons to hide / display features
let settingsButtons = [
    {id: 'displayDate', setting: 'calendarDisplay', container: containerDate},
    {id: 'displayDay', setting: 'dayDisplay', container: containerDay},
    {id: 'displayMonth', setting: 'monthDisplay', container: containerMonth},
    {id: 'displayYear', setting: 'yearDisplay', container: containerYear},
    {id: 'displayTime', setting: 'clockDisplay', container: timeContainer},
    {id: 'displayBattery', setting: 'batteryDisplay', container: batteryContainer},
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