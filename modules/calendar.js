import Settings from "./settings.js";

class Calendar extends Settings{

    /*
    * Initialize the calendar and display it depending on the settings.
    * @param containerDate - #id of the DOM element in which to insert the calendar in.
    * @param containerDay - #id of the DOM element in which to insert the day in.
    * @param containerMonth - #id of the DOM element in which to insert the month in.
    * @param containerYear - #id of the DOM element in which to insert the year in.
    */
    initDate(containerDate, containerDay, containerMonth, containerYear) {
        let featuresList = [
            {feature: containerDate, key: "calendarDisplay"},
            {feature: containerDay, key: "dayDisplay", content: this.getDay()},
            {feature: containerMonth, key: "monthDisplay", content: this.getMonth()},
            {feature: containerYear, key: "yearDisplay", content: this.getYear()}
        ];

        featuresList.forEach(({feature, key, content}) => {
            this.checkDisplay(feature, key);
            if (content) {
                feature.innerHTML = content;
            }
        });
    }


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

    updateCalendar(containerDate, containerDay, containerMonth, containerYear) {
        this.initDate(containerDate, containerDay, containerMonth, containerYear);
    }
}

export default Calendar;