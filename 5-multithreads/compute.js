const compute = (array) => {
    let count = 0;

    for (const num of array) {
        if (num % 3 === 0) count++;
    }
    return count
}

module.exports = compute