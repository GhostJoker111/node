const EventEmitter = require("events")

const timerEmitter = new EventEmitter();

const checkArgs = (...args) => {
    if (args.every(arg => arg === undefined || arg === "")) {
        console.log("Введите хотя бы один аргумент!");
        process.exit(1);
    }
}

const timeForTimer = (...args) => {
    let totalMs = 0;

    for (const arg of args) {
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
                console.log(`Неизвестный формат времени: ${timeType}. Введите корректный формат(пример: 1h 30m 45s`);
                process.exit(1);
        }
    }

    return totalMs;
};

checkArgs(process.argv[2], process.argv[3], process.argv[4])

timerEmitter.on("timer", (time) => setTimeout(() => {
    console.log("Wake up, Samurai!")
}, timeForTimer(time)))

timerEmitter.emit("timer", process.argv[2], process.argv[3], process.argv[4])