class Calendar {

    constructor() {
        this.date = new Date();
    }

    initDate(container) {
        if (localStorage.getItem("calendarDisplay") !== null && localStorage.getItem("calendarDisplay") === "false") {
            container.style.display = "none";
        } else if (localStorage.getItem("calendarDisplay") === null) {
            localStorage.setItem("calendarDisplay", "true");
        }
        container.innerHTML = this.getDate();
    }

    getDate() {
        return new Date().toLocaleDateString("fr-FR", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

}
