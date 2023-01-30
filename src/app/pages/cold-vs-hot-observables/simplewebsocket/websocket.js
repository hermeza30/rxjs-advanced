import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import { Server } from "socket.io";
import { fromEvent } from "rxjs";
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:4200",
    // credentials: false,
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});
fromEvent(io, "connection").subscribe((connection) => {
  console.log("Escuchando evento rxjs");
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
