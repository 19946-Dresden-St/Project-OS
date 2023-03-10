import Settings from "./settings.js";

class Clock extends Settings {

    constructor() {
        super();
        this.startTime = null;
        this.currentTime = 0;
        this.timer = null;
        this.timerapp = null;
        this.timerappRunning = false;
        this.timerDuration = 0;
        this.timerRunning = false;
        this.timersong = new Audio("./assets/song/timer_song.mp3");
        this.times = [];


    }
    
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
                content: (this.getMinutes()) < 10 ? "0" + this.getMinutes() + " m" : this.getMinutes() + " m"
            },
            {
                feature: timeSContainer,
                key: "secondDisplay",
                content: (this.getSeconds()) < 10 ? "0" + this.getSeconds() + " s" : this.getSeconds() + " s"
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

    updateClock(timeContainer, timeHContainer, timeMContainer, timeSContainer, timeContainerapp) {
        this.initTime(timeContainer, timeHContainer, timeMContainer, timeSContainer);
        this.initTimeapp(timeContainerapp);
    }

    startChrono(Vibration) {
        if (!this.timerRunning) {

            if (!this.startTime) {
                this.startTime = new Date().getTime() - this.currentTime;
            }
            this.timer = setInterval(() => {
                this.currentTime = new Date().getTime() - this.startTime;
                let minutes = Math.floor((this.currentTime % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((this.currentTime % (1000 * 60)) / 1000);
                let milliseconds = Math.floor((this.currentTime % 1000) / 10);

                document.getElementById("chrono").innerHTML =
                    (minutes < 10 ? "0" + minutes : minutes) + ":" +
                    (seconds < 10 ? "0" + seconds : seconds) + ":" +
                    (milliseconds < 10 ? "0" + milliseconds : milliseconds);

            }, 10);


            if (Vibration.checked) {
                window.navigator.vibrate(100);
                console.log("vibration");
            }

            this.timerRunning = true;
        }
    }

    stopChrono(Vibration) {
        if (this.timerRunning) {
            clearInterval(this.timer);
            this.timerRunning = false;
            this.startTime = null;

            if (Vibration.checked) {
                window.navigator.vibrate(100);
                console.log("vibration");
            }
        }
    }

    resetChrono(Vibration) {
        this.stopChrono(Vibration);
        this.currentTime = 0;
        document.getElementById("chrono").innerHTML = "00:00:00";

    }
    flagTime() {
        if (this.timerRunning) {
            this.times.push(this.currentTime);
        }
    }
    displayTimes(Vibration) {
        const timesElement = document.getElementById("times");
        timesElement.innerHTML = "";
        for (let i = 0; i < this.times.length; i++) {
            const time = this.times[i];
            let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((time % (1000 * 60)) / 1000);
            let milliseconds = Math.floor((time % 1000) / 10);

            const timeString = (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (seconds < 10 ? "0" + seconds : seconds) + ":" +
                (milliseconds < 10 ? "0" + milliseconds : milliseconds);

            const li = document.createElement("li");
            li.textContent = timeString;
            timesElement.appendChild(li);
        }

        if (Vibration.checked) {
            window.navigator.vibrate(100);
            console.log("vibration");
        }
    }


    // Initialise la minuterie
    initTimer() {
        let hours = document.getElementById("hours").value || 0;
        let minutes = document.getElementById("minutes").value || 0;
        let seconds = document.getElementById("seconds").value || 0;

        this.timerDuration = hours * 60 * 60 + minutes * 60 + seconds;

        this.updateTimerDisplay();
    }
    //Son de la minuterie

    // Mise ?? jour de l'affichage de la minuterie
    updateTimerDisplay() {
        let hours = Math.floor(this.timerDuration / 3600);
        let minutes = Math.floor((this.timerDuration % 3600) / 60);
        let seconds = this.timerDuration % 60;

        let timerDisplay = document.getElementById("timer");
        timerDisplay.innerHTML =
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);

        if (!this.isResume) {
            ///this proke notif if timer is over
            if (this.timerDuration <= 0) {
                new Notification("Timer is over");
            }
        }
    }
    startTimer(Vibration) {
        if (!this.timerappRunning && this.timerDuration > 0) {
            this.timerapp = setInterval(() => {
                this.timerDuration--;
                this.updateTimerDisplay();

                if (this.timerDuration <= 0) {
                    this.stopTimer(Vibration);
                    this.timersong.play();

                }
            }, 1000);

            if (Vibration.checked) {
                window.navigator.vibrate(100);
                console.log("vibration");
            }

            this.timerappRunning = true;
        }
    }
    stopTimer(Vibration) {
        if (this.timerappRunning) {
            clearInterval(this.timerapp);
            this.timerappRunning = false;
            this.timeRemaining = this.timerDuration;


            if (Vibration.checked) {
                window.navigator.vibrate(100);
                console.log("vibration");
            }
        }
    }
    resumeTimer(Vibration) {
        if (!this.timerappRunning) {
            if (!this.timerappRunning && this.timeRemaining > 0) {
                this.timerDuration = this.timeRemaining;
                this.updateTimerDisplay();
                this.startTimer(Vibration);
            }
        }
    }
    resetTimer(Vibration) {
        this.stopTimer(Vibration);
        this.timeRemaining = 0;
        this.timerDuration = 0;
        this.isResume = true;
        this.updateTimerDisplay();

        document.getElementById("hours").value = "";
        document.getElementById("minutes").value = "";
        document.getElementById("seconds").value = "";
    }
}

export default Clock;
