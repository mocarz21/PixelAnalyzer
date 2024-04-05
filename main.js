const { Worker } = require('worker_threads');
const sharp = require('sharp');
const path = require('path');

const imagePath = path.join(__dirname, '13.jpg');

sharp(imagePath).raw().toBuffer((err, buffer, info) => {
    if (err) throw err;

    const findBrightestPixelWorker = new Worker('./findBrightestPixelWorker.js');
    const countBlackPixelsWorker = new Worker('./countBlackPixelsWorker.js');

    let results = { brightest: null, blackPixelsCount: null };

    findBrightestPixelWorker.postMessage({ buffer, info });
    countBlackPixelsWorker.postMessage({ buffer, info });

    findBrightestPixelWorker.on('message', (result) => {
        results.brightest = result;
        if (results.blackPixelsCount !== null) {
            console.log('Wyniki:', results);
            process.exit(); 
        }
    });

    countBlackPixelsWorker.on('message', (result) => {
        results.blackPixelsCount = result;
        if (results.brightest !== null) {
            console.log('Wyniki:', results);
            process.exit(); 
        }
    });
});