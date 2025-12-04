import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { Server } from "socket.io";

const app = new Hono();

const httpServer = serve({
    fetch: app.fetch,
    port: 3000,
});

app.get('/', (c) => c.text('Hono!'))

const io = new Server(httpServer,{
  cors:"*"
}
);




io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message from client:", msg);
    socket.broadcast.emit("message", msg);
  });

  
});