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

const users = [];

io.on("connection", (socket) => {
  socket.on("onconnect", (msg) => {
    console.log(msg.name);

    users.push(msg.name);
    console.log(users)
    io.emit("members", users);

    socket.broadcast.emit("onconnect", msg);
  });

  socket.on("message", (msg) => {
    console.log("Message from client:", msg);
    socket.broadcast.emit("message", msg);
  });
});
