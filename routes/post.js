const express = require('express');

const router = express.Router();

const Post =  require('../models/post');
const cloudinary = require('../config/cloudinary');

//create
router.post('/create',async(req,res)=>{
    const  {title, desc , image, username,categories} = req.body;   
    try {
        const result = await cloudinary.uploader.upload(image.tempFilePath,{
            folder: "post"
        })
        const newPost = await Post.create({
            title,
            desc,
            image:{
                public_id: result.public_id,
                url: result.secure_url
            },
            username,
            categories
        });
            // const post =  await newPost.save();
            res.status(200).json(newPost);
        
        } 
        catch (error) {
            res.status(500).json(error);       
        }

});

//update
router.put('/:id',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
     
        if(post.username === req.body.username ){

            try {
               const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                   $set :req.body
                },
               {
                new: true,
               });
               res.status(200).json(updatedPost);
                
            } catch (error) {
                res.status(400).json(error)
            }
        }else{
            res.status(401).json("you can update your post")
        }
    } 
    catch (error) {
        res.status(500).json(error);
    }
})

//delete
router.delete('/:id',async(req,res)=>{
  
    const post = await Post.findById(req.params.id);

    if(post.username === req.body.username){
        try {
            await Post.findByIdAndDelete(req.params.id);
            // await post.delete();
            res.status(200).json("post is deleted");
            
        } catch(error) {
            console.log(error)
            res.status(500).json(error);
        }
    }else{
        res.status(401).json("you can delete your post only");
    }
})

//get post

router.get('/:id',async(req,res)=>{
    try {
     const post = await Post.findById(req.params.id);
     res.status(200).json(post);
    } catch (error) {
        res.status(404).json("post does not found");
    }
})

router.get('/',async(req,res)=>{
    const username = req.query.username;
    const categoryName =  req.query.categoryName;
    try {
     let posts;
     if(username){
        posts = await Post.find({username : username})
     }else if(categoryName){
        posts = await Post.find({
            categories: {
                $in: [categoryName]
            }
        })
     }else{
        posts = await Post.find();
     }
     res.status(200).json(posts);

    }catch (error) {
        res.status(404).json("post does not found");
    }
})



module.exports = router;