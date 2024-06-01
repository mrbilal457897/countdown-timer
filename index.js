#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
const response = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please enter the number of seconds",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter a valid number";
        }
        else if (input > 60) {
            return "Enter a number under 60";
        }
        else
            return true;
    }
});
let input = response.userInput;
function startTime(val) {
    let intTime = new Date().setSeconds(new Date().getSeconds() + val);
    let intervalTime = new Date(intTime);
    setInterval((() => {
        const curr = new Date();
        const timeOff = differenceInSeconds(intTime, curr);
        if (timeOff <= 0) {
            console.log("Timer has expired");
            process.exit();
        }
        const min = Math.floor(timeOff % (3600 * 24) / 3600);
        const sec = Math.floor(timeOff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
