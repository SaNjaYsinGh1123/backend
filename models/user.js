const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username: {
        type:String,
        require:true,
        unique:true
        },
    email: {
        type:String,
        require:true,
        unique:true
        },
   password: {
        type:String,
        require:true,
        },
   profilePicture: {
        public_id:{
            type:String,
            required:false,
            default: '',
        },
        url:{
        type:String,
        required:false,
        default:''
      }
        },
    },{
        timestamps:true
    })

module.exports = mongoose.model('users',UserSchema);