
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config()
const { saveChat, getChat, getMyUser, getChatsByUserId, getAllMyChatListUsersById, getUsersByIds } = require("./services/chat.services")

app.use(cors(
  {
    origin: '*',
  }
))

// console.log('mongodb',process.env.DB_URL );

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });
    console.log("DB connected success")
  } catch (err) {
    console.log("DB connected error")
  }
};
connectDB()

// app.use(express.json());

// //importing routes

// const authRoute = require("./routes/auth");

// //route middle wares
// app.use("/api/user", authRoute);

// app.listen(3000, () => console.log("gg server is running"));




const http = require('http');
var server = http.createServer(app).listen(3000, function () {
  console.log("Express server listening on port " + 3000);
});

























const { Server } = require("socket.io");
// Cors for cross origin allowance
const io = new Server(server, {
  cors: { origin: '*' }
});
// const io = new Server();


// Send current time to all connected clients
// function sendTime() {
//   io.emit('time', { time: new Date().toJSON() });
// }

// Send current time every 10 secs
// setInterval(sendTime, 10000);


// let allMesasgeData = []
let allUsersData = [
  { id: 'AMeKV8xv77SZBGOzAAl2', name: 'PYrates Team', image: 1, type: 'group' }
]


















// Emit welcome message on connection
io.on('connection', async function (socket) {
  console.log('User Connected >>>', socket.id);


  socket.emit('userInfo', socket.id);

  // try {
  //   const chat = await getChat();
  //   // console.log('chat', chat);
  //   socket.emit('allMessage', chat);
  // } catch (error) {
  //   console.log(error);
  // }



  // Manage All User Information & Chats On Load
  socket.on('userInfo', async (e) => {
    allUsersData.push(e)
    console.log('User Details === >');
    try {
      const myUserInformation = await getMyUser(e);
      socket.emit('userInfo', myUserInformation[0]);

      const myChatsMessages = await getChatsByUserId(e.userId);
      socket.emit('userChatsMessages', myChatsMessages);

      // const myChatsList = await getAllMyChatListUsersById(e.userId);
      // socket.emit('userChatList', myChatsList);

    } catch (error) {
      console.log(error);
    }
  })



  // socket.on('getUsersByIds', async (e) => {
  //   console.log('getUsersByIds === <<', e);
  //   try {
  //     const allUsersFromIDs = await getUsersByIds(e)
  //     // console.log('getUsersByIds === >>', allUsersFromIDs);
  //     socket.emit('getUsersByIds', allUsersFromIDs);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // })


  socket.on('myMessage', async (msg) => {
    console.log('New Message  === >');
    console.log('USER:', msg.id, '|', 'MESSAGE:', msg.message, 'TIME:', msg.time, '|', 'ROOM:', msg.roomId);
    try {
      await saveChat(msg);
      socket.emit('newMessage', msg);
      socket.broadcast.emit('newMessage', msg);
      // const chat = await getChat();

      // socket.emit('allMessage', chat);
      socket.broadcast.emit('allMessage', msg);

      // const myChatsMessages = await getChatsByUserId(e.userId);
      // socket.emit('userChatsMessages', myChatsMessages);



    } catch (error) {
      console.log(error);
    }
  })


  socket.on('disconnect', () => {
    console.log('User Disconnected <<<', socket.id);
    let removeDisconnectedUser = allUsersData.filter((item) => {
      return socket.id !== item.id
    })
    allUsersData = removeDisconnectedUser
    socket.broadcast.emit('allUsers', allUsersData);
  })

});
























