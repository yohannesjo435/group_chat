const {instrument} = require("@socket.io/admin-ui")
const PORT = process.env.PORT || 3000

const io = require("socket.io")(PORT, {
  cors: {
    origin: "*",
    credentials: true
  }
})

io.on("connection", socket => {
  console.log(socket.id)
  socket.on("send-message", (message, room) => {
    if (room === ""){
      socket.broadcast.emit("recieve-message", message)
    }else {
      socket.to(room).emit("recieve-message", message)
    }
  })
  socket.on("join-room", (room, cb) => {
    socket.join(room)
    cb(`Joined ${room}`)
  })
})

instrument(io, {auth: false})
