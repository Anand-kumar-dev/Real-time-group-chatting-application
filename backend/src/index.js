import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { Server } from "socket.io";

const app = new Hono();

const httpServer = serve({
  fetch: app.fetch,
  port: 3000,
});

app.get("/", (c) => c.text("Hono!"));

const io = new Server(httpServer, {
  cors: "*",
});

let users = [];

io.on("connection", (socket) => {
  socket.on("onconnect", (msg) => {
    console.log(msg.name);
    socket.username = msg.name;
    users.push(msg.name);
    console.log(users)
    io.emit("members", users);

    socket.broadcast.emit("onconnect", msg);
  });

   socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
      users = users.filter(value => value !== socket.username);
      io.emit("members", users);
    socket.broadcast.emit("userLeft", {
      name : socket.username
    });
  });

  socket.on("message", (msg) => {
    console.log("Message from client:", msg);
    socket.broadcast.emit("message", msg);
  });
});
