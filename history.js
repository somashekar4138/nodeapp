const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  access_key:{
    type: String
  },
  server:{
    type: String
  },
  service:{
    type: String
  },
  rate:{
    type: Number
  },
  sms_id:{
    type: String
  },
  phone:{
    type: String
  },
  sms_count:{
    type:Number
  },
  is_cancel:{
    type: Boolean
  }
});
const us = mongoose.model('user_his', schema);
module.exports = us