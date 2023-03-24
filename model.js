const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  access_key:{
    type: String,
    required: true
  },
  balance:{
    type: Number,
    required: true
  },
  is_ban:{
    type:Boolean
  }
});
const User = mongoose.model('Access_Codes', schema);
module.exports = User