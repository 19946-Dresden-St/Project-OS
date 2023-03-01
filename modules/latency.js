import Settings from "./settings.js";

class Latency extends Settings {


    constructor() {
        super();
        this.server = "https://www.youtube.com";
        this.refreshRate = 5000;
        let pingTimeoutId = null;
    }

    pingServer() {
        const startTime = Date.now();
        fetch(this.server, { mode: "no-cors" })
            .then(() => {
                const latency = Date.now() - startTime;
                document.getElementById("latencyContainer").textContent = `${latency} ms`;
                this.pingTimeoutId = setTimeout(() => this.pingServer(), this.refreshRate);
            })
            .catch(() => {
                document.getElementById("latencyContainer").textContent = "Error";
                this.pingTimeoutId = setTimeout(() => this.pingServer(), this.refreshRate);
            });
    }

    setupLatency(showLatencyCheckbox, serverAddressInput, refreshRateInput) {
        showLatencyCheckbox.addEventListener("change", () => {
            if (showLatencyCheckbox.checked) {
                networkLatencyElement.style.display = "flex";
                this.server = serverAddressInput.value;
                const refreshRate = parseInt(refreshRateInput.value);
                if (refreshRate >= 1 && refreshRate <= 60) {
                    this.refreshRate = refreshRate * 1000;
                } else {
                    this.refreshRate = 5000;
                    refreshRateInput.value = "5";
                    alert("Refresh rate must be between 1 and 60 seconds. Using default value of 5 seconds.");
                }
                this.refreshRate = refreshRateInput.valueAsNumber * 1000;
                this.pingServer();
            } else {
                networkLatencyElement.style.display = "none";
                clearTimeout(this.pingTimeoutId);
            }
        });



        serverAddressInput.addEventListener("change", () => {
            this.server = serverAddressInput.value;
            clearTimeout(this.pingTimeoutId);
            this.pingServer(serverAddressInput.value, refreshRateInput.valueAsNumber);
        });

        refreshRateInput.addEventListener("change", () => {
            const refreshRate = parseInt(refreshRateInput.value);
            if (refreshRate >= 1 && refreshRate <= 60) {
                this.refreshRate = refreshRate * 1000;
                clearTimeout(this.pingTimeoutId);
                this.pingServer(serverAddressInput.value, refreshRateInput.valueAsNumber);
            } else {
                refreshRateInput.value = "5";
                alert("Refresh rate must be between 1 and 60 seconds. Using default value of 5 seconds.");
            }
        });

        this.pingServer(serverAddressInput.value, refreshRateInput.valueAsNumber);
    }
}

export default Latency;
