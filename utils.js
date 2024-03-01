function getArguments() {
    const arr = process.argv.slice(2); // Remove first two arguments (node and script name)
    const data = {};

    let currentKey = null;
    arr.forEach((value) => {
        if (value.startsWith('-')) {
            currentKey = value;
            data[currentKey] = [];
        } else if (currentKey) {
            if (currentKey === '-o') {
                console.log(value);
            }
            if (value.indexOf(',') > 0) {
                data[currentKey].push(value.split(','));
            } else {
                data[currentKey].push(value);
            }
        }
    });

    // Convert single values from arrays to strings
    Object.keys(data).forEach((key) => {
        if (data[key].length === 1) {
            data[key] = data[key][0];
        }
    });

    return data;
}

module.exports = {
    getArguments
}
