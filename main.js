import Calendar from "./modules/calendar.js";
import Clock from "./modules/clock.js";
import Settings from "./modules/settings.js";

// Load the current settings
const settings = new Settings();
settings.load();



// ========== INITIALIZATION ==========

// Initialize the calendar with current date
let dateContainer = document.getElementById('calendar');
let calendar = new Calendar();
calendar.initDate(dateContainer);

// Initialize the clock with current time
let timeContainer = document.getElementById('clock');
let clock = new Clock();
clock.initTime(timeContainer);

// /========== INITIALIZATION ==========




// ========== LISTENERS ==========

// Listen to the click event on the date button to hide / display the calendar
document.getElementById('displayTime').addEventListener('click', function () {
    settings.hide('clockDisplay', timeContainer);
});

// Listen to the click event on the theme button to switch between dark and light mode
document.getElementById('theme-btn').addEventListener('change', function () {
    settings.switchTheme();
});

// /========== LISTENERS ==========