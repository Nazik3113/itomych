export default class LessonCalendar {
    constructor(day, lessonsArray) {
        this.day = day;
        this.lessonsArray = lessonsArray;
    };

    printCalendar() {
        console.log(this.day);
        this.lessonsArray.forEach(lesson => {
            console.log(`  * ${lesson}`);
        });
    };
};