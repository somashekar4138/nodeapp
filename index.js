const express = require('express')
const mongoose = require('mongoose');
const user = require('./model');
const history = require('./history');

const app = express()
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/admin',require('./admin'))
mongoose.connect('mongodb+srv://praneeth:praneeth4138@cluster0.fldpx3s.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('connected'));
app.use(express.json())
app.get('/insert/:access_key', async (req, res) => {
    await user.collection.insertOne({
        "access_key": req.params.access_key,
        "balance": 0,
        "is_ban":false
    })
    res.json({
        "msg": "success"
    })
});
app.get('/get_bal/:access_key', async (req, res) => {
    const access_key = req.params.access_key
    const data = await user.collection.findOne({ access_key: access_key })
    if (data) {
        const { access_key, balance,is_ban } = data
        if(is_ban){
            res.json({ "msg": "BAN"});
        }
        else{

            res.json({ "msg": "Found", "access_key": access_key, "balance": balance });
        }
    }
    else {
        res.json({ "msg": "Not Found" })
    }
});
app.get('/update_bal/:access_key/:rate/:sms_id/:phone/:service/:server', async (req, res) => {
    const access_key = req.params.access_key
    const rate = req.params.rate
    const sms_id = req.params.sms_id
    const phone = req.params.phone
    const service = req.params.service
    const data = await user.collection.findOne({ access_key: access_key })
    const { balance } = data
    const ref = { access_key: access_key };
    const upd_bal = { balance: balance-rate };
    await user.findOneAndUpdate(ref, upd_bal);
    await history.collection.insertOne({
        "access_key": "abcd",
        "server":   "Server "+req.params.server,
        "service": service,
        "rate":rate,
        sms_id:sms_id,
        "phone":phone,
        "sms_count":0,
        is_cancel:false
    })
    res.json({
        "msg":"success"
    })
});
app.get('/upd_sms_count/:access_key/:sms_id/:sms_count', async (req,res)=>{
    const history_data = await history.collection.findOne({ access_key: req.params.access_key, sms_id:req.params.sms_id});
    const {sms_count}=history_data 
    const update_sms_count = parseFloat(sms_count)+parseFloat(req.params.sms_count)
    await history.findOneAndUpdate({ access_key: req.params.access_key, sms_id:req.params.sms_id }, {sms_count:update_sms_count});
    res.json({
        "msg":"success"
    })
})
app.get('/cancel_num/:access_key/:sms_id', async (req,res)=>{
    const user_data = await user.collection.findOne({ access_key: req.params.access_key })
    const {balance} = user_data
    await history.findOneAndUpdate({ access_key: req.params.access_key, sms_id:req.params.sms_id}, {is_cancel:true});
    const history_data = await history.collection.findOne({ access_key: req.params.access_key, sms_id:req.params.sms_id});
    const {rate} = history_data;
    const update_bal = parseFloat(balance)+parseFloat(rate)
    await user.findOneAndUpdate({ access_key: req.params.access_key }, {balance:update_bal});
    res.json({
        "msg":"success"
    })
})
app.get('/get_his/:access_key',async (req,res)=>{
    let a = await history.find({access_key: req.params.access_key})
    res.json(a)
})

app.listen(8000)