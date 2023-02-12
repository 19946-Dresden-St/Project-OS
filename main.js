import Battery from "./modules/battery.js";
import Calendar from "./modules/calendar.js";
import Clock from "./modules/clock.js";
import Settings from "./modules/settings.js";

// Load the current settings
const settings = new Settings();
settings.load();


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


// ========== LOCKING SCREEN INITIALIZATION ==========

let unlockBtn = document.getElementById('unlock-btn');
let screen = document.getElementById('lock-screen');
unlockBtn.addEventListener('click', function () {
    settings.unlock(screen);
});

// /========== LOCKING SCREEN INITIALIZATION ==========




// ========== LISTENERS ==========

// Listen to the click event on the settings buttons to hide / display features
let settingsButtons = [
    {id: 'displayDate', setting: 'calendarDisplay', container: containerDate},
    {id: 'displayDay', setting: 'dayDisplay', container: containerDay},
    {id: 'displayMonth', setting: 'monthDisplay', container: containerMonth},
    {id: 'displayYear', setting: 'yearDisplay', container: containerYear},
    {id: 'displayTime', setting: 'clockDisplay', container: timeContainer},
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

// /========== LISTENERS ==========