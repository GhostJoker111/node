const { PerformanceObserver } = require("perf_hooks");
const array = require("./array.js")
const linearApproachFunction = require("./linear_approach/linear_approach.js")
const multithreadApproachFunction = require("./multithreading_approach/multithreading_approach.js")

const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}`);
    })
})

performanceObserver.observe({entryTypes: ["measure"]})



const main = async () => {
    linearApproachFunction(array)
    await multithreadApproachFunction(array)
}

main()
