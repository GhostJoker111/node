const EventEmitter = require("events")
const notifier = require('node-notifier');

const timerEmitter = new EventEmitter();

const checkArgs = (...args) => {
    if (args.every(arg => arg === undefined || arg === "")) {
        console.log("Введите хотя бы один аргумент!");
        process.exit(1);
    }
}

const timeForTimer = (...args) => {
    let totalMs = 0;

    for (const arg of args[0]) {
        if (!arg) continue;

        const timeType = arg.slice(-1)
        const timeValue = arg.slice(0, -1)

        switch (timeType) {
            case 'h':
                totalMs += timeValue * 3600000;
                break;
            case 'm':
                totalMs += timeValue * 60000;
                break;
            case 's':
                totalMs += timeValue * 1000;
                break;
            default:
                console.log(`Неизвестный формат времени: ${timeType}. Введите корректный формат(пример: 1h 30m 45s)`);
                process.exit(1);
        }
    }

    return totalMs;
};

checkArgs(process.argv.slice(2))

timerEmitter.on("timer", (time) => setTimeout(() => {
    notifier.notify({
        title: "Wake up, Samurai!",
        message: "It's time to get rich!",
        sound: true,
    });
}, timeForTimer(time)))

timerEmitter.emit("timer", process.argv.slice(2))
