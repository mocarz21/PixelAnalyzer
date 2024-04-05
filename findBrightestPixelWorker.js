const { parentPort } = require('worker_threads');

parentPort.on('message', ({ buffer, info }) => {
    let maxBrightness = 0;
    let brightestPixel = null;
    for (let i = 0; i < buffer.length; i += 3) {
        const brightness = buffer[i] + buffer[i + 1] + buffer[i + 2];
        if (brightness > maxBrightness) {
            maxBrightness = brightness;
            brightestPixel = `RGB(${buffer[i]},${buffer[i + 1]},${buffer[i + 2]})`;
        }
    }
    parentPort.postMessage(brightestPixel);
});