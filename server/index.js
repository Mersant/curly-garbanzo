/* Heroku setup */
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

const server = express()
  .use(express.static(publicPath))
  .get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
  .listen(port, () => {
    console.log(`Server now running on ${port}`);
  });

const io = socketIO(server);

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


const users = {};
io.on("connection", client => {
  console.log('Client connected');
  client.on("username", username => {
    const user = {
      name: username,
      id: client.id
    };
    users[client.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });


  client.on("send", message => {
    io.emit("message", {
      text: message,
      date: new Date().toISOString(),
      user: users[client.id]
    });
  });

  client.on("disconnect", () => {
    const username = users[client.id];
    delete users[client.id];
    io.emit("disconnected", client.id);
  });
});
