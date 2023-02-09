import Battery from "./modules/battery.js";
import Calendar from "./modules/calendar.js";
import Clock from "./modules/clock.js";
import Settings from "./modules/settings.js";

// Load the current settings
const settings = new Settings();
settings.load();


// ========== CALENDAR & CLOCK INITIALIZATION ==========

// Initialize the calendar with current date
let containerDate = document.getElementById('calendar');
let containerDay = document.getElementById('calendar-day');
let containerMonth = document.getElementById('calendar-month');
let containerYear = document.getElementById('calendar-year');
let calendar = new Calendar();
calendar.initDate(containerDate, containerDay, containerMonth, containerYear);

// Initialize the clock with current time
let timeContainer = document.getElementById('clock');
let clock = new Clock();
clock.initTime(timeContainer);

// Initialize the battery power
let batteryContainer = document.getElementById('battery-container');
let battery = new Battery()
battery.initBattery(batteryContainer);

// /========== CALENDAR & CLOCK INITIALIZATION ==========




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
