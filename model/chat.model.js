const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  // user: { 
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  msg: {
    type: String,
    required: true,
  },
  id:{        //socket id
    type: String,
    required: true,
  },
  time:{ 
    type: String,
    required: true,
  },
  name:{   
    type: String,
    required: true,
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model("Chat", chatSchema);