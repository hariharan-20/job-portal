const multer = require("multer")

const upload = multer({
  limits: {
    fileSize: 1000000, //file size: 1mb= 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image with size 1mb"));
    }
    cb(undefined, true);
  },
});


module.exports =upload
