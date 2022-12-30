import { Calendar } from './js/calendar.js';
import { Clock } from "./js/clock.js";

var dateContent = document.getElementById('calendar');
dateContent.innerText = Calendar.getDate();

var timeContent = document.getElementById('clock');
timeContent.innerText = Clock.getTime();
