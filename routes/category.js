const express = require('express');

const router = express.Router();
const Category = require('../models/category');

//post cetegory
router.post('/create',async(req,res) =>{
    
    try {
        const newCat = new Category({
            name:req.body.name
        })

        const savedCategory = await newCat.save();
        res.status(200).json(savedCategory);
    } catch (error) {
         res.status(500).json(error);
    }
})

//get all categories

router.get('/', async (req,res) =>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;