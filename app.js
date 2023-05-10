
const express = require('express');
const app = express();

const { Server } = require("socket.io");

const http = require('http');
var server = http.createServer(app).listen(3000, function () {
  console.log("Express server listening on port " + 3000);
});

 

// Cors for cross origin allowance
const io = new Server(server, {
  cors: { origin: '*' }
});


// Send current time to all connected clients
// function sendTime() {
//   io.emit('time', { time: new Date().toJSON() });
// }

// Send current time every 10 secs
// setInterval(sendTime, 10000);


let allMesasgeData = []
let allUsersData = [
  { id: 'AMeKV8xv77SZBGOzAAl2', name: 'PYrates Team', image: 1, type: 'group' }
]


// Emit welcome message on connection
io.on('connection', function (socket) {
  console.log('a user connected with id: ', socket.id);
  console.log('=========================');
  socket.emit('userInfo', socket.id);
  socket.emit('allMessage', allMesasgeData);
  socket.emit('allUsers', allUsersData);








  socket.on('allUsers', (e) => {
    allUsersData.push(e)
    console.log('allUsers', e);
    socket.emit('allUsers', allUsersData);
    socket.broadcast.emit('allUsers', allUsersData);
  })


  socket.on('myMessage', (msg) => {
    console.log('myMessage', msg);
    allMesasgeData.unshift(msg)
    socket.emit('allMessage', allMesasgeData);
    socket.broadcast.emit('allMessage', allMesasgeData);
  })


  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    let removeDisconnectedUser = allUsersData.filter((item) => {
      return socket.id !== item.id
    })
    allUsersData = removeDisconnectedUser
    socket.broadcast.emit('allUsers', allUsersData);
  })

});








