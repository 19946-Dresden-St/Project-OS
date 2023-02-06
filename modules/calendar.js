class Calendar {

    /*
    * Initialize the calendar and display it depending on the settings.
    * @param container - #id of the element in which to insert the calendar in.
    */
    initDate(container) {
        if (localStorage.getItem("calendarDisplay") !== null && localStorage.getItem("calendarDisplay") === "false") {
            container.style.display = "none";
        } else if (localStorage.getItem("calendarDisplay") === null) {
            localStorage.setItem("calendarDisplay", "true");
        }
        container.innerHTML = this.getDate();
    }

    /*
    * Get the current date
    */
    getDate() {
        return new Date().toLocaleDateString("fr-FR", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
}

export default Calendar;