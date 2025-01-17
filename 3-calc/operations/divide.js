const divide = (firstNum, secondNum) => {
    if (secondNum === 0) {
        return console.log("На ноль делить нельзя")
    } else {
        return firstNum / secondNum
    }

};

module.exports = divide;