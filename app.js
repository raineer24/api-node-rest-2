const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ner-backend:' + process.env.MONGO_ATLAS_PW + '@ner-backend-shard-00-00-jef1p.mongodb.net:27017,ner-backend-shard-00-01-jef1p.mongodb.net:27017,ner-backend-shard-00-02-jef1p.mongodb.net:27017/test?ssl=true&replicaSet=ner-backend-shard-0&authSource=admin&retryWrites=true',
{ useNewUrlParser: true });

app.use(morgan('dev')); //logger middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-ALlow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept, Authorization"
    );
    if(req.method === 'Options') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    };
    next();
});

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;