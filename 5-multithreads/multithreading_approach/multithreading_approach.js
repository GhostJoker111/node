const { Worker } = require('worker_threads');

const splitArrayByCPUs = (array) => {
    const chunkSize = Math.ceil(array.length / 10);
    const chunks = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }

    return chunks;
}

const workerFunction = (array) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./multithreading_approach/worker.js", { workerData: array });

        worker.on("message", (msg) => {
            resolve(msg);
        })
    })
}

const multithreadApproachFunction = async (array) => {
    performance.mark("Start worker");
    const splitArray = splitArrayByCPUs(array)
    const workerResults = await Promise.all(splitArray.map(arr => workerFunction(arr)))
    const results = workerResults.reduce((sum, count) => sum + count, 0);

    performance.mark("End worker");
    performance.measure("workerMeasure", "Start worker", "End worker");
    return results;
}



module.exports = multithreadApproachFunction;