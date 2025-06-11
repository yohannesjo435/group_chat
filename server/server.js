const PORT = process.env.PORT || 3000

const messageDb = []
const io = require("socket.io")(PORT, {
  cors: {
    origin: ["https://group-chat-blush-one.vercel.app/"],
    credentials: true
  }
})

io.on("connection", socket => {
  console.log(socket.id)
  socket.emit("old-messages", messageDb)

  socket.on("send-message", (message) => {
    messageDb.push(message)
    io.emit("recieve-message", message)
  })
})

console.log("Server started on port", PORT)


