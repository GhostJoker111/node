const EventEmitter = require("events")

const timerEmitter = new EventEmitter();

let firstArg = process.argv[2] ?? ""
let secondArg = process.argv[3] ?? ""
let thirdArg = process.argv[4] ?? ""

const timeForTimer = (...args) => {
    let totalMs = 0;

    for (const arg of args) {
        if (!arg) continue;

        if (arg.includes("h")) {
            const hours = Number(arg.replace("h", ""));
            totalMs += hours * 3600000;
        }
        else if (arg.includes("min")) {
            const minutes = Number(arg.replace("min", ""));
            totalMs += minutes * 60000;
        }
        else if (arg.includes("sec")) {
            const seconds = Number(arg.replace("sec", ""));
            totalMs += seconds * 1000;
        }
    }

    return totalMs;
};

timerEmitter.on("timer", (time) => setTimeout(() => {
    console.log("Wake up, Samurai!")
}, timeForTimer(time)))

timerEmitter.emit("timer", firstArg, secondArg, thirdArg)