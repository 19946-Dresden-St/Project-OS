import Settings from "./settings.js";

class Clock extends Settings {

    /*
    * Initialize the clock and display it depending on the settings.
    * @param container - #id of the element in which to insert the clock in.
    */
    initTime(timeContainer, timeHContainer, timeMContainer, timeSContainer) {
        let featuresList = [
            {feature: timeContainer, key: "clockDisplay"},
            {
                feature: timeHContainer,
                key: "hourDisplay",
                content: (this.getHours()) < 10 ? "0" + this.getHours() : this.getHours()
            },
            {
                feature: timeMContainer,
                key: "minuteDisplay",
                content: (this.getMinutes()) < 10 ? "0" + this.getMinutes() : this.getMinutes() + " m"
            },
            {
                feature: timeSContainer,
                key: "secondDisplay",
                content: (this.getSeconds()) < 10 ? "0" + this.getSeconds() : this.getSeconds() + " s"
            }
        ];

        featuresList.forEach(({feature, key, content}) => {
            this.checkDisplay(feature, key);
            if (content) {
                feature.innerHTML = content;
            }

        });
    }

    /*
    * Initialize the clock and display it for the clock app
    */
    initTimeapp(timeContainerapp) {

        timeContainerapp.innerHTML = ((this.getHours()) < 10 ? "0" + this.getHours() : this.getHours()) + " " +
            ((this.getMinutes()) < 10 ? "0" + this.getMinutes() : this.getMinutes()) + " m " +
            ((this.getSeconds()) < 10 ? "0" + this.getSeconds() : this.getSeconds()) + " s";

    }

    /*
    * Get the current time
    */
    getHours() {
        return new Date().toLocaleTimeString("fr-FR", {
            hour: "numeric",
            hour12: false,
        });
    }


    getMinutes() {
        return new Date().toLocaleTimeString("fr-FR", {
            minute: "numeric",
        });
    }

    getSeconds() {
        return new Date().toLocaleTimeString("fr-FR", {
            second: "numeric",
        });
    }

    ClockAppSelector() {

    }

}

export default Clock;