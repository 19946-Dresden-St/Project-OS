export class Clock {
    static getTime() {
        return new Date().toLocaleTimeString("fr-FR", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
    }


}