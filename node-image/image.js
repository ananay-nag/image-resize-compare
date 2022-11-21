const sharp = require("sharp");
const path = require('path');
const { fileReader, fileWriter } = require('./helper');
let bufImage = null;
async function convertImage(size) {
    if (!bufImage)
        bufImage = await fileReader(path.join(__dirname, './'), 'hoichoi.jpg');
    return await fileWriter(path.join(__dirname, './output/'), `${new Date().getTime()}_IMAGE_SIZE_${size}.jpg`, await generateFileThumbnail(bufImage, size))
}
/**
 *
 * @param {Object} data | file buffer
 * @returns {Object} | file buffer || null 
 */
async function generateFileThumbnail(data, size) {
    try {
        // 
        let res = await sharp(data).resize(size).jpeg().toBuffer();
        // console.timeLog(`IMAGE SIZE ${size}`);
        return res;
    } catch (err) {
        console.log(err);
        return null;
    }
}
let i = 0;
let c = 0;

async function doSome() {
    let as = [];
    let i = 1;

    for (let x = 0; x < i; x++) {
        c += 100;
        as.push(await convertImage(c))
    }
    console.time(`IMAGE SIZE`);
    await Promise.all(as).then(() => {
        console.timeLog(`IMAGE SIZE`);
    })


}
doSome()

