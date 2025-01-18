const add = require("./operations/add")
const subtract = require("./operations/subtract")
const multiply = require("./operations/multiply")
const divide = require("./operations/divide")

let firstNum = Number(process.argv[2])
let secondNum = Number(process.argv[3])
let operation = process.argv[4];

const calcResult = (firstNum, secondNum, operation) => {
    switch (operation) {
        case 'add': return add(firstNum, secondNum);

        case 'subtract': return subtract(firstNum, secondNum);

        case 'multiply': return multiply(firstNum, secondNum);

        case 'divide': return divide(firstNum, secondNum);

        default:
            console.log("Значение не совпало ни с одним из вариантов");
            break;
    }
}

console.log(calcResult(firstNum, secondNum, operation));