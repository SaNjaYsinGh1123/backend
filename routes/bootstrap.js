const express = require('express');

const router = express.Router();

const Book =  require('../models/bootstrap');
//create
router.post('/create',async(req,res)=>{
    const  {title,author,year} = req.body;   
    try {
        

       
        const newBook = new Book({
            title,
            author,
            year
        });
            const book =  await newBook.save();
            res.status(200).json(book);
            // res.status(200).json("hi");
        
        } 
        catch (error) {
            // console.log('eroror', error)
            res.status(500).json(error);       
        }

});

//update
router.put('/:id',async(req,res)=>{
   

        try {
            
            const data = {
                    title : req.body.title,
                    author : req.body.author,
                    year : req.body.year,
                    }

          
            
            const updatedBook = await Book.findByIdAndUpdate(
                        req.params.id,data,{new: true})


                res.status(200).json(updatedBook);

            }catch(error){
                res.status(500).json(error)
            }
      
   
   })

//delete
router.delete('/:id',async(req,res)=>{
   try {
        const book = await Book.findById(req.params.id);

            try {
             

                await Book.findByIdAndDelete(req.params.id);
                // await post.delete();
                res.status(200).json("book is deleted");
                
            } catch(error) {
                // console.log(error)
                res.status(500).json(error);
            }
      
    } catch (error) {
        res.status(500).json(error);
    }
})

//get post

router.get('/:id',async(req,res)=>{
    try {
     const book = await Book.findById(req.params.id);
     res.status(200).json(book);
    } catch (error) {
        res.status(404).json("book does not found");
    }
})

router.get('/',async(req,res)=>{
    try {
     let books;
    
        books = await Book.find();
       res.status(200).json(books);

    }catch (error) {
        res.status(404).json("book does not found");
    }
})



module.exports = router;