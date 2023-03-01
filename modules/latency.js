import Settings from "./settings.js";

class Latency extends Settings {


    constructor() {
        super();
        this.server = "https://www.google.com";
        this.refreshRate = 5;
        this.pingTimeoutId;
    }

    pingServer() {
        const startTime = Date.now();
        fetch(this.server, { mode: "no-cors" })
            .then(() => {
                const latency = Date.now() - startTime;
                latencyElement.textContent = `${latency} ms`;
                this.pingTimeoutId = setTimeout(() => this.pingServer(), this.refreshRate);
            })
            .catch(() => {
                latencyElement.textContent = "Error";
                this.pingTimeoutId = setTimeout(() => this.pingServer(), this.refreshRate);
            });
    }

    setupLatency(showLatencyCheckbox, serverAddressInput, refreshRateInput) {

        showLatencyCheckbox.addEventListener("change", () => {
            const networkLatencyElement = document.getElementById("network-latency");
            if (showLatencyCheckbox.checked) {
                networkLatencyElement.style.display = "flex";
                this.pingServer(serverAddressInput.value, refreshRateInput.valueAsNumber);
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
            this.refreshRate = refreshRateInput.valueAsNumber;
            clearTimeout(this.pingTimeoutId);
            this.pingServer(serverAddressInput.value, refreshRateInput.valueAsNumber);
        });

        this.pingServer(serverAddressInput.value, refreshRateInput.valueAsNumber);
    }
}

export default Latency;
