class Clock {

    /*
    * Initialize the clock and display it depending on the settings.
    * @param container - #id of the element in which to insert the clock in.
    */
    initTime(container) {
        if (localStorage.getItem("clockDisplay") !== null && localStorage.getItem("clockDisplay") === "false") {
            container.style.display = "none";
        } else if (localStorage.getItem("clockDisplay") === null) {
            localStorage.setItem("clockDisplay", "true");
        }
        container.innerHTML = this.getTime();
    }

    /*
    * Get the current time
    */
    getTime() {
        return new Date().toLocaleTimeString("fr-FR", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
    }

}

export default Clock;