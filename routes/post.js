const express = require('express');

const router = express.Router();

const Post =  require('../models/post');
const cloudinary = require('../config/cloudinary');
const  singleUpload = require('../config/multer');
const  getDataUri = require('../config/dataUri');
//create
router.post('/create',singleUpload.single('image'),async(req,res)=>{
    const  {title, desc ,image, username,categories} = req.body;   
    try {
        // console.log('req.body',req.body);
        // console.log('req.image',req.image);
        // console.log('req.file',req.file);
        const fileUri = getDataUri(req.file);
        // console.log('fileUri',fileUri);
        // console.log('fileUri.content',fileUri.content);
        // console.log('req.body',title, desc , image, username,categories);
        const result = await cloudinary.uploader.upload(fileUri.content,{
            folder: 'post'
        })
        const newPost = new Post({
            title,
            desc,
            image:{
                public_id: result.public_id,
                url: result.secure_url
            },
            username,
            categories
        });
            const post =  await newPost.save();
            res.status(200).json(newPost);
            // res.status(200).json("hi");
        
        } 
        catch (error) {
            // console.log('eroror', error)
            res.status(500).json(error);       
        }

});

//update
router.put('/:id',singleUpload.single('image'),async(req,res)=>{
    try {
    const currentpost = await Post.findById(req.params.id);
    if(currentpost.username === req.body.username ){
        try {
            
            const data = {
                    title : req.body.title,
                    desc : req.body.desc,
                    username : req.body.username,
                    categories : req.body.categories,
                    }

            if(req.body.image !== ''){

                const ImgId = currentpost.image.public_id;
                await cloudinary.uploader.destroy(ImgId);
                const fileUri = getDataUri(req.file);
                const result = await cloudinary.uploader.upload(fileUri.content)
                
                data.image = {
                    public_id: result.public_id,
                    url: result.secure_url
                }
            }
            
            const updatedPost = await Post.findByIdAndUpdate(
                        req.params.id,data,{new: true})


                res.status(200).json(updatedPost);

            }catch(error){
                res.status(500).json(error)
            }
      
    }else{
        res.status(401).json("you can update your post")
    }
    }catch(error) {
        res.status(500).json(error)
}})

//delete
router.delete('/:id',async(req,res)=>{
   try {
        const post = await Post.findById(req.params.id);

        if(post.username === req.body.username){
            try {
                const ImgId = post.image.public_id;
                await cloudinary.uploader.destroy(ImgId);

                await Post.findByIdAndDelete(req.params.id);
                // await post.delete();
                res.status(200).json("post is deleted");
                
            } catch(error) {
                // console.log(error)
                res.status(500).json(error);
            }
        }else{
            res.status(401).json("you can delete your post only");
        }
    } catch (error) {
        res.status(500).json(error);
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