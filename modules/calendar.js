class Calendar {

    /*
    * Initialize the calendar and display it depending on the settings.
    * @param containerDate - #id of the element in which to insert the calendar in.
    * @param containerDay - #id of the element in which to insert the day in.
    * @param containerMonth - #id of the element in which to insert the month in.
    * @param containerYear - #id of the element in which to insert the year in.
    */
    initDate(containerDate, containerDay, containerMonth, containerYear) {
        if (localStorage.getItem("calendarDisplay") !== null && localStorage.getItem("calendarDisplay") === "false") {
            containerDate.style.display = "none";
        } else if (localStorage.getItem("calendarDisplay") === null) {
            localStorage.setItem("calendarDisplay", "true");
        }
        /*containerDate.innerHTML = this.getDate();*/

        if (localStorage.getItem("dayDisplay") !== null && localStorage.getItem("dayDisplay") === "false") {
            containerDay.style.display = "none";
        } else if (localStorage.getItem("calendarDisplay") === null) {
            localStorage.setItem("calendarDisplay", "true");
        }
        containerDay.innerHTML = this.getDay();

        if (localStorage.getItem("monthDisplay") !== null && localStorage.getItem("monthDisplay") === "false") {
            containerMonth.style.display = "none";
        } else if (localStorage.getItem("calendarDisplay") === null) {
            localStorage.setItem("calendarDisplay", "true");
        }
        containerMonth.innerHTML = this.getMonth();

        if (localStorage.getItem("yearDisplay") !== null && localStorage.getItem("yearDisplay") === "false") {
            containerYear.style.display = "none";
        } else if (localStorage.getItem("calendarDisplay") === null) {
            localStorage.setItem("calendarDisplay", "true");
        }
        containerYear.innerHTML = this.getYear();
    }

    /*
    * Get the current date
    */
/*    getDate() {
        return new Date().toLocaleDateString("fr-FR", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }*/

    /*
    * Get the current day
    */
    getDay() {
        return new Date().toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric"
        });
    }

    /*
    * Get the current month
    */
    getMonth() {
        return new Date().toLocaleDateString("fr-FR", {
            month: "short",
        });
    }

    /*
    * Get the current year
    */
    getYear() {
        return new Date().toLocaleDateString("fr-FR", {
            year: "numeric",
        });
    }
}

export default Calendar;