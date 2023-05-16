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
  info:{   
    type: Object,
    required: true,
  },
  otherUser: {
    type: Object,
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model("Chat", chatSchema);