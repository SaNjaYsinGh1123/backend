const mongoose = require('mongoose');

mongoose.set('strictQuery',true);

//   const db = mongoose.connection;

//   db.on('error',console.error.bind(console, 'error in connecting to user database'));
  
//   db.once('open', function(){
//       console.log('successfully connected to the user database');
//   });

mongoose.connect('mongodb+srv://megacloud:megacloud@cluster0.gijawgh.mongodb.net/apiSpecial?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(console.log('connected to database'))
  .catch((err)=> console.log(err));
