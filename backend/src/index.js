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



httpServer.listen(3000, "0.0.0.0",() => {
  console.log(` Server running at http://localhost:3000`)
})
