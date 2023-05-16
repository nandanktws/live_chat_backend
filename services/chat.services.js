const Chat = require("../model/chat.model");
const User = require("../model/user.model");






// const getUsersByIds = async (e) => {
//   try {
//     let ids = e

//     let allUserFromIds = []

//     for (let i = 0; i < ids.length; i++) {
//       const user = await User.find({ id: ids[i] })
//       allUserFromIds.push(...user);
//     }


//     let allUsersWithFilterFields = allUserFromIds.map((item) => {
//       return {
//         id: item.id,
//         name: item.name,
//         image: item.image,
//         online_status: item.online_status
//       }
//     })

//     // console.log('getUsersByIds services', allUsersWithFilterFields);

//     //   const user = await User.find({ id: data.userId })
//     //   console.log('chat', user);
//     return allUsersWithFilterFields
//   }
//   catch (error) {
//     console.log(error);
//     return []
//   }
// }








const getMyUser = async (data) => {
  try {
    const user = await User.find({ id: data.userId })
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
    var chat = await Chat.find({
      users: userId
    })

    let allChats = [];

    for (let i = 0; i < chat.length; i++) {
      const item = chat[i];
      // if (item.info.type != 'group') {
      var otherUser = item.users.filter((user) => user != userId);
      otherUser = await User.find({ id: otherUser }, { _id: 0, password: 0, createdAt: 0, updatedAt: 0, __v: 0 });
      item.otherUser = otherUser[0];
      // }
      allChats.push(item);
    }

    allChats.forEach(item => {
      item.messages.reverse();
    });

    return allChats;
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
    var roomId = msg.roomId;
    delete msg.roomId;

    await Chat.updateOne({ "info.room_id": roomId }, { $push: { messages: msg } })
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
  // getUsersByIds
  // getAllMyChatListUsersById
};