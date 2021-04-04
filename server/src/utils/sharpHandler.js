const sharp = require("sharp");

//Function to reduce file size. Buffer parameter require picture buffer (Eg: req.file.buffer)

const reducePicSize= async(buffer, width=200,height=250)=>{
    const reduceBuffer = await sharp(buffer).resize({ width: width, height: height }).png().toBuffer();
    return reduceBuffer;
}

module.exports={reducePicSize};