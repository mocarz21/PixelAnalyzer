const { parentPort } = require('worker_threads');

parentPort.on('message', ({ buffer, info }) => {
    let blackPixelsCount = 0;
    for (let i = 0; i < buffer.length; i += 3) {
        if (buffer[i] === 0 && buffer[i + 1] === 0 && buffer[i + 2] === 0) {
            blackPixelsCount++;
        }
    }
    parentPort.postMessage(blackPixelsCount);
});