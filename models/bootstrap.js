const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    
   title: {
      type:String,
      require:true
    },
  
   author: {
      type:String,
      require:true
    },
    year: {
       type:String,
       require:true
     },
   
 },
 {
   timestamps:true
 }
)

module.exports = mongoose.model('books',BookSchema);