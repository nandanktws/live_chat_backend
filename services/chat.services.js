const Chat = require("../model/chat.model");







const getChat = async () => {
  try {
    const chat = await Chat.find()
    return chat

  }
  catch (error) {
    console.log(error);
    return []
  }
}
getChat()


const saveChat = async (msg) => {
  try {
    await new Chat({
      msg: msg.msg,
      id: msg.id,
      time: msg.time,
      name: msg.name
    }).save();
    // getChat()
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  saveChat,
  getChat
};