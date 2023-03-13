const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');



// for signup
router.post('/register',async (req,res)=>{
   try{
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salt);   
    const newUser = new User({
        username: req.body.username,
        password: hashedPass,
        email: req.body.email 
            
    });

    const user = await newUser.save();
    
    res.status(200).json(user);
    
}catch(err){
    res.status(400).json(err);
   }   
});

router.get('/:id',async(req,res)=>{
    try{
        const user =await User.findById(req.params.id);
        const {password,...other} = user._doc;
        res.status(200).json(other);

    }catch(error){
        res.status(500).json('user not found');
    }


})

// for signin
router.post('/login',async (req,res)=>{
    try {
      const user = await User.findOne({username:req.body.username})
      
      console.log('user',user);
      console.log('user._doc',user._doc);
      //if no user
       !user && res.status(400).json("user is not found");
      
       const isvalid = await bcrypt.compare(req.body.password,user.password);
       
       
       //if user and password didnot match
       !isvalid && res.status(400).json('username or password is invalid');   
       
       //if user and password match
       const {password, ...other} = user._doc;
       res.status(200).json(other);
       
    }
    catch (error) {
        res.status(400).json(error);
    }
})

// //update
// router.put('/:id', async(req,res)=>{
//   try {

//     //const user = await User.findOne({username : req.body.username});
   
//    // const userId = user._id;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hashSync(req.body.password,salt);

//   const updatedUser = await  User.findByIdAndUpdate(req.params.id,{
//         username:req.body.username,
//         password:hashedPass
//     });
//     // {
//     //     $set: req.body
//     // }
//     res.status(200).json("updated successfully");
// } catch (error) {
//        res.status(400).json(error);  
//   }
// });

// router.delete('/:id',async(req,res)=>{
//     try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("deleted successfully");
   
//     } catch (error) {
//         res.status(400).json(error);
//     }
// })

router.put('/:id', async(req,res)=>{
    if(req.body.userId === req.params.id)
    {
        if(req.body.password){

            const salt = await bcrypt.genSalt(10);
           req.body.password = await bcrypt.hashSync(req.body.password,salt);
        }
    
    try {
  
    const updatedUser = await  User.findByIdAndUpdate(req.params.id,
        {
            $set: req.body
        },
        {
            new:true
        }
        );
      
        res.status(200).json(updatedUser);    
     } catch (error) {
         res.status(500).json(error);  
    }
}else{
    res.status(401).json('you can updated your account ')
}
  });

router.delete('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id)
    {
        try {
            const user = await User.findById(req.params.id);
            try {
    
                await Post.deleteMany({username: user.username});
    
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("deleted successfully");
               
                } catch (error) {
                    res.status(500).json(error);
                }
            
        } catch (error) {
            res.status(404).json("user not found");
        }

    }
    else{
        res.status(401).json('you can delete your account ');
    }
    });

module.exports = router;
