import Calendar from "./modules/calendar.js";
import Clock from "./modules/clock.js";
import Settings from "./modules/settings.js";

// Load the current settings
const settings = new Settings();
settings.load();



// ========== INITIALIZATION ==========

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

// /========== INITIALIZATION ==========




// ========== LISTENERS ==========

// Listen to the click event on the date button to hide / display the calendar
document.getElementById('displayDate').addEventListener('click', function () {
    settings.hide('calendarDisplay', containerDate);
});

// Listen to the click event on the day button to hide / display the day
document.getElementById('displayDay').addEventListener('click', function () {
    settings.hide('dayDisplay', containerDay);
});

// Listen to the click event on the month button to hide / display the month
document.getElementById('displayMonth').addEventListener('click', function () {
    settings.hide('monthDisplay', containerMonth);
});

// Listen to the click event on the year button to hide / display the year
document.getElementById('displayYear').addEventListener('click', function () {
    settings.hide('yearDisplay', containerYear);
});

// Listen to the click event on the time button to hide / display the clock
document.getElementById('displayTime').addEventListener('click', function () {
    settings.hide('clockDisplay', timeContainer);
});

// Listen to the click event on the theme button to switch between dark and light mode
document.getElementById('theme-btn').addEventListener('change', function () {
    settings.switchTheme();
});

// /========== LISTENERS ==========