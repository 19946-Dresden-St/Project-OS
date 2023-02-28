import Battery from "./modules/battery.js";
import Calendar from "./modules/calendar.js";
import Clock from "./modules/clock.js";
import Locking from "./modules/locking.js";
import Settings from "./modules/settings.js";
import Calculator from "./modules/calculator.js";

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

// Initialize clocks with current time
let timeContainer = document.getElementById('clock');
let timeContainerapp = document.getElementById('clock2');
let timeHContainer = document.getElementById('clock-hour');
let timeMContainer = document.getElementById('clock-minute');
let timeSContainer = document.getElementById('clock-second');
let clock = new Clock();
clock.initTime(timeContainer,  timeHContainer, timeMContainer, timeSContainer);
clock.initTimeapp(timeContainerapp);

//Update clocks every second
function updateClock() {
    clock.initTime(timeContainer, timeHContainer, timeMContainer, timeSContainer);
    clock.initTimeapp(timeContainerapp);
}

updateClock();
setInterval(updateClock, 1000);
// /========== CALENDAR & CLOCK INITIALIZATION ==========



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
