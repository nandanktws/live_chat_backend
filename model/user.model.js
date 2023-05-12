const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // user: { 
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  online_status: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  });

module.exports = mongoose.model("User", userSchema);