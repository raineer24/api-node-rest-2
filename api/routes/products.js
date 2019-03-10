const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    //store data
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), //constructor function
        name: req.body.name,
        price: req.body.price
    }); //( new Product )model as a constructor, pass a javascript object . pass an object for that model
    product
        .save() //save is a method provided by mongoose, store in the database
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
        res.status(201).json({ // response json
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if ( id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;