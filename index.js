const express = require('express');
const app = express();
const db = require('./config/mongoose');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const  bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
app.use(express.json());


// app.use(express.urlencoded());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended:true
}));

app.use(fileupload({useTempFiles: true}));
app.use(cors());
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