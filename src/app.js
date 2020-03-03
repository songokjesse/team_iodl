const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('../src/routes');
const  app = express();

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// API ROUTES
app.use('/api/v1', routes);

//catch 404 and forward to error handler
app.use((req,res,next)=>{
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
/*eslint no-unused-vars: "next"*/
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;
