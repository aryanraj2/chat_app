const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const path = require("path");

const { Server } = require("socket.io");
const io = new Server(server); // we create a new instance of socket.io server


//Socket.io setup

// 'connection' is the event name. It indicates that a new client has connected to the server.

// The callback function is executed whenever a new client connects.
// It receives a socket object representing the connection to the client.
// Inside this callback, you can set up additional event handlers for this particular socket.
// io.on('connection', ...) is a fundamental part of Socket.IO server-side programming.

// It allows you to perform actions when clients connect or disconnect from the server
// and to handle other events related to the Socket.IO instance itself.
io.on("connection", (socket) => {

  // Additional event handlers for this particular socket can be defined here.

  // register event handlers for specific events.
  // When a client socket receives an event from the server
  // with the specified event name, the corresponding event handler function is executed.
  socket.on("user-message", (message) => {

    // console.log("A new user message " , message);

    io.emit("message", message); // Broadcast the received message to all connected clients
});
});

app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
  res.sendFile("public/index.html");
});




server.listen(3000, () => {
  console.log('listening on *:3000');
});