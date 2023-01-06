class Clock {


    initTime(container) {
        if (localStorage.getItem("clockDisplay") !== null && localStorage.getItem("clockDisplay") === "false") {
            container.style.display = "none";
        } else if (localStorage.getItem("clockDisplay") === null) {
            localStorage.setItem("clockDisplay", "true");
        }
        container.innerHTML = this.getTime();
    }

     getTime() {
        return new Date().toLocaleTimeString("fr-FR", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
    }

}