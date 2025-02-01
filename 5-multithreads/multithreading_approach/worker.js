const { parentPort, workerData } = require('worker_threads');
const compute = require("../compute.js")

parentPort.postMessage(compute(workerData))