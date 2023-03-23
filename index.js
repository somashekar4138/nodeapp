const express = require('express')
const mongoose = require('mongoose');
const user = require('./model');
const app = express()
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
mongoose.connect('mongodb+srv://praneeth:praneeth4138@cluster0.fldpx3s.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log('hello'));
app.get('/',async (req,res) =>{
    await user.collection.insertOne({ name: 'praneeth' });
    res.json({
        "msg":"inset"
    })
})
app.listen(8000)