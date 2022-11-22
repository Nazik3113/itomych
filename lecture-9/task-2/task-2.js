import readline from "readline";
import calendar_fabric from "./calendar_fabric.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Tell the day by number 1 to 5 you wand to see calendar: ', async dayNum => {
    const calendar = await calendar_fabric(dayNum);
    calendar.printCalendar();
    rl.close();
});