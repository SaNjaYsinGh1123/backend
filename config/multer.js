const  multer = require('multer');
// import  multer from "multer"

const storage = multer.memoryStorage();

const singleUpload = multer({storage});

module.exports = singleUpload;