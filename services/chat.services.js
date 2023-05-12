const Chat = require("../model/chat.model");
const User = require("../model/user.model");










const getMyUser = async (data) => {
  try {
    const user = await User.find({ id: data.userId })
    console.log('chat', user);
    return user
  }
  catch (error) {
    console.log(error);
    return []
  }
}










// const getAllMyChatListUsersById = async (userId) => {
//   try {
//     const allChatInfo = await Chat.find({ users: userId })

//     let allUsers = allChatInfo.map((item) => item.users)
//     let onlyUsers = [...new Set(allUsers.flat())].filter(item => item !== userId);

//     let onlyAllUsers = []
//     for (let i = 0; i < onlyUsers.length; i++) {
//       const element = await User.find({
//         id: onlyUsers[i]
//       });
//       onlyAllUsers.push(...element);
//     }

//     let allUsersWithFilterFields = onlyAllUsers.map((item) => {
//       return {
//         id: item.id,
//         name: item.name,
//         image: item.image,
//         online_status: item.online_status,
//       }
//     })

//     return allUsersWithFilterFields;
//   }
//   catch (error) {
//     console.log(error);
//     return []
//   }
// }










const getChatsByUserId = async (userId) => {
  try {
    // const chat = await Chat.find({messages:{ $exists: true, $ne: [] }}, {messages: 1, _id: 0})
    const chat = await Chat.find({
      users: userId
    })
    return chat;
  }
  catch (error) {
    console.log(error);
    return []
  }
}










const getChat = async () => {
  try {
    // const chat = await Chat.find({messages:{ $exists: true, $ne: [] }}, {messages: 1, _id: 0})
    const chat = await Chat.find({ "info.room_id": 'ki86fdb3m4d8' }, { messages: 1, _id: 0 })
    let allMessage = chat.map((item) => {
      return item.messages
    })
    // console.log('allMessage', allMessage[0].reverse());
    // chat.update({msg: msg.msg, id: msg.id, time: msg.time, name: msg.name}),
    return allMessage[0].reverse()


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
  }
  catch (error) {
    console.log(error);
  }
}










module.exports = {
  saveChat,
  getChat,
  getMyUser,
  getChatsByUserId,
  // getAllMyChatListUsersById
};