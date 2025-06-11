let username = "Anonymous"

const usernameModal = document.getElementById("username-modal")
const usernameForm = document.getElementById("username-form")
const modalusernameInput = document.getElementById("modal-username-input")

const messageInput = document.getElementById("message-input")
const searchForm = document.getElementById("searchForm")

// const socket = io("https://groupchat-production-b243.up.railway.app/")
const socket = io("https://group-chat-02yw.onrender.com")
// const socket = io("http://localhost:3000")

//when user connects
// socket.on("connect", ()=> {
//   socket.emit("send-message", {username, message: `${usernameInput.value || "Anonymous"}  Joined the chat`})
// })

usernameForm.addEventListener("submit", e => {
  e.preventDefault()
  username = modalusernameInput.value || "Anonymous"
  usernameModal.style.display = "none"
})

socket.on("old-messages", (oldMessages)=> {
  console.log("oldMessages", oldMessages.lengths)
  console.log("oldMessages", oldMessages)
  oldMessages.forEach((msg)=> {
    displayMessage(msg)
  })
})

socket.on("recieve-message", message => {
  displayMessage(message)
})


searchForm.addEventListener("submit", e => {
  e.preventDefault()
  const message = messageInput.value

  if (message === "") return
  // displayMessage({username, message})
  socket.emit(`send-message`, {username, message} )

  messageInput.value = ""
})
 

function displayMessage(msgObj) {
  console.log(typeof msgObj)
  const div = document.createElement("div")
  div.textContent = `${msgObj.username}: ${msgObj.message}`

  if (msgObj.username === username) {
    div.classList.add("my-message")
  }else {
    div.classList.add("other-message")
  }

  const messageContainer = document.getElementById("message-container")
  messageContainer.append(div)
  
  messageContainer.scrollTop = messageContainer.scrollHeight 
  
}