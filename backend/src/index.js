import { Hono } from 'hono'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = new Hono()

app.get('/', (c) => {
  return c.text("hi there")
})

const httpServer = createServer((req, res) => app.fetch(req, res))

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id)

  socket.join("room",(socket)=>{
    console.log(`${socket} joined the room`)
  })
   socket.on("chatMessage", (msg) => {
    console.log("Message received:", msg);

    socket.broadcast.emit("chatMessage", msg);
  });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})


httpServer.listen(3000, "0.0.0.0",() => {
  console.log(`🚀 Server running at http://localhost:3000`)
})
