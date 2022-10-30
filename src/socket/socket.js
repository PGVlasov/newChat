import { io } from "socket.io-client";

const options = {
  "force new connetions": true,
  reconnectionAttemps: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

export const socket = io("ws://localhost:3050", options); //"http://localhost:3011" "ws://193.168.48.104:3011/"
