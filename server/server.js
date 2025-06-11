const PORT = process.env.PORT || 3000

const messageDb = []
const io = require("socket.io")(PORT, {
  cors: {
    origin: "*",
    credentials: true
  }
})

io.on("connection", socket => {
  console.log(socket.id)
  socket.emit("old-messages", messageDb)

  socket.on("send-message", (message) => {
    messageDb.push(message)
  })

})

