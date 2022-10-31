const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const ACTIONS = require("./src/socket/actions");
const { version, validate } = require("uuid");

const PORT = process.env.PORT || 3050;

function getClientRooms() {
  const { rooms } = io.sockets.adapter;

  return Array.from(rooms.keys()).filter(
    (roomID) => validate(roomID) && version(roomID) === 4
  );
}

function shareRoomsList() {
  io.emit(ACTIONS.SHARE_ROOMS, { rooms: getClientRooms() });
}

io.on("connection", (socket) => {
  shareRoomsList();

  socket.on(ACTIONS.JOIN, (config) => {
    const { room: roomID } = config;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
    const { rooms: joinedRooms } = socket;
    if (Array.from(joinedRooms).includes(roomID)) {
      return console.warn(`Already connected to room ${roomID}`);
    }

    clients.forEach((clientID) => {
      io.to(clientID).emit(ACTIONS.ADD_PEER, {
        peerID: socket.id,
        createOffer: false,
      });

      socket.emit(ACTIONS.ADD_PEER, {
        peerID: clientID,
        createOffer: true,
      });
    });

    socket.join(roomID);
    shareRoomsList();
  });

  socket.on(ACTIONS.NEW_USER, ({ room, userName }) => {
    const { room: roomID } = room;

    const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

    const users = [];
    users.push(userName);
    io.to(clients).emit(ACTIONS.NEW_USER_RESPONSE, users);
  });

  socket.on(ACTIONS.MESSAGE, (msg) => {
    //gets room id
    const roomID = msg.roomID;
    console.log(msg);

    const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);
    //sens message only to clients from this room id

    io.to(clients).emit(ACTIONS.MESSAGE_RESPONSE, {
      data: msg,
    });
  });

  function leaveRoom() {
    const { rooms } = socket;

    Array.from(rooms)
      // Leave only client created room
      .filter((roomID) => validate(roomID) && version(roomID) === 4)
      .forEach((roomID) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || []);

        clients.forEach((clientID) => {
          io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
            peerID: socket.id,
          });

          socket.emit(ACTIONS.REMOVE_PEER, {
            peerID: clientID,
          });
        });

        socket.leave(roomID);
      });

    shareRoomsList();
  }

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on("disconnecting", leaveRoom);

  socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
    io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerID: socket.id,
      sessionDescription,
    });
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
    io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
      peerID: socket.id,
      iceCandidate,
    });
  });
});

const publicPath = path.join(__dirname, "build");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

server.listen(PORT, () => console.log(`Server is started on PORT ${PORT}`));
