const EventEmitter = require("events")

const calcEmitter = new EventEmitter();

let firstNum = Number(process.argv[2])
let secondNum = Number(process.argv[3])
let operation = process.argv[4];

calcEmitter.on(operation , (firstNum, secondNum) => {
        switch (operation) {
            case 'add':
                calcEmitter.emit("result", firstNum + secondNum);
                break;

            case 'subtract':
                calcEmitter.emit("result", firstNum - secondNum);
                break;

            case 'multiply':
                calcEmitter.emit("result", firstNum * secondNum);
                break;

            case 'divide':
                secondNum === 0
                    ? console.log("На ноль делить нельзя")
                    : calcEmitter.emit("result", firstNum / secondNum)
                break;

            default:
                console.log("Значение не совпало ни с одним из вариантов");
                break;
        }
});

calcEmitter.on("result", (result) => {
    console.log(result);
});

calcEmitter.emit(operation, firstNum, secondNum)
