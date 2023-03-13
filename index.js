const express = require('express');
const app = express();
const db = require('./config/mongoose');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
app.use(express.json());

app.use(cors());

app.use(express.urlencoded());

app.use("/images", express.static(path.join(__dirname,'/images')));

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"images")
    },
    filename: (req,file,callback)=>{
        callback(null, file.originalname)
    },
})


const upload = multer({storage: storage});


app.post('/upload',upload.single('file'), (req,res)=>{
    res.status(200).json('file has been uploaded');
})
app.use('/',require('./routes'));
app.listen(process.env.PORT || 3000,()=>{
    console.log('backend running')
})

module.exports = app;