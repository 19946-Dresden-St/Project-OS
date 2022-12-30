export class Calendar {
    static getDate() {
        return new Date().toLocaleDateString("fr-FR", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
}
