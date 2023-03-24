const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('./model');
const history = require('./history');
mongoose.connect('mongodb+srv://praneeth:praneeth4138@cluster0.fldpx3s.mongodb.net/?retryWrites=true&w=majority');
router.get('/upd_balance/:access_key/:balance',async (req,res)=>{
    const user_data = await user.findOne({access_key:req.params.access_key});
    if(user_data){
        await user.findOneAndUpdate({access_key:req.params.access_key},{balance: req.params.balance});
        res.send('Balance Updated');
    }
    else{
        res.send('Access Code Not Found');
    }
})
router.get('/get_all_codes',async (req,res)=>{
    const user_data = await user.find();
    res.json(user_data)
})
router.get('/Ban/:access_key',async (req,res)=>{
    const user_data = await user.findOne({access_key:req.params.access_key});
    if(user_data){
        await user.findOneAndUpdate({access_key:req.params.access_key},{is_ban: true});
        res.send('Banned');
    }
    else{
        res.send('Access Code Not Found');
    }
})
router.get('/unBan/:access_key',async (req,res)=>{
    const user_data = await user.findOne({access_key:req.params.access_key});
    if(user_data){
        await user.findOneAndUpdate({access_key:req.params.access_key},{is_ban: false});
        res.send('Unbanned');
    }
    else{
        res.send('Access Code Not Found');
    }
})
module.exports = router