const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  users: { 
    type: Array,
  },
  messages: {
    type: Array,
    required: true,
  },
  // users
  // id:{
  //   type: String,
  //   required: true,
  // },
  // time:{ 
  //   type: String,
  //   required: true,
  // },
  // name:{   
  //   type: String,
  //   required: true,
  // }
},
{
  timestamps: true,
});

module.exports = mongoose.model("Chat", chatSchema);