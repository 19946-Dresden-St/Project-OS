import Settings from "./settings.js";

class Battery extends Settings {

    constructor() {
        super();
        this.battery = null;
        this.power = document.getElementById("power");
    }

    initBattery(container) {
        this.checkDisplay(container, "batteryDisplay");
        navigator.getBattery().then(battery => {
            this.battery = battery;
            this.updateBatteryLevel();
            this.battery.addEventListener("levelchange", () => {
                this.updateBatteryLevel();
            });
        });
    }

    updateBatteryLevel() {
        const level = Math.round(this.battery.level * 100);
        const animation = this.power.animate(
            [
                { width: this.power.offsetWidth + "px" },
                { width: level + "%" }
            ],
        );
        animation.onfinish = () => {
            this.power.style.width = level + "%";
            if (level < 20) {
                this.power.style.backgroundColor = "#550fe0";
            } else if (level >= 20 && level < 80) {
                this.power.style.backgroundColor = "#990fe0";
            } else {
                this.power.style.backgroundColor = "#10EBFFFF";
            }
        };
    }
}


export default Battery;