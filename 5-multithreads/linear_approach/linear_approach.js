const compute = require("../compute.js")

const linearApproachFunction = (array) => {
    performance.mark("start")
    compute(array)
    performance.mark("end")
    performance.measure("linear_approach", "start", "end")
}

module.exports = linearApproachFunction;
