export default async function (index_day) {
    switch (index_day) {
        case "1":
            const {default: monday} = await import("./calendars/monday_calendar.js");
            return monday;

        case "2":
            const {default: tuesday} = await import("./calendars/tuesday_calendar.js");
            return tuesday;

        case "3":
            const {default: wednesday} = await import("./calendars/wednesday_calendar.js");
            return wednesday;

        case "4":    
            const {default: thursday} = await import("./calendars/thursday_calendar.js");
            return thursday;

        case "5":
            const {default: friday} = await import("./calendars/friday_calendar.js");
            return friday;

        default:
            const {default: defaultModule} = await import("./calendars/monday_calendar.js");
            return defaultModule;
    }
};